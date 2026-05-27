// 一键大批量生成：所有分类各 N 个事件，合并到 data/events-extra.json
// GEMINI_API_KEY=xxx node scripts/generate-all.js [--per 80]
const { spawnSync } = require("child_process");
const path = require("path");

const args = process.argv.slice(2);
const getArg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i+1] : d; };
const PER_CATEGORY = Number(getArg("--per", "80"));
const BATCH = 10;
const ROUNDS = Math.ceil(PER_CATEGORY / BATCH);

const CATS = ["childhood", "initiation", "mortal", "qi", "foundation", "golden", "nascent", "artifact", "crossover", "cameo"];
const OUT = path.join(__dirname, "..", "data", "events-extra.json");

console.log(`计划：${CATS.length} 分类 × ${PER_CATEGORY} 个 = ${CATS.length * PER_CATEGORY} 候选事件`);
console.log(`输出：${OUT}`);

for (const cat of CATS) {
  console.log(`\n=== ${cat} ===`);
  const r = spawnSync("node", [
    path.join(__dirname, "expand-events.js"),
    "--rounds", String(ROUNDS),
    "--batch", String(BATCH),
    "--category", cat,
    "--output", OUT,
  ], { stdio: "inherit", env: process.env });
  if (r.status !== 0) console.warn(`${cat} 退出码 ${r.status}`);
}
console.log("\n✓ 全部分类完成");
