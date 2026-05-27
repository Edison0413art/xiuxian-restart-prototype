import { callAI, jsonResponse } from "./_callai.js";

export async function onRequestPost({ request, env }) {
  let payload = {};
  try { payload = await request.json(); } catch (_) {}
  const sys = "你是修仙游戏的墓志铭撰写者。根据玩家信息写一段 40 字以内的中文墓志铭，风格悲壮幽默，可带网络梗或修仙梗，不要解释。";
  const r = await callAI(env, sys, JSON.stringify(payload), { maxTokens: 120, temperature: 0.95 });
  const fallback = `${payload.name || "无名道友"}，享年 ${payload.age || 0} 岁。死于${payload.reason || "剧情收束"}。墓前长草，年年青。`;
  return jsonResponse({ text: r.text || fallback, provider: r.provider });
}
