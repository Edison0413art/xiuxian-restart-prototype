const { callAI, readJson } = require("./_callai");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const payload = await readJson(req);
  const sys = "你是修仙重开模拟器里的天道旁白。用中文写一段80字以内的搞笑点评，风格网络梗、修仙爽文梗混合，不要输出解释。";
  const r = await callAI(sys, JSON.stringify(payload), { maxTokens: 180 });
  const fallback = `天道点评：${payload.name || "这位道友"}最高境界${payload.realm || "凡人"}，结尾原因「${payload.reason || "剧情收束"}」。建议下次看见左韩天尊先装成路边石头。`;
  res.status(200).json({ text: r.text || fallback, provider: r.provider });
};
