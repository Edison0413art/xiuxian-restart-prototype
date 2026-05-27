# 修仙重开模拟器

一款手机网页文字修仙模拟小游戏。主流程参考《人生重开模拟器》，主题改为修仙、网络梗、动漫乱入和左韩天尊随机灾厄。

## 玩法

- 投胎入道：抽 10 天赋选 3 个，20 点属性自由分配
- 从 0 岁开局，每年遭遇随机或主线事件
- 主线 17+ 条 / 支线 30+ 条 / 动漫客串 8+ 条（哆啦 A 梦、悟空、柯南、龙猫……）
- 9500+ 选项 / 500 结局
- 死亡时 AI 生成专属墓志铭，主线选择时 AI 旁白回响（需配 API key）

## 在线 demo

部署到 GitHub Pages 后访问：`https://<用户名>.github.io/<仓库名>/`

## 本地运行

```bash
node server.js
# 打开 http://localhost:4173
```

## 启用 AI 加戏（可选）

不配 key 也能玩，AI 文案会走本地兜底。要启用真 AI：

```bash
# Gemini（推荐，免费配额够用）
export GEMINI_API_KEY=你的key
node server.js

# 或 DeepSeek
export DEEPSEEK_API_KEY=你的key
node server.js
```

## 内容扩容（用 Gemini 批量生成事件）

```bash
# 一次刷所有分类各 80 个事件
GEMINI_API_KEY=你的key node scripts/generate-all.js --per 80

# 单分类
GEMINI_API_KEY=你的key node scripts/expand-events.js --category mortal --rounds 8 --batch 10
```

生成的事件存进 `data/events-extra.json`，主游戏启动自动加载。

## 致谢

- 灵感：[VickScarlet/lifeRestart](https://github.com/VickScarlet/lifeRestart)
- 内容扩展：Google Gemini API
- 修仙梗、网络梗、动漫梗的所有创作者
