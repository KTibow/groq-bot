import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import guide from "./guide.js";

async function compressAndEncode(input) {
  const encoder = new TextEncoder();
  const gzipStream = new CompressionStream("gzip");
  const writer = gzipStream.writable.getWriter();
  writer.write(encoder.encode(input));
  writer.close();

  const compressed = await new Response(gzipStream.readable).arrayBuffer();
  return btoa(String.fromCharCode(...new Uint8Array(compressed)));
}

export default {
  async fetch(request: Request, env, ctx) {
    if (request.method != "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const signature = request.headers.get("x-signature-ed25519");
    const timestamp = request.headers.get("x-signature-timestamp");
    const body = await request.text();
    if (!signature || !timestamp || !body) {
      return new Response("Bad Request", { status: 400 });
    }
    if (
      !(await verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY))
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    const interaction = JSON.parse(body);

    if (interaction.type == InteractionType.PING) {
      return new Response(
        JSON.stringify({
          type: InteractionResponseType.PONG,
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (interaction.type != InteractionType.APPLICATION_COMMAND) {
      return new Response("Invalid interaction type", { status: 400 });
    }

    // Handle the "Tag - Not Found" command (ID: 1355581376979665148)
    if (interaction.data.id === "1355581376979665148") {
      return Response.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `This looks like a Not Found error. These typically mean that your internet provider was blocked to protect Groq. Try again with a different internet connection.`,
        },
      });
    }

    // Handle the original command (ask Groq)
    const messageContent =
      interaction.data.resolved.messages[interaction.data.target_id].content;

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: guide,
            },
            {
              role: "user",
              content: `<query>${messageContent}</query>
1. List relevant quotes from the reference
2. Take a moment to make sure that you'll respond to the query as if you're an expert who's learned the reference instead of as someone verbosely quoting it
3. Reply to the query.
Formatting guide:
- Use 1-3 sentences
- You can use provided links. https://example.com is a good link. [some text](https://example.com) is a good link. <#1207719622040879154> is a good link. These are the ONLY link formats you can use; other formats will CRASH.
- You can use \`code\` and \`\`\` for short and long code.
Aim to be precise, preferring more general or discrete statements over guessing and saying something is "likely". Linking channels/websites is good. Put your reply in <reply></reply>.`,
            },
          ],
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
        }),
      },
    );

    const groqData = await groqResponse.json();
    const text = groqData.choices[0].message.content;
    const thinking = text.split("<reply>")[0];
    const answer = text
      .match(/<reply>(.*?)<\/reply>/s)[1]
      .replace(/\[([^\]]+)\]\(\1\)/g, "$1");

    return Response.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content:
          answer +
          (thinking
            ? ` [(debug this)](https://ktibow.github.io/groq-bot/?text=${encodeURIComponent(await compressAndEncode(thinking))})`
            : ""),
      },
    });
  },
};
