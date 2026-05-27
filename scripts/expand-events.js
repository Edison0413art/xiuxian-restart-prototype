// 用 Gemini 批量生成修仙事件 → 写入 data/events-extra.json
// 用法：
//   GEMINI_API_KEY=xxx node scripts/expand-events.js [--batch 20] [--rounds 50] [--category mortal]
//
// 默认 50 轮 × 20 个/轮 = 1000 个事件
// 每个事件结构：{ title, intro, options: [{label, result, effects}] }
// 之后由主游戏的扩展加载器消费。

const fs = require("fs");
const path = require("path");
const https = require("https");

const KEY = process.env.GEMINI_API_KEY || process.argv.find((a) => a.startsWith("--key="))?.slice(6);
if (!KEY) {
  console.error("缺少 GEMINI_API_KEY，请通过环境变量或 --key=xxx 提供");
  process.exit(1);
}

const args = process.argv.slice(2);
const getArg = (name, def) => {
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1]) return args[idx + 1];
  return def;
};

const BATCH = Number(getArg("--batch", "20"));
const ROUNDS = Number(getArg("--rounds", "50"));
const CATEGORY = getArg("--category", "mortal"); // mortal / qi / foundation / childhood / golden / nascent
const OUT = getArg("--output", path.join(__dirname, "..", "data", "events-extra.json"));
const MODEL = getArg("--model", "gemini-flash-latest");

// 分类提示词
const CATEGORY_PROMPTS = {
  childhood: { ageRange: "0-12 岁", flavor: "幼年家庭、村庄、童年趣事、早期奇遇" },
  initiation: { ageRange: "6-24 岁", flavor: "测灵根、拜师、宗门外门、新人考核" },
  mortal: { ageRange: "0-80 岁，凡人/炼气境界", flavor: "市井江湖、镖局、客栈、城镇、低阶冒险" },
  qi: { ageRange: "10-140 岁，炼气境界", flavor: "宗门日常、小秘境、妖兽、初阶修炼" },
  foundation: { ageRange: "18-260 岁，筑基境界", flavor: "中阶秘境、雷劫擦肩、老爷爷传承、古修遗迹" },
  golden: { ageRange: "30-650 岁，金丹境界", flavor: "金丹庆典、宗门联盟、跨服擂台、仇家堵门" },
  nascent: { ageRange: "80+ 岁，元婴及以上", flavor: "界域通道、上古战场、万族议事、大能论道" },
  artifact: { ageRange: "全程", flavor: "戒指老爷爷、法宝、丹炉、玉佩、灵兽契约、系统流" },
  cameo: { ageRange: "全程", flavor: "网文/动漫主角乱入（萧炎、韩立、叶凡、悟空、龙猫、史努比、哆啦 A 梦等）" },
  crossover: { ageRange: "全程", flavor: "霸总文、重生文、番茄爽文、短剧、都市穿越串台" },
};

function buildPrompt(batchSize, category) {
  const cfg = CATEGORY_PROMPTS[category] || CATEGORY_PROMPTS.mortal;
  return `你是修仙人生模拟游戏的事件作者。请按下面 JSON 格式生成 ${batchSize} 个事件。

【分类】${category}（${cfg.ageRange}）
【题材】${cfg.flavor}
【风格】中文，融合修仙、网络梗、轻喜剧。每条事件简洁但有梗，避免说教。
【硬要求】
- 输出严格的 JSON 数组（不要 markdown 代码块包裹）
- 每个事件结构：{"title":"事件标题","intro":"事件描述 30-60 字","options":[{"label":"选项 5-12 字","result":"结果 30-60 字","effects":{"cultivation":数,"luck":数,"body":数,"insight":数,"root":数,"wealth":数,"beauty":数,"fame":数,"attention":数,"stones":数}}]}
- options 数量恰好 3 个
- effects 字段只保留有变化的属性，数值范围 -8 到 +30
- 不要重复其他事件的场景/动作
- 不要包含 emoji 或特殊符号在 JSON 内
- 不要任何解释文字，只输出 JSON 数组

现在开始：`;
}

function call(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.95, maxOutputTokens: 16000, responseMimeType: "application/json" },
    });
    const req = https.request({
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/${MODEL}:generateContent`,
      method: "POST",
      headers: { "Content-Type": "application/json", "X-goog-api-key": KEY, "Content-Length": Buffer.byteLength(body) },
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const obj = JSON.parse(data);
          const text = obj.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!text) return reject(new Error("空响应: " + data.slice(0, 200)));
          resolve(text);
        } catch (e) { reject(e); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function parseEvents(text) {
  // Strip code-block markers if present
  const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  try {
    const arr = JSON.parse(cleaned);
    if (!Array.isArray(arr)) throw new Error("not array");
    return arr.filter((e) => e && e.title && e.intro && Array.isArray(e.options) && e.options.length >= 2);
  } catch (e) {
    console.warn("解析失败，原始片段:", cleaned.slice(0, 150));
    return [];
  }
}

(async () => {
  const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];
  const seenTitles = new Set(out.map((e) => e.title));
  console.log(`目标：${ROUNDS} 轮 × ${BATCH} 个 = ${ROUNDS * BATCH} 候选事件 | 分类: ${CATEGORY} | 已存在: ${out.length}`);
  for (let i = 0; i < ROUNDS; i += 1) {
    process.stdout.write(`轮 ${i + 1}/${ROUNDS}... `);
    try {
      const text = await call(buildPrompt(BATCH, CATEGORY));
      const events = parseEvents(text);
      let added = 0;
      events.forEach((e) => {
        if (!seenTitles.has(e.title)) {
          seenTitles.add(e.title);
          out.push({ ...e, category: CATEGORY, _gen: "gemini" });
          added += 1;
        }
      });
      console.log(`返回 ${events.length}，新增 ${added}（累计 ${out.length}）`);
      fs.mkdirSync(path.dirname(OUT), { recursive: true });
      fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
    } catch (e) {
      console.log(`失败 ${e.message}`);
    }
    // 节流：避免触发 rate limit
    await new Promise((r) => setTimeout(r, 1200));
  }
  console.log(`\n✓ 完成。共 ${out.length} 个事件已写入 ${OUT}`);
})();
