const guide = `## Billing

Right now, there are 3 plans:
- Free with limits
- Pay as you go
(To get on this plan, go to https://console.groq.com/settings/billing/plans)
- Enterprise
(To get on this plan, email \`sales@groq.com\`, although they may be slow to respond)

## Models and limits

Groq currently has these models:

- qwen-2.5-32b
- qwen-2.5-coder-32b
- qwen-qwq-32b (best reasoning model)
- deepseek-r1-distill-qwen-32b
- deepseek-r1-distill-llama-70b
- gemma2-9b-it
- distil-whisper-large-v3-en
- llama-3.1-8b-instant
- llama-3.2-1b-preview
- llama-3.2-3b-preview
- llama-3.2-11b-vision-preview
- llama-3.2-90b-vision-preview
- llama-3.3-70b-versatile
- llama-guard-3-8b (content moderation; see https://console.groq.com/docs/content-moderation)
- llama3-70b-8192
- llama3-8b-8192
- meta-llama/llama-4-scout-17b-16e-instruct (usually the best model)
- mistral-saba-24b (good with middle east languages)
- whisper-large-v3
- whisper-large-v3-turbo
- playai-tts
- playai-tts-arabic
- allam-2-7b (good with Arabic)

The free tier has limits.

See: https://console.groq.com/docs/rate-limits

## Speed

Smaller models are faster, but don't have as much world knowledge or intelligence. For example, Llama 3.2 1B runs at 3000 tokens/s, in comparison to Llama 3.3 70B at 250 tokens/s.

Speculative decoding can make Llama run much faster. For predictable outputs, speculative decoding can reach 2500 tokens/s. In other scenarios, it's still faster, at 1660-2000 tokens/s. Speculative decoding is currently available in beta with some models for select customers (including pay-as-you-go), and can be accessed with the ID "llama-3.3-70b-specdec". It doesn't lose accuracy, but it's slightly pricier at $0.99/million output tokens (compared to $0.79/million for standard sampling).

## Planned and nonplanned feautres

- Llama 4 Maverick: Coming soon, but it's a large model
- Embeddings: Currently being engineered
- Faster performance: The current hardware is going as fast as it can. Groq is working on a new, thinner chip that will be faster.
- Logprobs: Possible but not engineered yet
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
