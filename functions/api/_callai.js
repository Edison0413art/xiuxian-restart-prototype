// Cloudflare Pages Functions 共享 AI 调用
// 注意：Cloudflare 用 Web Standard fetch + env 注入环境变量
export async function callAI(env, systemPrompt, userContent, opts = {}) {
  const { maxTokens = 180, temperature = 0.9 } = opts;
  const geminiKey = env.GEMINI_API_KEY || "";
  const geminiModel = env.GEMINI_MODEL || "gemini-flash-latest";
  const deepseekKey = env.DEEPSEEK_API_KEY || "";
  const deepseekModel = env.DEEPSEEK_MODEL || "deepseek-chat";

  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-goog-api-key": geminiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n输入：${userContent}` }] }],
          generationConfig: { temperature, maxOutputTokens: maxTokens },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) return { text, provider: "gemini" };
      }
    } catch (_) { /* fall through */ }
  }
  if (deepseekKey) {
    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${deepseekKey}` },
        body: JSON.stringify({
          model: deepseekModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContent },
          ],
          temperature, max_tokens: maxTokens,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) return { text, provider: "deepseek" };
      }
    } catch (_) { /* fall through */ }
  }
  return { text: null, provider: "local" };
}

export function jsonResponse(obj) {
  return new Response(JSON.stringify(obj), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
