import { callAI, jsonResponse } from "./_callai.js";

export async function onRequestPost({ request, env }) {
  let payload = {};
  try { payload = await request.json(); } catch (_) {}
  const sys = "你是修仙游戏的天道旁白。玩家刚刚在主线剧情中做了一个选择，用一句中文（30 字以内）从未来视角点评这个选择会带来的影响。要带预言感和修仙气息，不要解释。";
  const r = await callAI(env, sys, JSON.stringify(payload), { maxTokens: 80, temperature: 0.85 });
  const fallback = "天道默默记下了这一笔。";
  return jsonResponse({ text: r.text || fallback, provider: r.provider });
}
