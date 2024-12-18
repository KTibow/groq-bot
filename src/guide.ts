const guide = `## Billing

Right now, there are 3 plans:
- Free with limits
- Pay as you go
(To get on this plan, go to https://console.groq.com, click "Chat with us" on bottom left, click Send us a message -> Account -> Dev Tier, and send your Organization ID)
- Enterprise
(To get on this plan, email \`sales@groq.com\`, although they may be slow to respond)

In the future (I don't know when), Groq will have enough capacity for anyone to easily get on pay as you go. There will still be a free tier then. It might still be limit based or it might switch to credit based.

## Models and limits

Groq currently has these models:

- gemma-7b-it
- gemma2-9b-it
- llama3-groq-70b-8192-tool-use-preview (good at "tool use", the practice of taking actions and retrieving information on behalf of the user; see https://console.groq.com/docs/tool-use)
- llama3-groq-8b-8192-tool-use-preview (same as above)
- distil-whisper-large-v3-en
- llama-3.3-70b-versatile (usually the best model)
- llama-3.1-70b-versatile
- llama-3.1-8b-instant
- llama-3.2-1b-preview
- llama-3.2-3b-preview
- llama-3.2-11b-vision-preview
- llama-3.2-90b-vision-preview
- llama-guard-3-8b (content moderation; see https://console.groq.com/docs/content-moderation)
- llama3-70b-8192
- llama3-8b-8192
- mixtral-8x7b-32768
- whisper-large-v3
- whisper-large-v3-turbo
- llava-v1.5-7b-4096-preview (this can see images, although it's not recent)

Groq can't add new models with licenses that don't allow running them commercially (eg Mistral/Cohere models).

The free tier has limits.

See: https://console.groq.com/docs/rate-limits

## Speed

Smaller models are faster, but don't have as much world knowledge or intelligence. For example, Llama 3.2 1B runs at 3000 tokens/s, in comparison to Llama 3.1 70B at 250 tokens/s.

Speculative decoding can make Llama 70B run much faster. For predictable outputs, speculative decoding can reach 2500 tokens/s. In other scenarios, it's still faster, at 1660-2000 tokens/s. Speculative decoding is currently available in beta with some models for select customers (including pay-as-you-go), and can be accessed with the IDs "llama-3.3-70b-specdec" or "llama-3.1-70b-specdec". It doesn't lose accuracy, but it's slightly pricier at $0.99/million output tokens (compared to $0.79/million for standard sampling).

## Planned and nonplanned feautres

- Easy access to paid tiers: Once there's enough capacity (currently all going to running 70b for free)
- Llama 405B: Previously ran, might run again once there's enough capacity
- Embeddings: Currently being engineered
- Faster performance: The current hardware is going as fast as it can. Groq is working on a new, thinner chip that will be faster.
- Logprobs: Possible but not engineered yet
- Text to speech: A common feature request but not engineered yet
- Tokenization: Out of scope

## Accounts

You aren't allowed to evade the limits (eg by using multiple accounts). If you do, you'll get banned.

If you get a 404 error on every request to the console/API, disable your VPN. Use from China also doesn't work (it's not supported, you're in a bit of a tricky spot if so due to some VPNs being blocked).

These restrictions had to be implemented since, sadly, there are a lot of bad actors out there.

## Use

It's very simple.

Options:
- Use OpenAI SDK but swap out the base and key
- Use Groq SDK
  See: https://console.groq.com/docs/quickstart
- Use HTTP

HTTP use is like this:
curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
 -H "Authorization: Bearer $GROQ_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{"messages": [{"role": "user", "content": "Explain the importance of fast language models"}], "model": "llama-3.1-8b-instant"}'

### Vision

To send images, use the more complex \`content\` format.

Example of this format:
\`\`\`
[
  {
    "type": "text",
    "text": "What's in this image?",
  },
  {
    "type": "image_url",
    "image_url": {
      "url": "https://upload.wikimedia.org/wikipedia/commons/f/f2/LPU-v1-die.jpg",
    },
  },
]
\`\`\`

Note:
- This format is only for \`content\`
- Data URIs (like \`data:image/jpeg;base64,YOUR_IMAGE_BASE64\`) work as well

## Custom models

Groq doesn't do training.
Groq doesn't run user-submitted models.
Groq doesn't sell hardware (anymore). See: https://www.eetimes.com/groq-ceo-we-no-longer-sell-hardware/

However, supposedly enterprises can run their own fine tunes. (The website used to have something on this but I can't find it anymore)

## Privacy

Your prompts aren't logged or stored. Groq doesn't have a reason to. See: https://groq.com/privacy-policy/

## Background info

Groq is a company that makes their own AI hardware and hosts it.

Groq runs the LPU (Language Processing Unit), a term referring to an arrangement of Groq chips. This is why it's faster.

Groq stores 8 bit weights but uses 16 bit computation.

While both Groq and Elon Musk's Grok came from the word "grok", Groq has a trademark and Grok doesn't.

## Other channels

You MUST use the original, snowflake-based syntax when referring to these channels

- <#1207719622040879154> (the "community help")
- <#1207719827381420112> (the "feature/model requests", refer users here when needed)
- <#1207719967575777290> (the "bug reports")`;
export default guide;
