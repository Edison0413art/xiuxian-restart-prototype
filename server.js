const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const deepseekKey = process.env.DEEPSEEK_API_KEY || "";
const deepseekModel = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const geminiKey = process.env.GEMINI_API_KEY || "";
const geminiModel = process.env.GEMINI_MODEL || "gemini-flash-latest";

// 统一 AI 调用：优先 Gemini，回退 DeepSeek
async function callAI(systemPrompt, userContent, opts = {}) {
  const { maxTokens = 180, temperature = 0.9 } = opts;
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

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "POST" && url.pathname === "/api/heaven-commentary") {
      return handleHeaven(req, res);
    }
    if (req.method === "POST" && url.pathname === "/api/epitaph") {
      return handleEpitaph(req, res);
    }
    if (req.method === "POST" && url.pathname === "/api/narrator") {
      return handleNarrator(req, res);
    }

    const target = safePath(url.pathname === "/" ? "/index.html" : url.pathname);
    if (!target) return notFound(res);
    fs.readFile(target, (error, data) => {
      if (error) return notFound(res);
      res.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream" });
      res.end(data);
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "server_error" }));
  }
});

server.listen(port, () => {
  console.log(`修仙重开模拟器原型运行中：http://localhost:${port}`);
});

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const target = path.join(root, normalized);
  return target.startsWith(root) ? target : null;
}

function notFound(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}

async function handleHeaven(req, res) {
  const body = await readBody(req);
  let payload = {}; try { payload = JSON.parse(body || "{}"); } catch (_) {}
  const sys = "你是修仙重开模拟器里的天道旁白。用中文写一段80字以内的搞笑点评，风格网络梗、修仙爽文梗混合，不要输出解释。";
  const r = await callAI(sys, JSON.stringify(payload), { maxTokens: 180 });
  return json(res, { text: r.text || localCommentary(payload), provider: r.provider });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy();
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function json(res, value) {
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

function localCommentary(payload) {
  const tags = Array.isArray(payload.tags) && payload.tags.length ? payload.tags.slice(0, 3).join("、") : "无标签";
  return `天道点评：${payload.name || "这位道友"}最高境界${payload.realm || "凡人"}，一生关键词是${tags}。结尾原因「${payload.reason || "剧情收束"}」，建议下次看见左韩天尊先装成路边石头。`;
}

// ============== 死亡墓志铭 ==============
async function handleEpitaph(req, res) {
  const body = await readBody(req);
  let payload = {}; try { payload = JSON.parse(body || "{}"); } catch (_) {}
  const sys = "你是修仙游戏的墓志铭撰写者。根据玩家信息写一段 40 字以内的中文墓志铭，风格悲壮幽默，可带网络梗或修仙梗，不要解释。";
  const r = await callAI(sys, JSON.stringify(payload), { maxTokens: 120, temperature: 0.95 });
  return json(res, { text: r.text || localEpitaph(payload), provider: r.provider });
}

function localEpitaph(p) {
  const name = p.name || "无名道友";
  const age = p.age || 0;
  const reason = p.reason || "剧情收束";
  return `${name}，享年 ${age} 岁。生前一句口头禅"我命由我"，死于${reason}。墓前长草，年年青。`;
}

// ============== 主线旁白回响 ==============
async function handleNarrator(req, res) {
  const body = await readBody(req);
  let payload = {}; try { payload = JSON.parse(body || "{}"); } catch (_) {}
  const sys = "你是修仙游戏的天道旁白。玩家刚刚在主线剧情中做了一个选择，用一句中文（30 字以内）从未来视角点评这个选择会带来的影响。要带预言感和修仙气息，不要解释。";
  const r = await callAI(sys, JSON.stringify(payload), { maxTokens: 80, temperature: 0.85 });
  return json(res, { text: r.text || localNarrator(payload), provider: r.provider });
}

function localNarrator(p) {
  const tpls = [
    `天道暗自记下：${p.option || "你这一步"}，三十年后会回头找你。`,
    `这一选，让你的命格悄悄翻了一页。`,
    `旁白沉默三秒，决定先不剧透。`,
    `你不知道，左韩天尊远远地看了你一眼。`,
    `因果簿上多了一行小字：因为这次选择。`,
  ];
  return tpls[Math.floor(Math.random() * tpls.length)];
}
