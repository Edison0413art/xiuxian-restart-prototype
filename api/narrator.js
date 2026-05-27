const { callAI, readJson } = require("./_callai");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const payload = await readJson(req);
  const sys = "你是修仙游戏的天道旁白。玩家刚刚在主线剧情中做了一个选择，用一句中文（30 字以内）从未来视角点评这个选择会带来的影响。要带预言感和修仙气息，不要解释。";
  const r = await callAI(sys, JSON.stringify(payload), { maxTokens: 80, temperature: 0.85 });
  const fallback = "天道默默记下了这一笔。";
  res.status(200).json({ text: r.text || fallback, provider: r.provider });
};
