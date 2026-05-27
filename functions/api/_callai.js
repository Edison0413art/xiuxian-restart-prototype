// Cloudflare Pages Functions 共享 AI 调用 - DeepSeek only
// 文档：https://api-docs.deepseek.com/zh-cn/
export async function callAI(env, systemPrompt, userContent, opts = {}) {
  const { maxTokens = 180, temperature = 0.9 } = opts;
  const deepseekKey = env.DEEPSEEK_API_KEY || "";
  const deepseekModel = env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!deepseekKey) return { text: null, provider: "local" };

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${deepseekKey}`,
      },
      body: JSON.stringify({
        model: deepseekModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature,
        max_tokens: maxTokens,
        stream: false,
      }),
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error("DeepSeek error:", response.status, errText.slice(0, 200));
      return { text: null, provider: "local" };
    }
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (text) return { text, provider: "deepseek" };
  } catch (e) {
    console.error("DeepSeek fetch error:", e.message);
  }
  return { text: null, provider: "local" };
}

export function jsonResponse(obj) {
  return new Response(JSON.stringify(obj), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
