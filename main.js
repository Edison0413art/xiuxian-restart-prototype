(function () {
  const $app = document.querySelector("#app");

  const ATTRS = [
    ["root", "灵根"],
    ["insight", "悟性"],
    ["body", "体魄"],
    ["wealth", "家底"],
    ["luck", "气运"],
    ["beauty", "颜值"],
  ];

  const EXTRA_LABELS = {
    age: "年龄",
    cultivation: "修为",
    stones: "灵石",
    fame: "名声",
    attention: "左韩注视",
    life: "寿元",
  };

  const REALMS = [
    { name: "凡人", life: 80, threshold: 12, span: [1, 1] },
    { name: "炼气", life: 120, threshold: 30, span: [1, 3] },
    { name: "筑基", life: 200, threshold: 65, span: [1, 3] },
    { name: "金丹", life: 500, threshold: 110, span: [5, 10] },
    { name: "元婴", life: 1000, threshold: 190, span: [30, 60] },
    { name: "化神", life: 3000, threshold: 300, span: [50, 100] },
    { name: "炼虚", life: 8000, threshold: 460, span: [100, 300] },
    { name: "合体", life: 20000, threshold: 660, span: [300, 800] },
    { name: "大乘", life: 50000, threshold: 920, span: [800, 1600] },
    { name: "渡劫", life: 90000, threshold: 1280, span: [1000, 3000] },
  ];

  const CATEGORY_PLAN = [
    ["childhood", "出生/家庭/童年/早死", 360],
    ["initiation", "少年期/测灵根/拜师/入宗", 300],
    ["mortal", "凡人江湖/村庄/市井/小地图", 300],
    ["qi", "炼气期日常与小奇遇", 280],
    ["foundation", "筑基期秘境/宗门/散修线", 260],
    ["golden", "金丹期装逼/夺宝/翻车", 220],
    ["nascent", "元婴及以上大事件", 200],
    ["zuohan", "左韩天尊事件链", 160],
    ["cameo", "热门小说主角乱入", 160],
    ["crossover", "霸总/重生/番茄/都市串台", 140],
    ["artifact", "法宝/戒指/老爷爷/系统流", 160],
    ["death", "特殊死亡/隐藏暴毙", 80],
    ["finale", "飞升/终局/特殊路线触发", 50],
  ];

  const MEMES = [
    "尊嘟假嘟",
    "包的",
    "绝绝子",
    "yyds",
    "city不city",
    "电子榨菜",
    "情绪价值",
    "AI味太冲",
    "降本增笑",
    "助我破鼎",
    "敬自己一杯",
    "如何呢又能怎",
    "这把高端局",
    "已读乱回",
    "我嘞个豆",
    "抽象到元婴出窍",
    "显眼包",
    "松弛感",
    "脆皮修士",
    "上链接",
    "爆改命格",
    "质疑天道，理解天道，成为天道",
  ];

  const NOVEL_NAMES = [
    "萧炎",
    "韩立",
    "叶凡",
    "唐三",
    "石昊",
    "王林",
    "罗峰",
    "林动",
    "牧尘",
    "楚风",
    "张若尘",
    "许七安",
  ];

  const RANDOM_SURNAMES = ["林", "苏", "叶", "楚", "顾", "沈", "姜", "陆", "秦", "白", "洛", "谢"];
  const RANDOM_NAMES = ["小凡", "玄清", "无敌", "苟圣", "二狗", "云起", "忘川", "大壮", "长生", "铁柱", "明月", "九歌"];

  const ROUTES = [
    { id: "marriage", name: "退婚三年之约线", stages: ["被看不起", "喊出三年之约", "暗中发育", "反手打脸", "把退婚书裱起来"] },
    { id: "ring", name: "戒指老爷爷夺舍线", stages: ["戒指发热", "老爷爷开机", "开始教学", "疑似夺舍", "反向收编"] },
    { id: "zuohan", name: "左韩注视线", stages: ["听见传闻", "遭遇余波", "被注视", "本体路过", "终局对峙"] },
    { id: "beautyDoom", name: "颜值天妒线", stages: ["建模过高", "路人围观", "天道警告", "雷劫定位", "美到逆天"] },
    { id: "survivor", name: "凡人苟道线", stages: ["先活下来", "能跑就跑", "绕开主线", "苟出名堂", "苟成传说"] },
    { id: "overbearing", name: "霸总串台线", stages: ["眼神三分凉薄", "办公室飞升", "短剧爆款", "合同成道", "霸总天道"] },
  ];

  const LEFT_HAN_TIERS = [
    { id: "rumor", label: "左韩传闻", weight: 10, deathChance: 0.005 },
    { id: "aftershock", label: "左韩余波", weight: 4, deathChance: 0.035 },
    { id: "body", label: "左韩本体路过", weight: 0.4, deathChance: 0.18 },
  ];

  const DEATH_REASONS = {
    childhood: ["夭折", "意外噎死", "高烧不退", "踩空跌伤", "童年期暴毙"],
    initiation: ["拜师考核惨案", "测灵根反噬", "三年之约爽约", "外门考核失手", "宗门内斗误伤"],
    mortal: ["市井意外", "被流寇所杀", "误饮假灵酒", "横尸街头", "暴雨夜失温"],
    qi: ["走火入魔", "炼气期心魔", "妖兽伏击", "丹田炸裂", "夜行遭袭"],
    foundation: ["筑基反噬", "古修留下的陷阱", "雷劫擦边", "心魔上身", "秘境塌陷"],
    golden: ["金丹炸炉", "仇家围杀", "天榜结仇", "异象引劫", "渡劫前夕暴毙"],
    nascent: ["元婴出窍未归", "界域裂缝吞噬", "万族截杀", "大能论道殒落", "天道审计不过"],
    zuohan_rumor: ["被传闻吓出心病", "听见左韩名字三日不食", "传闻入魂", "心智被传言侵蚀"],
    zuohan_aftershock: ["余波擦肩重伤", "余波震碎丹田", "余波刮过形体散", "被远方气浪扫飞"],
    zuohan_body: ["左韩天尊轻轻一指", "左韩天尊抬眼即终", "左韩天尊路过的副作用", "被左韩天尊顺手抹除"],
    cameo: ["与主角同框被气运碾过", "主角光环辐射致死", "被主角的因果连带"],
    crossover: ["剧本串台失控", "短剧节奏过快猝死", "被霸总凝视致心碎"],
    artifact: ["法宝反噬", "戒指自爆", "器灵叛变", "系统强制更新失败"],
    death: ["天道补丁勿删", "剧情边界外坠落", "隐藏死法触发", "野生旁白下线"],
    finale: ["飞升前一步坠落", "终局棋盘崩塌", "天门关闭失踪"],
    ascension: ["飞升成功", "羽化登仙", "天门收徒"],
    body: ["脆皮形体崩散", "气血耗尽暴毙"],
    beauty: ["天妒红颜", "建模过载被审"],
    poverty: ["饥寒交迫", "辟谷未成饿死"],
    breakthrough: ["突破炸号", "强行突破爆体"],
    age: ["寿元耗尽", "无疾而终"],
    zuohan: ["被左韩天尊点名", "左韩相关事件致死"],
  };

  function pickDeathReason(category, leftHanTier) {
    let key = category;
    if (leftHanTier?.id === "rumor") key = "zuohan_rumor";
    else if (leftHanTier?.id === "aftershock") key = "zuohan_aftershock";
    else if (leftHanTier?.id === "body") key = "zuohan_body";
    const pool = DEATH_REASONS[key] || DEATH_REASONS.death;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  const sessionCatalog = {
    endings: [],
    deaths: [],
    routes: [],
  };

  const MAX_REROLLS = 3;
  let lastRunSnapshot = null;
  // 会话级结局抽中次数：让稀有结局在多局后必然轮到
  const endingPickCounts = {};

  const ATTR_PRESETS = [
    { id: "survivor", name: "苟道流", attrs: { root: 2, insight: 3, body: 5, wealth: 2, luck: 6, beauty: 2 } },
    { id: "root",     name: "灵根流", attrs: { root: 8, insight: 5, body: 3, wealth: 1, luck: 2, beauty: 1 } },
    { id: "beauty",   name: "颜值流", attrs: { root: 2, insight: 2, body: 3, wealth: 1, luck: 4, beauty: 8 } },
    { id: "wealthy",  name: "富二代", attrs: { root: 2, insight: 2, body: 2, wealth: 8, luck: 3, beauty: 3 } },
    { id: "balanced", name: "平衡",   attrs: { root: 4, insight: 4, body: 3, wealth: 3, luck: 3, beauty: 3 } },
  ];

  const CHOICE_EMOJI = {
    childhood: "👶",
    initiation: "🏯",
    mortal: "🏘",
    qi: "🌱",
    foundation: "⛰",
    golden: "🟡",
    nascent: "🐉",
    zuohan: "👁",
    cameo: "🎭",
    crossover: "📱",
    artifact: "💍",
    death: "💀",
    finale: "✨",
  };

  const TITLE_TEMPLATES = [
    "{scene}·{action}",
    "{action}于{scene}",
    "{scene}：{action}",
    "{scene}遭遇{action}",
    "在{scene}{action}",
    "{scene}{action}",
    "夜过{scene}·{action}",
    "{action}——记于{scene}",
    "关于{scene}的{action}",
    "{scene}今日{action}",
  ];

  const INTRO_TEMPLATES = {
    childhood: [
      "你还没断奶，{scene}就出现了{action}。村里小孩围观，押注你能不能撑过这一集。",
      "{scene}热闹起来——你刚学会爬，就遭遇了{action}。",
      "刚被抱出门，你在{scene}撞上{action}，奶娘差点把奶瓶丢出去。",
      "{scene}的老人指着你说：这小孩{action}，将来要么飞升要么暴毙。",
      "你试图在{scene}进行{action}，可惜旁白还没读到这一页。",
      "{scene}的夕阳特别红，你正巧赶上{action}。",
      "你睡到一半被{scene}的怪声吵醒，循声而去，原来是{action}。",
      "邻居家小孩在{scene}找你玩，结果一起经历了{action}。",
      "{scene}今天人不多，你刚好被命运挑中{action}。",
    ],
    initiation: [
      "{scene}集合，长老盯着你看了三秒，决定让你试试{action}。",
      "你被叫上{scene}，硬着头皮接下了{action}。",
      "{scene}上你做出{action}的选择，外门弟子刷起一句「{meme}」。",
      "你在{scene}排队等到天黑，结果排到的是{action}。",
      "{scene}今日格外严肃，因为你居然敢{action}。",
    ],
    mortal: [
      "你蹲在{scene}，做出{action}的离谱选择。",
      "{scene}人来人往，没人发现你正悄悄{action}。",
      "{scene}里说书人把你的{action}讲成了下一章。",
      "你在{scene}遇上{action}，街边大爷直摇头。",
      "{scene}传出一阵骚动，原来是你又在{action}。",
    ],
    qi: [
      "你打坐于{scene}，准备{action}。",
      "{scene}内灵气微动，你尝试{action}，结果差点漏气。",
      "夜深，{scene}还亮着灯，你正在{action}。",
      "{scene}和同门一起{action}，气氛突然安静。",
      "你在{scene}抓住一次{action}的机会，手都在抖。",
    ],
    foundation: [
      "{scene}入口闪烁，你被{action}牵着鼻子走了进去。",
      "你独自闯入{scene}，没想到正撞上{action}。",
      "{scene}深处传来异响，循声而去，正是{action}。",
      "你在{scene}发现{action}的痕迹，犹豫三秒还是跟了上去。",
      "{scene}盘旋着古老气息，{action}就摆在你面前。",
    ],
    golden: [
      "{scene}灯火通明，你登场，准备{action}。",
      "你被请上{scene}的高台，全场注视你{action}。",
      "{scene}聚集了各路高手，你却选择{action}。",
      "在{scene}面前，你毫不犹豫地{action}。",
      "{scene}传出消息：那位金丹修士又要{action}了。",
    ],
    nascent: [
      "{scene}震动三息，你随手{action}。",
      "万族汇聚{scene}，你做出{action}的决定，全场屏息。",
      "{scene}之上，你以元婴神识{action}。",
      "{scene}的天幕被你{action}撕开一角。",
      "你立于{scene}，从容地{action}，弹幕只剩「{meme}」。",
    ],
    zuohan_rumor: [
      "{scene}传来低语，有人在说左韩天尊最近{action}。",
      "你在{scene}听见两个茶客议论：左韩天尊{action}了。",
      "{scene}的小道消息说，左韩天尊{action}。你装作没听见。",
      "{scene}有人压低声音：你知道吗，左韩天尊{action}。",
      "{scene}飘过一句「{meme}」——内容大致是左韩天尊{action}。",
    ],
    zuohan_aftershock: [
      "{scene}的小地图突然抖了一下，远处方向，左韩天尊{action}。",
      "你在{scene}感到一阵气场压过来，是左韩余波，他在{action}。",
      "{scene}传来无声的震荡，所有人都看向远方——左韩天尊{action}。",
      "{scene}天色一沉，原来左韩在远方{action}。",
      "你蹲在{scene}屏住呼吸，听见远处他正在{action}。",
    ],
    zuohan_body: [
      "{scene}突然安静下来，左韩天尊就站在那里，正在{action}。",
      "你抬头一看，{scene}里那个身影，是要{action}的左韩天尊。",
      "{scene}空气一冻，左韩天尊从你面前路过，顺手{action}。",
      "你来不及反应，左韩天尊已经在{scene}{action}。",
      "{scene}里，他看了你一眼，然后开始{action}。",
    ],
    cameo: [
      "{scene}的拐角处，{actor}迎面走来，正在{action}。",
      "你和{actor}在{scene}撞个正着，对方刚好要{action}。",
      "{actor}出现在{scene}，跟你说：喂，要不要一起{action}？",
      "{scene}多了一个熟悉身影：{actor}正在{action}。",
      "你在{scene}加了{actor}的好友，对话第一句就是{action}。",
    ],
    crossover: [
      "{scene}的剧情突然串台，你被卷进了{action}。",
      "你的人生页面切到{scene}，弹幕开始刷{action}。",
      "{scene}画风一变，居然冒出{action}。",
      "你站在{scene}，发现自己被安排去{action}。",
      "{scene}播放着热榜，第一名就是你{action}的视频。",
    ],
    artifact: [
      "{scene}发出微光，提示你{action}。",
      "你刚摸到{scene}，它就主动{action}。",
      "{scene}里传出一句：少年，你{action}试试？",
      "{scene}对你做出{action}的姿态，你怀疑它是想跑路。",
      "你打开{scene}，弹出一行字：正在{action}……",
    ],
    death: [
      "{scene}已经预备好了你的剧本，下一行就是{action}。",
      "你站在{scene}时，没想到自己会{action}。",
      "{scene}毫无征兆地塌缩，你的人生开始{action}。",
      "你刚踏入{scene}，旁白提前播报：接下来你将{action}。",
      "{scene}的弹幕统一刷「{meme}」，因为你在{action}。",
    ],
    finale: [
      "{scene}缓缓打开，你迈出脚步去{action}。",
      "你抵达{scene}，准备最后的{action}。",
      "{scene}前你深吸一口气，开始{action}。",
      "{scene}显现真容，你被允许{action}。",
      "{scene}的天道弹幕齐刷「{meme}」，因为你正在{action}。",
    ],
  };

  // ============================================================
  // FATED EVENTS — 三层事件系统的「主线 + 支线」部分
  // tier: 'main' 或 'side'
  // requires: 触发条件（age 范围 / realm 范围 / flags / talents / attrs）
  // sets: 触发后自动写入的 flags
  // options[].sets: 选了这个选项才写入的 flags
  // options[].effects: 数值变化
  // options[].triggersDeath / triggersAscension: 特殊结局
  // ============================================================
  const FATED_EVENTS = [
    // ============ 主线 ============
    {
      id: "main:birth", tier: "main", title: "出生·命格初定",
      intro: "你呱呱坠地，村口老者捻须凑近看你。屋外天色异常，他低声说：这孩子将来要么飞升，要么把村子拆了。你的第一反应是？",
      requires: { ageMax: 0 }, once: true,
      options: [
        { label: "哭得震天响", result: "你哭声把山神都引来，山神探头看了一眼说有缘，转身走了。", effects: { fame: 1, attention: 1, luck: 1 }, sets: ["birth_loud"] },
        { label: "安安静静像看戏", result: "你睁眼时眼神三分凉薄，奶娘以为你病了，差点送医。", effects: { insight: 1, beauty: 1, fame: -1 }, sets: ["birth_quiet"] },
        { label: "直接盘腿打坐", result: "你刚出生就盘腿坐起，村人疯了，村长当场建小庙。", effects: { insight: 2, root: 1, attention: 3, fame: 4 }, sets: ["birth_prodigy"] },
      ],
    },
    {
      id: "main:first_taste", tier: "main", title: "第一次接触修真",
      intro: "村里来了个游方道士，掏出半截木剑表演御剑飞行。所有孩子都看呆了。你做什么？",
      requires: { ageMin: 5, ageMax: 8 }, once: true,
      options: [
        { label: "缠着道士问个不停", result: "道士被你问烦了，扔给你一本残破《引气诀》：拿去自学，别再问了。", effects: { cultivation: 5, insight: 1 }, sets: ["first_taste_curious", "has_yinqijue"] },
        { label: "回家把这事告诉爹娘", result: "爹娘连夜把家里铜钱都拿出来，找道士问能不能让你拜师。道士摆手走了，但你爹的眼神变了。", effects: { wealth: -2, fame: 1 }, sets: ["first_taste_family"] },
        { label: "偷偷跟上他", result: "你跟着道士走了三里地，他突然转身：小娃娃，跟我做啥？你回他：我想看你怎么飞。他笑了，往你手里塞了块灵石。", effects: { stones: 5, luck: 1, cultivation: 3 }, sets: ["first_taste_follow"] },
      ],
    },
    {
      id: "main:test_root", tier: "main", title: "测灵根大会",
      intro: "十二岁这年，各大宗门的招新使者来了村里。测灵根珠依次发光，轮到你时——",
      requires: { ageMin: 10, ageMax: 13 }, once: true,
      options: [
        { label: "认真测一次", result: "珠子的反应取决于你的灵根天赋，宗门使者的眼神也跟着变。", effects: {}, sets: ["root_revealed"], computedEffect: "revealRoot" },
        { label: "故意装失败", result: "你按住珠子让它别亮，使者扫了一眼就把你跳过。你松一口气——也错过了一个可能的机会。", effects: { luck: 2, fame: -1 }, sets: ["root_hidden"] },
        { label: "搞砸整场", result: "你假装抽搐把珠子打掉，全场哗然。使者怒视你，村长当晚跟你爹谈了三个时辰。", effects: { fame: -3, luck: 1, attention: 2 }, sets: ["root_chaos"] },
      ],
    },
    {
      id: "main:leave_home", tier: "main", title: "十六岁·离家抉择",
      intro: "你已经十六岁了。村子留不住你，但下一步往哪走？",
      requires: { ageMin: 14, ageMax: 18 }, once: true,
      options: [
        { label: "拜入正派宗门", result: "你叩开宗门山门，递上举荐信。长老们眼神交换了一下，把你领进了外门弟子楼。", effects: { cultivation: 8, fame: 2 }, sets: ["path_sect"] },
        { label: "做散修闯江湖", result: "你不愿被宗门管束，背着包袱进了城。第一周你被骗了一次，第二周你学会了骗别人。", effects: { wealth: 3, luck: 1, fame: 1 }, sets: ["path_rogue"] },
        { label: "留下守着村子", result: "你选择不走。村里人都说你怂，但你笑着帮人挑水，三年后山上来了个穿白衣的道人专门找你。", effects: { body: 2, luck: 3 }, sets: ["path_homebody"] },
        { label: "听说魔教在招人", result: "你揣着一封黑色帖子进了山。来接你的师兄笑容很客气，但你看到他袖口有血迹。", effects: { cultivation: 12, attention: 3, luck: -2 }, sets: ["path_evil"] },
      ],
    },
    {
      id: "main:first_kill", tier: "main", title: "第一次面对死亡",
      intro: "你已经入了道。一场冲突里，对面那人已被你逼到死角，剑指着他咽喉。他求饶。",
      requires: { realmMin: 1, ageMin: 25, ageMax: 80 }, once: true,
      options: [
        { label: "一剑了之", result: "你刺下去，溅血的声音比想象中安静。当晚你睡得很好，第二天醒来心里空了一块。", effects: { cultivation: 8, attention: 1, fame: 2 }, sets: ["killed_first"] },
        { label: "放他一马", result: "你收剑。他磕头道谢跑了。三十年后他成了元婴大能，记着这份情，关键时刻救了你一命。", effects: { luck: 4, fame: 1 }, sets: ["spared_first"] },
        { label: "废他修为", result: "你点了他丹田，看他瘫在地上骂你。这种处理方式在道上传开，敌人多了，朋友也多了。", effects: { cultivation: 4, fame: 3, attention: 2 }, sets: ["maimed_first"] },
      ],
    },
    {
      id: "main:doulu", tier: "main", title: "道侣相遇",
      intro: "筑基期里你认识了一个人。Ta 修为与你相近，性格与你相补。某天 Ta 在月下对你说：道途漫漫，要不要一起走？",
      requires: { realmMin: 2, ageMin: 50, ageMax: 200 }, once: true,
      options: [
        { label: "结为道侣", result: "你们正式结契。从此修行多了一份责任，也多了一份慰藉——但你们的敌人也加倍了。", effects: { cultivation: 10, body: 2, attention: 1 }, sets: ["has_doulu"] },
        { label: "保持挚友", result: "你说道侣太重，挚友刚好。Ta 笑笑没说什么，几十年后还是你最可靠的后援。", effects: { luck: 3, insight: 2 }, sets: ["has_zhongji_friend"] },
        { label: "婉拒并远走", result: "你怕分心，连夜离开了那座城。Ta 找了你五百年没找到。你赢得了清修，输掉了一段缘。", effects: { insight: 3, luck: -2 }, sets: ["refused_doulu"] },
      ],
    },
    {
      id: "main:vendetta", tier: "main", title: "金丹劫·仇家清算",
      intro: "你结了金丹，但消息走漏了。几十年的旧账主一齐找上门来。",
      requires: { realmMin: 3, ageMin: 100 }, once: true,
      options: [
        { label: "正面硬撼", result: "你立于山门口，单挑七个金丹修士。打到天昏地暗，赢下三成。", effects: { cultivation: 20, body: -3, fame: 8, attention: 3 }, sets: ["vendetta_won"] },
        { label: "邀盟友共战", result: "你召集了所有人情，朋友们陆续到场。这一战让你看清谁真谁假。", effects: { cultivation: 12, fame: 4, luck: 2 }, sets: ["vendetta_coop"], requiresFlag: ["spared_first", "has_doulu", "has_zhongji_friend"] },
        { label: "金蝉脱壳跑路", result: "你布下幻阵，自己换了张脸跑路五十年。仇家追了一阵就散了，你换了个名字继续修。", effects: { cultivation: 5, luck: 3, fame: -2 }, sets: ["vendetta_fled", "lay_low"] },
      ],
    },
    {
      id: "main:cosmic_stage", tier: "main", title: "万族瞩目·大世界入场",
      intro: "你的元婴突破后，远古传送阵向你开放。你将踏入更广阔的世界——但回不来的概率是 30%。",
      requires: { realmMin: 4, ageMin: 200 }, once: true,
      options: [
        { label: "踏入万族之地", result: "你站在传送阵中央，光闪过，你的人生进入了另一张地图。", effects: { cultivation: 30, insight: 5, attention: 2 }, sets: ["entered_cosmic"] },
        { label: "留守本界", result: "你目送同辈消失在光中。你留下来做本界宗主，三百年内整顿了整个修真界秩序。", effects: { fame: 10, body: 3, cultivation: 12 }, sets: ["stayed_local"] },
        { label: "潜入秘境闭关", result: "你不去万族，也不当宗主，找了个秘境闭关八百年。出关时世界已经变了样。", effects: { cultivation: 25, insight: 8, luck: 2 }, sets: ["deep_seclusion"] },
      ],
    },
    {
      id: "main:cosmic_truth", tier: "main", title: "化神真相·天道的秘密",
      intro: "化神之上，你窥见了天道的一角。原来这个世界是——",
      requires: { realmMin: 5, ageMin: 500 }, once: true,
      options: [
        { label: "记下真相继续修", result: "你把这一切藏在心里，继续按自己的节奏走。知道真相的人活得更辛苦，但更清醒。", effects: { insight: 10, cultivation: 20, attention: 4 }, sets: ["knows_truth"] },
        { label: "把真相告诉同道", result: "你写了一本《天道补丁说明书》四处散发。三天后你被通缉，但有十几个修士开始追随你。", effects: { fame: 15, attention: 8, luck: -3 }, sets: ["truth_spread"] },
        { label: "假装没看见", result: "你眨眨眼，告诉自己刚才什么都没看到。天道似乎也松了口气。", effects: { luck: 6, insight: 2 }, sets: ["truth_denied"] },
      ],
    },
    {
      id: "main:final_choice", tier: "main", title: "最后抉择·飞升前夜",
      intro: "你站在飞升通道前。回首一生，路尽于此。你最后想做的事是？",
      requires: { realmMin: 7, ageMin: 1000 }, once: true,
      options: [
        { label: "直接飞升", result: "你迈步进入光门，三界的风在你身后合拢。", effects: { cultivation: 50 }, triggersAscension: true },
        { label: "留一身传承再走", result: "你把毕生功法刻在飞升崖的石壁上。后人会感谢你，但你飞升的时机晚了三十年。", effects: { fame: 20, cultivation: 30 }, sets: ["left_legacy"], triggersAscension: true },
        { label: "拒绝飞升·留在人间", result: "你转身下崖。从此天道里少了一个名字，凡间多了一个无名老人。", effects: { luck: 10 }, sets: ["refused_ascension"], triggersDeath: { reason: "拒绝飞升", text: "你选择留在人间。寿元尽时，你死在自家院子里，孙辈环侍。", kind: "normal" } },
      ],
    },

    // ============ 戒指老爷爷支线 ============
    {
      id: "side:ring:1", tier: "side", title: "戒指发热",
      intro: "你手上那枚不起眼的破戒指突然发热。一个沙哑的声音在脑中说：少年，给我一点灵气，我请你吃顿饱的。",
      requires: { ageMin: 5, ageMax: 12, talents: ["t006"] }, once: true,
      options: [
        { label: "立刻把灵气渡过去", result: "戒指吸了你三个时辰的灵气，戒指里那位「啊」了一声睡着了。你浑身虚脱但心里激动。", effects: { cultivation: -3, insight: 2 }, sets: ["ring_charged"] },
        { label: "先试探问问他是谁", result: "你死活不渡灵气。老头沉默了一会儿，扔了块灵石出来：拿去买糖，下次再说。", effects: { stones: 8, luck: 1 }, sets: ["ring_distrust"] },
        { label: "假装没听见", result: "你把戒指扔进床底。三天后它自己滚出来，你叹气把它捡回来。这一来一回，老头记住了。", effects: { luck: -1, attention: 1 }, sets: ["ring_ignored"] },
      ],
    },
    {
      id: "side:ring:2", tier: "side", title: "老爷爷开机",
      intro: "戒指里那位老头终于完整露面——半透明的元神坐在你戒指上。他开口第一句话：少年，要不要修真？",
      requires: { ageMin: 15, ageMax: 30, flags: ["ring_charged", "ring_distrust", "ring_ignored"], anyFlag: true }, once: true,
      options: [
        { label: "跪下喊师父", result: "老头一愣，咳嗽两声：起来起来，我教你不收磕头礼。从此你多了一位天天念叨的师父。", effects: { cultivation: 15, insight: 4 }, sets: ["ring_master"] },
        { label: "先签协议再说", result: "你掏出纸笔列了八条注意事项，包括不能强行夺舍。老头气笑了，但还是按了手印。", effects: { cultivation: 8, insight: 3, luck: 2 }, sets: ["ring_contract"] },
        { label: "你才几岁就当老师傅了", result: "你嘲讽他，老头哼了一声把戒指变冷。你们冷战了十年，最后还是他先开口教你。", effects: { cultivation: 5, fame: 1 }, sets: ["ring_master"] },
      ],
    },
    {
      id: "side:ring:3", tier: "side", title: "老爷爷正式教学",
      intro: "你和老头相处多年，他终于决定把毕生绝学拿出来。但他翻出来的功法名字让你愣了——《天魔逆夺无上经》。",
      requires: { ageMin: 40, ageMax: 120, flags: ["ring_master", "ring_contract"], anyFlag: true }, once: true,
      options: [
        { label: "学，反正我修得快", result: "你学了。修为暴涨，但你越修越觉得有什么不对——这功法似乎不是给你修的。", effects: { cultivation: 40, attention: 4, body: -2 }, sets: ["ring_learning_evil"] },
        { label: "不学，换一本正经的", result: "你拒绝了。老头气得三天没说话，最后给了你一本《养气长青诀》。你修得慢，但稳。", effects: { cultivation: 15, body: 4, luck: 3 }, sets: ["ring_learning_safe"] },
        { label: "假装学，偷偷改名字", result: "你把功法名改成《天魔正夺有限经》，开始按自己的方式融合。这一改竟让功法变性了。", effects: { cultivation: 25, insight: 6, attention: 2 }, sets: ["ring_learning_hybrid"] },
      ],
    },
    {
      id: "side:ring:4", tier: "side", title: "老爷爷的真面目",
      intro: "某夜你醒来，发现戒指里的老头正盯着你看。他叹气说：少年，我对你不起——我教你的，是为了夺你身。今夜便是。",
      requires: { ageMin: 80, ageMax: 300, flags: ["ring_learning_evil", "ring_learning_safe", "ring_learning_hybrid"], anyFlag: true }, once: true,
      options: [
        { label: "拼死反抗", result: "你以本体压制他的元神，三天三夜。最终你赢了，但老头元神被你打散。从此你戒指空了。", effects: { cultivation: -10, body: -5, insight: 8, fame: 5 }, sets: ["ring_resisted"] },
        { label: "反向收编他", result: "你用早就准备好的炼魂阵把他封印进戒指最深处。他现在是你随时可以问问题的图书馆。", effects: { cultivation: 20, insight: 10, attention: 3 }, sets: ["ring_enslaved"], requiresFlag: ["ring_contract", "ring_learning_hybrid"] },
        { label: "接受夺舍", result: "你闭上眼。第二天醒来的身体里，是个比你强千倍的老头，他用你的脸过完了你这一世。", effects: {}, sets: ["ring_taken"], triggersDeath: { reason: "戒指老爷爷夺舍", text: "你最终把身体让给了戒指里的人。他用你的脸活了两百年，回头给你立了块碑。", kind: "artifact" } },
      ],
    },

    // ============ 重生者支线 ============
    {
      id: "side:rebirth:1", tier: "side", title: "模糊的记忆",
      intro: "你才两岁，但脑海里偶尔闪过画面：一个穿黑袍的高大身影从远处走来。你不知道那是谁，但你怕得发抖。",
      requires: { ageMin: 1, ageMax: 4, talents: ["t009"] }, once: true,
      options: [
        { label: "记住这个画面", result: "你把那一刻死死刻在脑子里。多年后你才意识到，那是你上一世死前看到的最后一个画面。", effects: { insight: 3, luck: 2 }, sets: ["re_remembers"] },
        { label: "尝试忘掉", result: "你强行把它压下去。它没消失，只是变成了无名的恐惧，跟了你一辈子。", effects: { insight: 1, luck: -1, attention: 1 }, sets: ["re_suppresses"] },
        { label: "告诉奶娘", result: "奶娘以为你做噩梦，抱着你哄了一夜。她不知道你是真的记得些什么。", effects: { fame: 1, body: 1 }, sets: ["re_told"] },
      ],
    },
    {
      id: "side:rebirth:2", tier: "side", title: "Déjà vu·这地方我来过",
      intro: "你十二岁，第一次踏进山门，突然全身一震——这里的每块石头你都「见过」。这是上一世的记忆。",
      requires: { ageMin: 10, ageMax: 16, flags: ["re_remembers", "re_suppresses", "re_told"], anyFlag: true }, once: true,
      options: [
        { label: "凭记忆走捷径", result: "你直奔记忆里宝物所在的那块石头，挖出一柄半截剑。掌门看你眼神变了。", effects: { cultivation: 15, fame: 3, stones: 10 }, sets: ["re_acted_on_memory"] },
        { label: "假装第一次来", result: "你按部就班，但悄悄记下了所有「我知道接下来会发生什么」的预感。", effects: { insight: 4, luck: 2 }, sets: ["re_hidden_knowledge"] },
        { label: "找掌门坦白", result: "你跟掌门说了实话。他先是震惊，然后郑重把你单独带进了内殿。", effects: { fame: 5, insight: 2, attention: 2 }, sets: ["re_confided"] },
      ],
    },
    {
      id: "side:rebirth:3", tier: "side", title: "上一世的故人",
      intro: "你在一场剑会上认出一张脸——他是上一世害过你的人。但这一世他还是个年轻新秀，没认出你。",
      requires: { ageMin: 30, ageMax: 100, flags: ["re_acted_on_memory", "re_hidden_knowledge", "re_confided"], anyFlag: true }, once: true,
      options: [
        { label: "提前下手除掉他", result: "你以一个无关的借口约他比剑，趁机重伤了他。你不知道这一改，未来会怎样。", effects: { cultivation: 8, attention: 3, fame: 4 }, sets: ["re_killed_enemy"] },
        { label: "拉拢他成为朋友", result: "你刻意接近他，请他喝酒。他真心把你当兄弟，从此以你为友。", effects: { luck: 5, insight: 3 }, sets: ["re_friend_enemy"] },
        { label: "无视并继续修炼", result: "你转身离开。你决定这一世的命运由这一世决定，不被上一世的恩怨绑住。", effects: { insight: 5, luck: 2 }, sets: ["re_let_go"] },
      ],
    },
    {
      id: "side:rebirth:4", tier: "side", title: "避开那场死劫",
      intro: "你算到了——上一世你死的那天就是今天，地点就是脚下这座城。你做什么？",
      requires: { ageMin: 60, ageMax: 200, flags: ["re_remembers", "re_suppresses", "re_told"], anyFlag: true }, once: true,
      options: [
        { label: "离开这座城", result: "你提前三天就走了。死劫没找到你，但找到了原本要救你的那位前辈，他替你死了。", effects: { luck: 3, attention: 2, fame: -2 }, sets: ["re_fled_doom"] },
        { label: "原地等死劫来", result: "你坐在原地等。死劫来了，是左韩天尊路过。这次他看了你一眼，笑了，没出手。", effects: { insight: 8, attention: 5, luck: 4 }, sets: ["re_faced_doom"] },
        { label: "带着所有人离开", result: "你说服整座城的人撤离。第二天那座城被夷为平地，但没人死。你成了那一带传奇。", effects: { fame: 15, luck: 6, attention: 3 }, sets: ["re_saved_all"] },
      ],
    },

    // ============ 天妒红颜支线 ============
    {
      id: "side:beauty:1", tier: "side", title: "村人议论",
      intro: "你五岁那年，村里所有大人都开始说同一句话：这孩子长得不像凡人。你妈听得既骄傲又害怕。",
      requires: { ageMin: 3, ageMax: 8, anyOf: { talents: ["t003"], minAttr: { beauty: 15 } } }, once: true,
      options: [
        { label: "享受所有目光", result: "你学会了对镜子摆姿势。村里人围着你转，但你妈睡眠越来越差。", effects: { beauty: 1, fame: 3, attention: 1 }, sets: ["beauty_embraced"] },
        { label: "躲起来不见人", result: "你天天蒙脸出门。结果传言越来越神，说你脸上有金光不能直视。", effects: { fame: 2, luck: 1 }, sets: ["beauty_hidden"] },
        { label: "故意把脸抓花", result: "你在自己脸上划了几道。第二天伤口愈合了，比之前还好看。你妈崩溃了。", effects: { body: -1, beauty: 1, luck: -2 }, sets: ["beauty_failed_scar"] },
      ],
    },
    {
      id: "side:beauty:2", tier: "side", title: "被觊觎",
      intro: "你十五岁，邻村一个有钱的修士派人来「提亲」。来的人手按剑柄，明显不是商量。",
      requires: { ageMin: 12, ageMax: 20, flags: ["beauty_embraced", "beauty_hidden", "beauty_failed_scar"], anyFlag: true }, once: true,
      options: [
        { label: "委婉拒绝", result: "你陪笑送客，转身就跟爹娘连夜搬家。三个月后那家被一个不知道哪来的大能灭了。", effects: { luck: 3, wealth: -2, fame: -1 }, sets: ["beauty_escaped"] },
        { label: "假意答应再图后计", result: "你点头让他们离开。三个月后他们带聘礼来时，发现你早就拜入了大宗门，长老亲自坐镇。", effects: { cultivation: 10, fame: 4 }, sets: ["beauty_outplayed"] },
        { label: "当场翻脸", result: "你把家里仅有的几枚符箓全部拍出，跟来人打了起来。结果只能用「惨烈」二字形容。", effects: { body: -4, fame: 3, attention: 2 }, sets: ["beauty_fought"] },
      ],
    },
    {
      id: "side:beauty:3", tier: "side", title: "婚约抉择",
      intro: "你三十岁，已是一方人物。三家大派的少主同时上门求亲，全宗修真界都在等你的回答。",
      requires: { ageMin: 25, ageMax: 80, flags: ["beauty_escaped", "beauty_outplayed", "beauty_fought"], anyFlag: true }, once: true,
      options: [
        { label: "全部拒绝走自己的路", result: "你公开说：我修我的道，谁都别拦。三家少主从此各自心碎，但你的名声反而更响。", effects: { fame: 8, insight: 3, attention: 2 }, sets: ["beauty_solo"] },
        { label: "挑一个最弱的", result: "你嫁给了最不显眼那家。十年后你扶他登上掌门之位，整个三家成了你的后台。", effects: { wealth: 10, fame: 6, cultivation: 8 }, sets: ["beauty_strategic"] },
        { label: "办场比武招亲", result: "你设擂台让三家比。结果三家少主互相打得鼻青脸肿，最后赢的人是个不知哪来的散修。你笑着接了他递的剑。", effects: { fame: 12, attention: 3, luck: 4 }, sets: ["beauty_tournament"] },
      ],
    },
    {
      id: "side:beauty:4", tier: "side", title: "颜值天劫",
      intro: "你六十岁却依然年轻得不像话。天降异象——天道实在受不了你的建模，决定亲自下场打补丁。",
      requires: { ageMin: 60, flags: ["beauty_solo", "beauty_strategic", "beauty_tournament"], anyFlag: true }, once: true,
      options: [
        { label: "硬抗天劫", result: "你站在原地接下九道雷劫。第十道劫雷被你逼回去，天道愣了一下，撤了。", effects: { body: -5, cultivation: 20, fame: 15, attention: 5 }, sets: ["beauty_beat_heaven"] },
        { label: "毁容求生", result: "你提前自残面容。天道一看建模合理了，撤雷而去。你照镜子时哭了三天，但活下来了。", effects: { beauty: -10, luck: 5 }, sets: ["beauty_self_destroyed"] },
        { label: "把这场天劫拍下来", result: "你提前布下记录法器，把整个天劫过程录下并传遍三界。这成了千古名片。", effects: { fame: 25, attention: 8, cultivation: 12 }, sets: ["beauty_viral"] },
      ],
    },

    // ============ 退婚免疫支线 ============
    {
      id: "side:divorce:1", tier: "side", title: "指腹为婚",
      intro: "你十岁，爹妈拿出一张发黄的婚书。这是你出生那天，他们和邻镇富商家定下的娃娃亲。",
      requires: { ageMin: 8, ageMax: 14, talents: ["t008"] }, once: true,
      options: [
        { label: "认了这门亲", result: "你写信去邻镇问候未婚妻，对方回了一封字迹工整的信。你莫名期待。", effects: { fame: 1 }, sets: ["div_accepted"] },
        { label: "撕了婚书", result: "你当着爹妈面把婚书撕了。你妈气得三天没说话，你爹偷偷竖了大拇指。", effects: { fame: 1, luck: 1 }, sets: ["div_torn"] },
        { label: "去邻镇看看对方", result: "你偷偷跑去邻镇。对方是个比你高半头的姑娘，看你一眼后说：我也不想嫁你。你们当场击掌。", effects: { luck: 3, insight: 1 }, sets: ["div_met"] },
      ],
    },
    {
      id: "side:divorce:2", tier: "side", title: "三年之约·退婚现场",
      intro: "对方家突然反悔，登门退婚。理由：你修为太低配不上他家。围观者七十多人。",
      requires: { ageMin: 14, ageMax: 20, flags: ["div_accepted", "div_torn", "div_met"], anyFlag: true }, once: true,
      options: [
        { label: "喊出三年之约", result: "你站起身，指天发誓：三年之后，我必让今日笑我的人，跪着求我。全场鸦雀无声。", effects: { fame: 4, cultivation: 5, attention: 2 }, sets: ["div_three_year"] },
        { label: "笑着送客", result: "你给对方家长鞠了一躬：好走不送。从此你修真路上多了一份沉默的力。", effects: { insight: 3, luck: 2 }, sets: ["div_classy"] },
        { label: "当场拔剑要打", result: "你抽剑要拼命，被你爹死命拉住。这件事传开了，整条街都在说你疯。", effects: { fame: 2, attention: 1, body: -1 }, sets: ["div_violent"] },
      ],
    },
    {
      id: "side:divorce:3", tier: "side", title: "暗中发育",
      intro: "三年之约过半。你日夜修炼，进展神速——但你妈劝你别太苦自己，今天还有人来访。",
      requires: { ageMin: 18, ageMax: 25, flags: ["div_three_year", "div_classy", "div_violent"], anyFlag: true }, once: true,
      options: [
        { label: "继续闭关", result: "你婉拒了访客，关门修炼。访客留下一句话：可惜了。三年后你才知道那是大宗主亲自来的。", effects: { cultivation: 18, body: 2 }, sets: ["div_hardcore"] },
        { label: "见见访客", result: "你出门接客。是当年退婚那家的姑娘，她偷偷来找你说：对不起，家里的事不是我能做主的。", effects: { cultivation: 10, fame: 2, luck: 3 }, sets: ["div_reconciled"] },
        { label: "出门浪一下", result: "你索性出门游历半年。回来时一身故事，修为反而更精进。", effects: { cultivation: 12, insight: 4, fame: 1 }, sets: ["div_traveled"] },
      ],
    },
    {
      id: "side:divorce:4", tier: "side", title: "三年之后·打脸现场",
      intro: "三年期满。你站在当年退婚的院子门口。对方家所有人都在，他们这次的表情很复杂。",
      requires: { ageMin: 22, ageMax: 30, flags: ["div_hardcore", "div_reconciled", "div_traveled"], anyFlag: true }, once: true,
      options: [
        { label: "炫技后转身就走", result: "你随手一掌劈开他家门柱，转身离去。无人敢追，无人敢言。", effects: { fame: 10, cultivation: 8, attention: 2 }, sets: ["div_face_slapped"] },
        { label: "把退婚书裱起来送回", result: "你把当年那张退婚书装裱好挂在他家门口。从此这成了当地一道风景。", effects: { fame: 12, insight: 4 }, sets: ["div_framed_it"] },
        { label: "原谅对方再走", result: "你说一句过去的就过去了，转身离开。对方家主追出来想说话，你没回头。这才是真正的胜利。", effects: { insight: 6, luck: 5, fame: 6 }, sets: ["div_let_go"] },
      ],
    },

    // ============ 霸总气场支线 ============
    {
      id: "side:boss:1", tier: "side", title: "三分凉薄",
      intro: "你五岁，眼神凉得邻居都说你不像孩子。你爹拉着你说：娃，笑一笑，求你了。",
      requires: { ageMin: 3, ageMax: 10, talents: ["t010"] }, once: true,
      options: [
        { label: "勉强挤出微笑", result: "你笑了，凉气更重了。你爹叹气：算了。", effects: { beauty: 1, fame: 1 }, sets: ["boss_cold"] },
        { label: "继续保持冷面", result: "你回他三个字：不必。你爹愣了，从此再没让你笑过。", effects: { insight: 1, attention: 1 }, sets: ["boss_iceberg"] },
        { label: "脸上挂着笑心里翻白眼", result: "你学会了表面工夫。这一技能后来帮你混进了所有不该去的场子。", effects: { insight: 2, fame: 2 }, sets: ["boss_facade"] },
      ],
    },
    {
      id: "side:boss:2", tier: "side", title: "办公室飞升",
      intro: "你二十岁那年，意识被一道光卷走，醒来发现自己穿着西装坐在玻璃楼里。空气写着：这里是 2025 年。",
      requires: { ageMin: 18, ageMax: 30, flags: ["boss_cold", "boss_iceberg", "boss_facade"], anyFlag: true }, once: true,
      options: [
        { label: "迅速接管这具身体", result: "你查了查这具身体的银行卡，刷了刷它的简历。三天后你把整个公司收购了。", effects: { wealth: 15, fame: 3 }, sets: ["boss_corporate"] },
        { label: "假装失忆躺平", result: "你天天请病假，月底正常领工资。三年后你被裁，但攒了不少钱。", effects: { wealth: 8, luck: 2 }, sets: ["boss_lay_low"] },
        { label: "试图修真证明这是假的", result: "你在会议室盘腿打坐，被同事录视频发到网上。火了。", effects: { fame: 10, attention: 1 }, sets: ["boss_viral_meditation"] },
      ],
    },
    {
      id: "side:boss:3", tier: "side", title: "短剧爆款",
      intro: "你回到修真界，但短剧已经火到天上去了。有个剧组找到你说：你的故事拍出来必爆。要不要演自己？",
      requires: { ageMin: 40, flags: ["boss_corporate", "boss_lay_low", "boss_viral_meditation"], anyFlag: true }, once: true,
      options: [
        { label: "演，要演就演主角", result: "短剧上线三天破亿播放。你成了诸天最红的霸总修士。", effects: { fame: 20, wealth: 12, attention: 3 }, sets: ["boss_super_star"] },
        { label: "签合同当顾问", result: "你不演，只拿分成。一年下来你赚的灵石比修炼一辈子还多。", effects: { wealth: 25, fame: 3 }, sets: ["boss_advisor"] },
        { label: "把剧组打跑", result: "你把剧组锁眉打了一顿。三天后舆论翻转：原来你才是真隐世大佬。", effects: { fame: 8, attention: 2, body: 2 }, sets: ["boss_punched"] },
      ],
    },
    {
      id: "side:boss:4", tier: "side", title: "合同成道",
      intro: "你八十岁，把毕生体悟写成一份《修真契约》。签了的人会自动获得加速修炼，但要分给你 1% 修为。",
      requires: { ageMin: 80, flags: ["boss_super_star", "boss_advisor", "boss_punched"], anyFlag: true }, once: true,
      options: [
        { label: "签满 100 万人", result: "你成了三界最有钱的修士。每天醒来都有 1% 修为自动入账，你已经财务自由不需要修炼了。", effects: { cultivation: 60, wealth: 30, fame: 25, attention: 6 }, sets: ["boss_god_ceo"] },
        { label: "只签 100 个核心徒弟", result: "你只挑了 100 个真心人。这 100 人后来成了你的私人军团，把你抬上了化神宝座。", effects: { cultivation: 30, fame: 12, luck: 5 }, sets: ["boss_inner_circle"] },
        { label: "撕了合同重新做人", result: "你撕了合同。三界商人哭晕，你笑着走出公司。重新找回了修真的初心。", effects: { insight: 10, luck: 8 }, sets: ["boss_back_to_dao"] },
      ],
    },

    // ============ 左韩雷达支线 ============
    {
      id: "side:zuohan:1", tier: "side", title: "远方感应",
      intro: "你五岁那年的某个清晨，全身一冻——某个极远的地方，有什么东西转过了头。你不知道，那是左韩天尊偶然瞥了你一眼。",
      requires: { ageMin: 3, ageMax: 10, talents: ["t019"] }, once: true,
      options: [
        { label: "默默记下方向", result: "你记下了那阵冷意的方向。多年后你才知道，那是左韩天尊的洞府方向。", effects: { insight: 2, attention: 1 }, sets: ["zr_sensed_direction"] },
        { label: "对那个方向跪一下", result: "你不知为什么对着空气跪下。那阵冷意忽然撤了，似乎对方笑了一下。", effects: { luck: 2, attention: 2 }, sets: ["zr_paid_respect"] },
        { label: "握紧拳头硬瞪回去", result: "你瞪向虚空。冷意停了三秒，然后真的撤了。你不知道你刚刚是真的赢了一回合。", effects: { body: 2, attention: 3, fame: 1 }, sets: ["zr_defied"] },
      ],
    },
    {
      id: "side:zuohan:2", tier: "side", title: "左韩留下的痕迹",
      intro: "你在一座废墟里发现了一只脚印。深陷岩石半寸。你的雷达告诉你：这是他几百年前路过留下的。",
      requires: { ageMin: 20, ageMax: 60, flags: ["zr_sensed_direction", "zr_paid_respect", "zr_defied"], anyFlag: true }, once: true,
      options: [
        { label: "试着把脚踩进去", result: "你的脚比他的小很多，但当你的脚刚一沾岩石，整座废墟震动——警告。你慌忙缩回。", effects: { body: -2, insight: 4, attention: 3 }, sets: ["zr_stepped"] },
        { label: "用法器拓下来", result: "你拓下了脚印纹路，回去研究了三十年，悟出半门功法。", effects: { cultivation: 25, insight: 6 }, sets: ["zr_studied"] },
        { label: "原地行个礼悄悄走", result: "你恭敬地施了个礼，转身离开。临走前你回头看了一眼——那脚印似乎更深了一寸。", effects: { luck: 5, attention: 2 }, sets: ["zr_respect_path"] },
      ],
    },
    {
      id: "side:zuohan:3", tier: "side", title: "左韩主动联系",
      intro: "你某天打坐时，脑中突然响起一个低沉的声音：你这小辈倒有意思。要不要见个面？地点你自己选。",
      requires: { ageMin: 60, ageMax: 200, flags: ["zr_stepped", "zr_studied", "zr_respect_path"], anyFlag: true }, once: true,
      options: [
        { label: "约在飞升崖", result: "你选了飞升崖。他笑了：有种。一炷香后他出现，跟你聊了三天，离开时说：你以后必飞升。", effects: { cultivation: 30, insight: 8, attention: 4, luck: 4 }, sets: ["zr_endorsed"] },
        { label: "拒绝见面", result: "你说不见。他沉默片刻：可。三十年内他没找你。三十年后他真的不再注视你。", effects: { luck: 6, attention: -3 }, sets: ["zr_refused_meet"] },
        { label: "约在自家院子", result: "你说就来我家。他还真来了。当天他喝了你三壶酒，告辞前说：少年有趣，记你一笔。", effects: { fame: 15, attention: 3, luck: 3 }, sets: ["zr_friend"] },
      ],
    },
    {
      id: "side:zuohan:4", tier: "side", title: "超越·或臣服",
      intro: "渡劫前夕，他出现在你雷劫现场。他说：今日你若飞升，三界要换主人了。要么我帮你，要么我让你下不来。",
      requires: { realmMin: 5, flags: ["zr_endorsed", "zr_refused_meet", "zr_friend"], anyFlag: true }, once: true,
      options: [
        { label: "接受他的帮助", result: "他抬手压下天劫，你顺利飞升。但你飞升通道的钥匙留在他手上。", effects: {}, sets: ["zr_owe_him"], triggersAscension: true },
        { label: "独自渡劫", result: "你拒绝他。雷劫加倍狂暴。但你撑过去了——飞升那一刻你回头，他在原地朝你微笑点头。", effects: { body: -8, cultivation: 50 }, sets: ["zr_surpassed"], triggersAscension: true },
        { label: "约他一战决胜负", result: "你说不飞升了，要先打一架。他放下天劫，跟你打了三天三夜。你死了。他叹气说可惜，转身离开。", effects: {}, sets: ["zr_fought_lost"], triggersDeath: { reason: "与左韩天尊一战", text: "你倒在飞升崖前。左韩天尊蹲下看了你最后一眼，说：下次再来。", kind: "zuohan" } },
      ],
    },

    // ============ 扩展主线（15 条） ============
    {
      id: "main:childhood_dream", tier: "main", title: "童年的怪梦",
      intro: "你八岁这年开始反复做一个梦：你站在山顶，脚下是云海，远处有人在叫你的名字。醒来时你写下了梦里的字。",
      requires: { ageMin: 7, ageMax: 10 }, once: true,
      options: [
        { label: "把梦认真当真", result: "你按梦里的指示去后山，挖出一本残破的功法。从此你的睡眠成了修炼场。", effects: { cultivation: 6, insight: 3 }, sets: ["dream_chaser"] },
        { label: "当成噩梦无视", result: "你说服自己只是个梦。后来你发现，那个山顶确实存在——但你已经忘了路。", effects: { insight: 1, luck: 1 }, sets: ["dream_denier"] },
        { label: "告诉村里的疯婆婆", result: "她听完后看了你很久，从怀里掏出半块玉佩塞给你：以后用得上。", effects: { stones: 5, luck: 3 }, sets: ["dream_relic"] },
      ],
    },
    {
      id: "main:fortune_test", tier: "main", title: "气运初验",
      intro: "你二十岁这年路过一个测气运的摊子。摊主一脸不在乎，但当你坐下，他的脸色变了。",
      requires: { ageMin: 18, ageMax: 25, realmMin: 1 }, once: true,
      options: [
        { label: "请他详细解读", result: "他付了你十枚灵石，让你别说出去：你的命格不一般。", effects: { stones: 10, luck: 2, attention: 2 }, sets: ["fortune_revealed"] },
        { label: "笑笑就走", result: "你看出他的紧张，扔下一枚铜板转身离开。这份从容反而成了你的护身符。", effects: { insight: 3, luck: 3 }, sets: ["fortune_calm"] },
        { label: "反问他是不是骗子", result: "你拆穿他的把戏，他急了，给你看了一卷古老命格图——你的脸在最上面。", effects: { insight: 5, attention: 3 }, sets: ["fortune_shocking"] },
      ],
    },
    {
      id: "main:first_sect_test", tier: "main", title: "外门考核",
      intro: "你拜入宗门第二年，要参加外门弟子定级考核。前一晚同寝室友偷偷塞给你一份小抄。",
      requires: { ageMin: 18, ageMax: 30, realmMin: 1, flags: ["path_sect"] }, once: true,
      options: [
        { label: "用小抄", result: "你顺利通过，跳级进了内门。但你的良心从此多了一道印子。", effects: { cultivation: 12, fame: 3, luck: -1 }, sets: ["sect_cheated"] },
        { label: "撕了小抄独立应考", result: "你没过，但被一个长老看上：这小子有骨气，跟我学。", effects: { cultivation: 8, insight: 4 }, sets: ["sect_principle"] },
        { label: "把小抄交给长老", result: "你举报了室友。他被逐，但宗门内你成了独狼，没人愿意跟你坐一桌。", effects: { fame: -2, cultivation: 5 }, sets: ["sect_traitor"] },
      ],
    },
    {
      id: "main:wandering_master", tier: "main", title: "云游老者",
      intro: "你在山道上遇到一个白胡子老者，他背着一个比自己还大的包袱，问你能不能帮他指路。",
      requires: { ageMin: 25, ageMax: 80, realmMin: 1 }, once: true,
      options: [
        { label: "热心带路并帮提包袱", result: "老者临别送你一颗丹药：含化即可。你含了，三天没醒，醒来修为暴增。", effects: { cultivation: 25, luck: 4 }, sets: ["helped_oldman"] },
        { label: "礼貌指路就走", result: "老者看了你一眼笑了笑。多年后你才在传记里看到他的画像：一代魔尊。", effects: { luck: 1, insight: 2 }, sets: ["bypass_oldman"] },
        { label: "把他抢了", result: "你劫了他的包袱。当晚你做了一个噩梦，醒来包袱不翼而飞，丹田还多了一道裂痕。", effects: { body: -3, luck: -3, attention: 2 }, sets: ["robbed_oldman"] },
      ],
    },
    {
      id: "main:rival_appears", tier: "main", title: "宿敌登场",
      intro: "你出名了。有一天一个跟你修为相当的年轻人挡在你面前：早听说你了，今天比一场。",
      requires: { ageMin: 30, ageMax: 120, realmMin: 2 }, once: true,
      options: [
        { label: "正面应战", result: "你们打得难解难分。最终你险胜。从此他成了你的宿敌，也成了你最大的动力。", effects: { cultivation: 12, body: -2, fame: 5 }, sets: ["has_rival"] },
        { label: "认怂躲过", result: "你说不打。他冷笑离开。三十年后他成了一方魔头，专门来找你。", effects: { fame: -3, luck: 2 }, sets: ["coward_rival"] },
        { label: "请他喝顿酒", result: "你拉他去喝酒，三杯下肚他笑了：算了不打了。从此你多了个酒友。", effects: { luck: 4, insight: 3 }, sets: ["rival_friend"] },
      ],
    },
    {
      id: "main:secret_realm", tier: "main", title: "秘境奇遇",
      intro: "你跟队进了一个新发现的秘境。三天后只剩你一人活着，前方还有一道发光的门。",
      requires: { ageMin: 50, ageMax: 200, realmMin: 2 }, once: true,
      options: [
        { label: "推门进去", result: "门后是一座古老坟墓。你拿走了棺里的一件法袍。穿上后第一感觉是冷。", effects: { cultivation: 25, attention: 3 }, sets: ["secret_robe"] },
        { label: "原路返回", result: "你不贪。一周后秘境塌了，其他队伍全军覆没。你成了唯一的生还者。", effects: { fame: 8, luck: 6 }, sets: ["secret_survivor"] },
        { label: "封了门保守秘密", result: "你布下封印，记下位置。这个秘密你带了三百年。", effects: { insight: 8, luck: 3 }, sets: ["secret_keeper"] },
      ],
    },
    {
      id: "main:cult_invite", tier: "main", title: "邪教招揽",
      intro: "夜里有人敲你的门，递上一张漆黑的帖子。上面写着：兄弟，我们看中你了。",
      requires: { ageMin: 50, ageMax: 200, realmMin: 2 }, once: true,
      options: [
        { label: "撕了帖子", result: "三天后你家被烧。你赤手空拳从火场走出来，手里捏着撕碎的帖子。", effects: { body: -3, fame: 5, attention: 3 }, sets: ["rejected_cult"] },
        { label: "去看看再说", result: "你去了。聚会上你看到熟悉的脸——你师兄。他笑着递酒：你也来了。", effects: { cultivation: 10, attention: 4 }, sets: ["entered_cult"] },
        { label: "假装答应再举报", result: "你向掌门告密。宗门连根拔起这个邪教。但你的师兄消失了。", effects: { fame: 10, luck: -2 }, sets: ["betrayed_cult"] },
      ],
    },
    {
      id: "main:disciple_choice", tier: "main", title: "收徒抉择",
      intro: "你境界到了，开始有人来拜师。三个候选人摆在面前：天赋出众的、品行端正的、出身可疑的。",
      requires: { ageMin: 100, realmMin: 3 }, once: true,
      options: [
        { label: "收天赋出众的", result: "他三年内追上你，五年内挑战你。十年后你怀疑当初的选择。", effects: { cultivation: 8, fame: 6, attention: 2 }, sets: ["greedy_disciple"] },
        { label: "收品行端正的", result: "他修为慢，但你说什么他做什么。多年后他成了你最忠实的护道者。", effects: { fame: 4, luck: 4 }, sets: ["loyal_disciple"] },
        { label: "收出身可疑的", result: "你赌一把。他来历不明，但悟性极高。你发现自己常常被他启发。", effects: { insight: 6, cultivation: 5 }, sets: ["mystery_disciple"] },
      ],
    },
    {
      id: "main:dark_truth", tier: "main", title: "修真界的暗面",
      intro: "你查到了一个秘密：你所在的宗门，几百年前是靠屠杀一个小宗门起家的。你师父就是当年的执刀人。",
      requires: { ageMin: 150, realmMin: 3, flags: ["path_sect"] }, once: true,
      options: [
        { label: "当面问师父", result: "师父沉默了很久，给你递了把剑：你想做什么都行。你最后没动手，转身闭关。", effects: { insight: 8, cultivation: 5 }, sets: ["confronted_master"] },
        { label: "公开真相", result: "你写檄文揭露宗门。师门被舆论压垮，你成了「叛徒」，但你赢得了那个被屠宗门后人的感激。", effects: { fame: 5, attention: 3, luck: -3 }, sets: ["exposed_sect"] },
        { label: "记在心里继续修", result: "你装作不知道。你的修为更精进了，但你常常在夜里睁着眼到天明。", effects: { insight: 10, cultivation: 8 }, sets: ["silent_knower"] },
      ],
    },
    {
      id: "main:reborn_friend", tier: "main", title: "故人转世",
      intro: "你三百岁那年，遇见一个跟你少年伙伴长得一模一样的小娃娃。他抬头叫了你师父都没用过的小名。",
      requires: { ageMin: 200, realmMin: 4 }, once: true,
      options: [
        { label: "认下他", result: "你把他带回去亲自抚养。他这一世活得很短，但你陪了他全程。", effects: { luck: 5, fame: 3, body: -1 }, sets: ["raised_reborn"] },
        { label: "假装不认识", result: "你绕开了他。多年后你听说他成了散修，再没回来找你。你给他立了座空衣冢。", effects: { insight: 5, luck: -2 }, sets: ["avoided_reborn"] },
        { label: "暗中守护", result: "你不出面，但每次他遇险都有「巧合」救他。他活到八十岁，临终前对天磕了三个头。", effects: { luck: 8, fame: 2 }, sets: ["silent_guard"] },
      ],
    },
    {
      id: "main:beyond_world", tier: "main", title: "界外来客",
      intro: "你元婴期间，天空出现一道裂缝。一艘漂浮的钢铁船穿过来，船头站着一个不属于本界的人物。",
      requires: { ageMin: 200, realmMin: 4 }, once: true,
      options: [
        { label: "上前打招呼", result: "他给你看了一段全息影像：你所在的世界是某个游戏。你不知道该哭还是笑。", effects: { insight: 10, attention: 4 }, sets: ["knows_game"] },
        { label: "把船击落", result: "你出手了。船坠地。你从船里捞出一些「科技产物」，开启了本界的工业时代。", effects: { cultivation: 15, fame: 12, attention: 3 }, sets: ["tech_revolution"] },
        { label: "假装没看见", result: "你转身离开。多年后那艘船里的人成了三界传说，每个人都见过他，唯独你说没见过。", effects: { luck: 5, insight: 3 }, sets: ["denied_alien"] },
      ],
    },
    {
      id: "main:partner_death", tier: "main", title: "道侣陨落",
      intro: "你的道侣在一次任务中陨落了。临终前 Ta 说：别哭，下辈子等你。",
      requires: { ageMin: 200, realmMin: 4, flags: ["has_doulu"] }, once: true,
      options: [
        { label: "全身心闭关 200 年", result: "你出关时已是化神。第一件事是去 Ta 坟前坐了一夜。", effects: { cultivation: 40, insight: 6 }, sets: ["mourned_doulu"] },
        { label: "找出真凶报仇", result: "你查了三十年，找到那个人，把他全宗门夷为平地。这股戾气你再也没散。", effects: { cultivation: 15, attention: 6, fame: 5, luck: -3 }, sets: ["avenged_doulu"] },
        { label: "等 Ta 转世找回来", result: "你不修了。开了间客栈坐等转世人。两百年后真有个小女孩进来叫你师兄。", effects: { luck: 10, insight: 5 }, sets: ["waited_doulu"] },
      ],
    },
    {
      id: "main:heaven_judge", tier: "main", title: "天道传讯",
      intro: "你修为越高，越能感受到一种「被审视」的目光。某夜你打坐时，那目光突然开口了——天道。",
      requires: { ageMin: 400, realmMin: 5 }, once: true,
      options: [
        { label: "毕恭毕敬回话", result: "天道沉吟良久，给你下了一个评级：合格。从此你修炼速度翻倍。", effects: { cultivation: 30, luck: 5 }, sets: ["heaven_approved"] },
        { label: "反问它凭什么", result: "天道一愣，然后笑了：好久没见过这么有种的。它给了你一道「豁免符」，关键时刻能用。", effects: { insight: 12, cultivation: 15 }, sets: ["heaven_amused"] },
        { label: "拒绝交流", result: "你闭口不答。天道沉默撤离。从此你的修炼少了一份外力，多了一份纯净。", effects: { insight: 15, attention: -3 }, sets: ["heaven_refused"] },
      ],
    },
    {
      id: "main:end_of_road", tier: "main", title: "道路尽头",
      intro: "渡劫期，你终于明白：飞升不是终点。前方还有更高的境界，但走过去要付出「忘记」。",
      requires: { ageMin: 1000, realmMin: 7 }, once: true,
      options: [
        { label: "选择忘记往前走", result: "你把这一世的记忆封进玉简，留在飞升崖。你飞升时，眼里像是新生的婴儿。", effects: {}, sets: ["forgot_to_ascend"], triggersAscension: true },
        { label: "带着记忆停在原地", result: "你拒绝忘记，留在原地做了「长寿者」。你看了三千年人间烟火，最后笑着躺下。", effects: { luck: 20 }, sets: ["chose_memory"], triggersDeath: { reason: "选择留下", text: "你拒绝飞升的代价。寿元尽时，你坐在飞升崖，怀里抱着写满名字的玉简。", kind: "normal" } },
        { label: "把秘密公开给后人", result: "你刻下了真相在崖壁上，然后飞升。后来此地成为修真界圣地。", effects: { fame: 30 }, sets: ["told_truth_ascend"], triggersAscension: true },
      ],
    },

    // ============ 主动机会主线（破解保守路径锁死）============
    {
      id: "main:opportunity_call", tier: "main", title: "天降机会",
      intro: "你已经活了一阵子，过得平淡。某天天空裂开一道缝，露出一只手——它在向你招手。要不要伸手？",
      requires: { ageMin: 40, ageMax: 150, realmMin: 1 }, once: true,
      options: [
        { label: "伸手接住", result: "你被卷进一个莫名其妙的秘境，出来时多了一身机缘，也多了一身仇家。", effects: { cultivation: 25, fame: 5, attention: 3 }, sets: ["seized_opportunity"] },
        { label: "缩手", result: "你低头继续干自己的活。三天后那只手又出现了一次，这次它对你比了个赞。你这辈子不会再见到它。", effects: { luck: 6, insight: 4 }, sets: ["refused_opportunity"] },
        { label: "假装看不见", result: "你装看不见。它叹气把手收回。你心里其实是想接的，但你怕。这份怕成了你这辈子的硬伤。", effects: { insight: 2, luck: -2 }, sets: ["fled_opportunity"] },
      ],
    },
    {
      id: "main:turning_point", tier: "main", title: "命运的拐点",
      intro: "你 80 岁这年遇到一个老乞丐挡在你修真路上。他说：小友，你这一辈子太顺了，要不要试试不顺的版本？",
      requires: { ageMin: 70, ageMax: 200, realmMin: 2 }, once: true,
      options: [
        { label: "试一下", result: "他打了个响指。你这辈子接下来三十年全是麻烦事，但你也学到了之前 70 年没学到的东西。", effects: { cultivation: 20, insight: 10, body: -3, attention: 3 }, sets: ["chose_hard_mode"] },
        { label: "不了我挺好的", result: "他笑着让开了路。你这辈子继续顺利，但你心里偶尔会想：当年要是选了，会不会更精彩？", effects: { luck: 5, fame: 2 }, sets: ["chose_easy_mode"] },
        { label: "把老乞丐打跑", result: "你出手打了他。他笑着挨打：果然你心里有怒。走前他给你留了一本《心魔自渡经》。", effects: { cultivation: 12, insight: 6, body: 2 }, sets: ["beat_beggar"] },
      ],
    },

    // ============ 左韩天尊高光主线（所有玩家都能见，4 条递进）============
    {
      id: "main:zh_shadow", tier: "main", title: "黑影",
      intro: "你十岁那年的清晨，全村人都看见东边山头上站着一个黑色身影。所有人都不敢出声。三个时辰后他不见了，但你的鸡都吓得不下蛋。",
      requires: { ageMin: 8, ageMax: 14 }, once: true,
      options: [
        { label: "把这事忘了", result: "你装作无事发生。后来你发现，整村人都假装什么都没看见——但每个人床头多了一张写着「勿念」的纸。", effects: { insight: 2, luck: 1 }, sets: ["zh_shadow_denied", "zh_witnessed"] },
        { label: "记住他的样子", result: "你画了一张草图藏在枕头底下。当晚你做梦梦见他朝你笑。从此你睡眠不好。", effects: { insight: 5, attention: 2 }, sets: ["zh_shadow_remembered", "zh_witnessed"] },
        { label: "跑去找他", result: "你翻山越岭跑过去。到山顶时只有一双脚印，深陷岩石半寸。你照着脚印站了一下——比你大三号。", effects: { body: 1, insight: 6, attention: 4, luck: -1 }, sets: ["zh_shadow_chased", "zh_witnessed"] },
      ],
    },
    {
      id: "main:zh_rumor_wave", tier: "main", title: "三界谣言",
      intro: "你已是炼气修士。这一年整个修真界都在传一句话：「左韩天尊昨夜没睡好。」没人知道是什么意思，但所有大宗门都关山门了三天。",
      requires: { ageMin: 20, ageMax: 60, realmMin: 1, flags: ["zh_witnessed"] }, once: true,
      options: [
        { label: "跟着关门躲三天", result: "你蹲在自家门后听外面动静。三天后世界恢复正常，但你听邻村损失了三十口人。", effects: { luck: 4, insight: 3 }, sets: ["zh_hid_safe"] },
        { label: "出门看热闹", result: "你出门转了一圈，看见街上散落着碎成两半的玉佩。没尸体。回家时你手里多了半块。", effects: { stones: 8, attention: 3, insight: 4 }, sets: ["zh_collected_relic"] },
        { label: "对天大喊我不怕", result: "你站在屋顶喊：左韩你来啊！整条街的窗都关了。当晚下雨，雨水有点咸——像眼泪。", effects: { fame: 6, attention: 8, luck: -3 }, sets: ["zh_taunted"] },
      ],
    },
    {
      id: "main:zh_real_glimpse", tier: "main", title: "他真的来了",
      intro: "你修为筑基那夜，雷劫将至。雷劫前一刻，你抬头看见云上有个人，背对着你，正在看远方。你认得那个背影。",
      requires: { ageMin: 50, ageMax: 200, realmMin: 2, flags: ["zh_shadow_denied", "zh_shadow_remembered", "zh_shadow_chased"], anyFlag: true }, once: true,
      options: [
        { label: "默默渡劫，不打扰他", result: "你硬着头皮把雷劫渡了。他全程没转头。最后一道雷下来时，你感觉那道雷比应该的轻了几分。", effects: { cultivation: 25, body: -3, insight: 8, luck: 5 }, sets: ["zh_quiet_pass"] },
        { label: "对他拱手", result: "你顶着雷劫朝他遥遥行了一礼。他没回头，但抬了抬手，雷劫散了一半。", effects: { cultivation: 20, fame: 4, attention: 2, luck: 8 }, sets: ["zh_respect_paid"] },
        { label: "想都不想冲过去", result: "你直接弃了雷劫往他飞。还没到云上，你就被雷劈成了焦炭。他这才回头，叹了一声。", effects: {}, sets: ["zh_fool_rushed"], triggersDeath: { reason: "弃劫追左韩", text: "你冲向云端，被天劫先一步带走。左韩天尊低头看了一眼你的尸体，留下一句：可惜了。", kind: "zuohan" } },
      ],
    },
    {
      id: "main:zh_face_to_face", tier: "main", title: "他坐到了你对面",
      intro: "金丹宴上你独自喝酒。一抬头，对面坐了一个穿黑袍的人。他给自己倒了一杯，敬你。整个酒楼鸦雀无声。你认得这张脸——你画过。",
      requires: { ageMin: 100, ageMax: 400, realmMin: 3, flags: ["zh_quiet_pass", "zh_respect_paid"], anyFlag: true }, once: true,
      options: [
        { label: "陪他喝一杯", result: "你举杯，他举杯，没说话。第三杯下去他笑了：你比我想的有趣。他付完账走了，留下半壶酒。你后来花了三百年才喝完。", effects: { cultivation: 30, insight: 12, fame: 15, attention: 3 }, sets: ["zh_drank_with"] },
        { label: "起身就跑", result: "你头也不回往外冲。背后传来他的笑声：跑吧，反正下次见面是飞升。你回头一看，桌上多了张纸条：「七百年后等你。」", effects: { luck: 8, attention: 5 }, sets: ["zh_fled_dinner"] },
        { label: "问他到底想干什么", result: "你开口问。他沉默良久，说：「我也忘了。」 然后消失。从此你修行多了一种说不清的孤独感。", effects: { insight: 20, cultivation: 10, attention: -5 }, sets: ["zh_understood_him"] },
      ],
    },

    // ============ 因果链主线（早年小事的回响）============
    {
      id: "main:karma_old_man", tier: "main", title: "故人回礼",
      intro: "你在金丹大会被围攻。眼看要被打死，一个穿白衣的老者从天而降，三招打退所有敌人。他看你一眼：「还记得我吗？当年你帮我提过包袱。」",
      requires: { ageMin: 80, realmMin: 3, flags: ["helped_oldman"] }, once: true,
      options: [
        { label: "千恩万谢", result: "老者笑笑，留下一卷功法走了。这卷功法后来支撑你冲化神。", effects: { cultivation: 35, fame: 8, luck: 6 }, sets: ["karma_returned"] },
        { label: "拜他为师", result: "你跪下要拜师。他扶你起来：「你已经过了拜师的年纪，但我可以做你的道友。」 从此你多了一个化神级靠山。", effects: { cultivation: 25, fame: 15, luck: 8 }, sets: ["karma_brother"] },
      ],
    },
    {
      id: "main:karma_robbed_revenge", tier: "main", title: "因果反噬",
      intro: "你飞升前一夜，门口来了一个熟人——当年你抢过包袱的那个老者。他这次不是来要回包袱的，他是来确认你最后一刻的表情的。",
      requires: { ageMin: 200, realmMin: 4, flags: ["robbed_oldman"] }, once: true,
      options: [
        { label: "下跪求饶", result: "他笑了笑：「你不用跪，我只是来看看。」 然后他在你飞升的瞬间，伸手按下了你头顶。你从此再没飞升过。", effects: { body: -8, attention: 5 }, sets: ["karma_punished"], triggersDeath: { reason: "因果反噬", text: "你抢过的那个老者，在你飞升前夜按住了你。你以为是夺舍，其实是判决。", kind: "zuohan" } },
        { label: "把当年抢的还给他", result: "你从储物袋里翻出当年那个包袱原封不动。他愣了：「你留了这么多年？」 然后他叹气，让开了路。你飞升时听见他在后面说：「算了。」", effects: { luck: 10, insight: 8 }, sets: ["karma_redeemed"] },
        { label: "拼一个", result: "你出手了。他比当年强了一万倍。你被一指点死，飞升通道也碎了。", effects: {}, sets: ["karma_destroyed"], triggersDeath: { reason: "因果反噬", text: "当年你抢的那个老者，是隐世大能。这一指，你修行三百年化为尘土。", kind: "death" } },
      ],
    },

    // ============ 苟道线（t007）支线 ============
    {
      id: "side:survivor:1", tier: "side", title: "幼年躲祸",
      intro: "你五岁那年，村里来了流寇。其他小孩都在哭，你做了一个决定。",
      requires: { ageMin: 3, ageMax: 8, talents: ["t007"] }, once: true,
      options: [
        { label: "钻进柴堆装死", result: "你装得太像，流寇都没看你一眼。出来时你是村里唯一活下来的小孩。", effects: { luck: 5, insight: 2 }, sets: ["sv_played_dead"] },
        { label: "带其他小孩跑", result: "你拽着几个小孩翻墙跑了三里地。你救了他们，也消耗了一些气运。", effects: { fame: 3, luck: -1 }, sets: ["sv_led_kids"] },
        { label: "抢一把柴刀冲过去", result: "你冲了，被一个流寇笑着拍晕。醒来流寇全跑了——原来是有大佬路过。", effects: { body: -2, luck: 2, fame: 2 }, sets: ["sv_charged"] },
      ],
    },
    {
      id: "side:survivor:2", tier: "side", title: "宗门站队",
      intro: "你二十岁那年，宗门两大长老明争暗斗。你被两边人都拉过去站队。",
      requires: { ageMin: 18, ageMax: 30, flags: ["sv_played_dead", "sv_led_kids", "sv_charged"], anyFlag: true }, once: true,
      options: [
        { label: "装病关门不出", result: "你病了三个月。等出来时已经分胜负了，赢的那派觉得你识相，没动你。", effects: { luck: 5, fame: -1 }, sets: ["sv_neutral"] },
        { label: "押弱势一方", result: "你赌错了，弱势的那派被清洗。你跟着倒霉了几年才翻身。", effects: { luck: -3, insight: 5 }, sets: ["sv_wrong_side"] },
        { label: "两边都送礼", result: "你左右逢源。两派都觉得你忠诚，最后赢的一方提拔你做了内门。", effects: { wealth: -3, fame: 4 }, sets: ["sv_two_face"] },
      ],
    },
    {
      id: "side:survivor:3", tier: "side", title: "战场逃生",
      intro: "你被卷入了一场宗门大战。你修为不算高，但战场太乱。",
      requires: { ageMin: 60, realmMin: 2, flags: ["sv_neutral", "sv_wrong_side", "sv_two_face"], anyFlag: true }, once: true,
      options: [
        { label: "装尸混在尸体堆", result: "你躺了三天三夜。打扫战场的人差点把你拖走烧了。你活过来时哭笑不得。", effects: { luck: 8, body: -2 }, sets: ["sv_corpse"] },
        { label: "顺手救一个伤员一起跑", result: "那人后来给你介绍了他的师妹做道侣。你赚大了。", effects: { fame: 5, luck: 6 }, sets: ["sv_savior"] },
        { label: "趁乱顺东西", result: "你捡了一袋灵石和半本秘籍。从此你修为暴涨——但你良心也痒。", effects: { wealth: 15, cultivation: 12, luck: -2 }, sets: ["sv_looter"] },
      ],
    },
    {
      id: "side:survivor:4", tier: "side", title: "苟成传说",
      intro: "你五百岁，竟然活到了元婴。所有人都以为你早死了，结果你笑眯眯出现在万族大会。",
      requires: { ageMin: 300, realmMin: 4, flags: ["sv_corpse", "sv_savior", "sv_looter"], anyFlag: true }, once: true,
      options: [
        { label: "继续苟下去", result: "你说话只说半句，做事只做八分。多年后人们传说你是个深不可测的隐世大能。", effects: { fame: 15, luck: 10, insight: 8 }, sets: ["sv_legend"] },
        { label: "公开苟道心法", result: "你写了一本《苟道经》传遍三界。从此修真界多了一门最现实的功法。", effects: { fame: 25, cultivation: 15 }, sets: ["sv_published"] },
        { label: "突然激进一次", result: "你决定不苟了，直接冲化神。你做到了，但你也明白了苟道的真意是：苟到能不苟为止。", effects: { cultivation: 30, body: -3 }, sets: ["sv_evolved"] },
      ],
    },

    // ============ 系统流（t012）支线 ============
    {
      id: "side:system:1", tier: "side", title: "系统加载中",
      intro: "你八岁那年，脑海里突然弹出一行字：[系统加载中…99%]。然后再也没动过。",
      requires: { ageMin: 6, ageMax: 12, talents: ["t012"] }, once: true,
      options: [
        { label: "对着空气说重启", result: "你说了。系统真的重启了，开始加载到 100%，然后弹出：欢迎使用。", effects: { cultivation: 10, insight: 3 }, sets: ["sys_rebooted"] },
        { label: "假装没看见", result: "你忽视它。它在你脑海角落停留了几十年，时不时弹个广告。", effects: { insight: 1, luck: 1 }, sets: ["sys_ignored"] },
        { label: "找别人确认", result: "你问邻居能不能看到。邻居以为你疯了。你才意识到——只有你能看到。", effects: { fame: -2, insight: 3 }, sets: ["sys_lonely"] },
      ],
    },
    {
      id: "side:system:2", tier: "side", title: "系统签到",
      intro: "系统启用了。每天弹出「签到」按钮，奖励灵石或丹药。今天的奖励特别诱人：一颗渡劫丹。",
      requires: { ageMin: 15, ageMax: 60, flags: ["sys_rebooted", "sys_ignored", "sys_lonely"], anyFlag: true }, once: true,
      options: [
        { label: "立刻签到", result: "渡劫丹到账。但奖励说明里有一行小字：使用后会被审计。", effects: { cultivation: 25, attention: 4 }, sets: ["sys_signed"] },
        { label: "拒绝签到", result: "你说我不要。系统沉默了三天，然后弹出：好。它好像有点失望。", effects: { insight: 5, luck: 3 }, sets: ["sys_refused_signin"] },
        { label: "签到但不用奖励", result: "你领了丹药供起来。后来你才发现，存了 50 年的丹药突然消失了。", effects: { cultivation: 8, luck: 2 }, sets: ["sys_hoarder"] },
      ],
    },
    {
      id: "side:system:3", tier: "side", title: "系统强制更新",
      intro: "你 80 岁这年，系统突然黑屏。重启后所有功能不见了，只剩一行：付费版功能已下架。",
      requires: { ageMin: 60, ageMax: 200, flags: ["sys_signed", "sys_refused_signin", "sys_hoarder"], anyFlag: true }, once: true,
      options: [
        { label: "找到系统的服务条款", result: "你在脑海里翻出一份合同。原来系统是某个上界商家投放的「试用版」。你怒了。", effects: { insight: 10, attention: 3 }, sets: ["sys_contract_found"] },
        { label: "靠自己修", result: "你把系统当后台噪音。你的修为不靠它，反而更稳。", effects: { cultivation: 15, insight: 8 }, sets: ["sys_independent"] },
        { label: "申请退款", result: "你对着虚空打了一份诉状。三个月后系统弹出：退款已到账。你的修为竟然涨了。", effects: { cultivation: 12, wealth: 8 }, sets: ["sys_refunded"] },
      ],
    },
    {
      id: "side:system:4", tier: "side", title: "系统被你反向操纵",
      intro: "你研究系统多年，竟然找到了它的后台。你可以给自己刷修为，但每次刷都会留下一条审计记录。",
      requires: { ageMin: 200, realmMin: 3, flags: ["sys_contract_found", "sys_independent", "sys_refunded"], anyFlag: true }, once: true,
      options: [
        { label: "全部刷满冲飞升", result: "你刷了。修为爆增，但审计员上门了——你成为系统第一个被人工封号的用户。", effects: {}, sets: ["sys_banned"], triggersDeath: { reason: "系统封号", text: "你刷得太狠，系统人工运营介入。你的人生进度条被强制清零。", kind: "artifact" } },
        { label: "只刷一点点", result: "你每次只刷 1%。审计员发现但懒得查你。你慢慢成了系统的「漏洞利用大师」。", effects: { cultivation: 30, fame: 8 }, sets: ["sys_exploit"] },
        { label: "把后台漏洞举报给天道", result: "你举报了。天道给你发了一面「贡献者」锦旗，系统从此和你和解。", effects: { fame: 15, luck: 10, insight: 8 }, sets: ["sys_whistle"] },
      ],
    },

    // ============ 欧皇（t016）支线 ============
    {
      id: "side:lucky:1", tier: "side", title: "随手挖到的",
      intro: "你十岁，蹲在田埂上玩泥巴，手指碰到一个硬东西。挖出来一看——半截古剑。",
      requires: { ageMin: 7, ageMax: 14, talents: ["t016"] }, once: true,
      options: [
        { label: "悄悄藏好", result: "你回家把它埋在床下。多年后你才发现这是个上古残器，价值连城。", effects: { cultivation: 8, stones: 5 }, sets: ["lucky_hidden"] },
        { label: "拿去鉴定", result: "宗门长老看了之后脸色都变了。当场把你收入门下，并嘱咐你不要外传。", effects: { cultivation: 15, fame: 3 }, sets: ["lucky_identified"] },
        { label: "丢回原处", result: "你莫名觉得它不该归你。三天后你梦见一个老者朝你拱手：谢小友相让。", effects: { luck: 10, insight: 5 }, sets: ["lucky_returned"] },
      ],
    },
    {
      id: "side:lucky:2", tier: "side", title: "天降机缘",
      intro: "你二十五岁，坐在自家门口发呆。一道流星砸下来，砸在你脚边。",
      requires: { ageMin: 20, ageMax: 60, flags: ["lucky_hidden", "lucky_identified", "lucky_returned"], anyFlag: true }, once: true,
      options: [
        { label: "把它抱回去", result: "你抱了。它是一颗灵髓。你后来用它直接突破筑基，省了二十年苦修。", effects: { cultivation: 30 }, sets: ["lucky_meteor"] },
        { label: "上报朝廷", result: "你交出去，得了重赏。你用这笔钱买了好功法，反而走得更远。", effects: { wealth: 20, cultivation: 15, fame: 5 }, sets: ["lucky_reported"] },
        { label: "和邻居均分", result: "你切了一半送给邻居。三十年后那邻居成了一方大能，处处罩着你。", effects: { luck: 12, fame: 4 }, sets: ["lucky_shared"] },
      ],
    },

    // ============ 番茄熟练工（t011）支线 ============
    {
      id: "side:fanqie:1", tier: "side", title: "三章反杀",
      intro: "你十五岁，被同门羞辱了。按番茄套路，三章内你必须反杀。",
      requires: { ageMin: 13, ageMax: 20, talents: ["t011"] }, once: true,
      options: [
        { label: "苦修三年再回来", result: "你闭关三年，回来一招秒了对方。台下观众喊：这就是热血。", effects: { cultivation: 18, fame: 6 }, sets: ["fq_grinded"] },
        { label: "找路边老乞丐学绝学", result: "他真的是隐世高人。三天他教了你一招，你回去打爆全场。", effects: { cultivation: 15, luck: 5 }, sets: ["fq_beggar_master"] },
        { label: "抢救一下作者", result: "你跳出剧本对天道说：能不能换个套路？天道愣了，把这局变成了你想要的样子。", effects: { insight: 10, attention: 3 }, sets: ["fq_meta"] },
      ],
    },
    {
      id: "side:fanqie:2", tier: "side", title: "热血飞升",
      intro: "你按番茄爽文节奏推进，金丹突破时全身金光大现，整个城都听到了你的喊声。",
      requires: { ageMin: 30, realmMin: 3, flags: ["fq_grinded", "fq_beggar_master", "fq_meta"], anyFlag: true }, once: true,
      options: [
        { label: "怒吼我命由我", result: "你喊了。整本「小说」达到高潮。读者们留言：好燃。但你修为消耗巨大。", effects: { cultivation: 20, body: -3, fame: 15 }, sets: ["fq_shouted"] },
        { label: "默默低调", result: "你压制了金光。你的人生从爽文转向了文艺片。修为稳，名声小。", effects: { insight: 8, cultivation: 12 }, sets: ["fq_indie"] },
        { label: "请观众投票", result: "你竟然让「读者」投票。结果观众选了一个最离谱的：你直接化神。", effects: { cultivation: 40, attention: 5 }, sets: ["fq_voted"] },
      ],
    },

    // ============ 动漫联动 cameo（fated 形式）============
    {
      id: "side:cameo:doraemon", tier: "side", title: "蓝色机器人",
      intro: "你十二岁，山门口出现一个蓝色圆滚滚的「妖怪」。它对你说：你好，我从未来来。然后从肚子上掏出了一个东西。",
      requires: { ageMin: 8, ageMax: 16 }, once: true,
      options: [
        { label: "接受任意门", result: "你瞬移到了一个秘境。等回来时半年过去了，但你修为暴增。", effects: { cultivation: 30, insight: 5 }, sets: ["dora_door"] },
        { label: "接受记忆面包", result: "你吃了三片。所有宗门功法你瞬间记住，但消化系统罢工了一天。", effects: { cultivation: 15, body: -2, insight: 8 }, sets: ["dora_bread"] },
        { label: "请它带你去未来", result: "它带你看了三千年后的你——是个躺平的老头。你回来时人生观变了。", effects: { insight: 15, luck: 5 }, sets: ["dora_future"] },
      ],
    },
    {
      id: "side:cameo:goku", tier: "side", title: "黄毛战士",
      intro: "天上掉下一个穿橘色练功服的家伙，落地震出三米深坑。他爬出来对你说：「喂，能不能跟我打一架？我感觉你很有潜力。」",
      requires: { ageMin: 30, ageMax: 200, realmMin: 2 }, once: true,
      options: [
        { label: "陪他打一架", result: "你被他一招打飞三里地。爬起来时他已经在帮你疗伤，并且头发是金色的。", effects: { cultivation: 20, body: -3, fame: 5 }, sets: ["goku_fought"] },
        { label: "拒绝并请他吃饭", result: "他眼睛亮了，吃了你一桌子菜。临走说：「你这人不错，给你个龙珠。」", effects: { stones: 30, luck: 5 }, sets: ["goku_dined"] },
        { label: "假装认识他", result: "你说：「悟空兄好久不见。」 他懵了三秒，然后笑了：「看来你也是穿越来的。」", effects: { insight: 8, fame: 8 }, sets: ["goku_recognized"] },
      ],
    },
    {
      id: "side:cameo:conan", tier: "side", title: "侦探小学生",
      intro: "你在宗门发生了一桩命案。当所有人都没头绪时，一个戴眼镜的小孩走进来说：「真相只有一个。」",
      requires: { ageMin: 50, ageMax: 300 }, once: true,
      options: [
        { label: "把案子交给他", result: "他三个时辰找出真凶——是掌门的师弟。掌门给你跪谢。", effects: { fame: 12, insight: 5 }, sets: ["conan_solved"] },
        { label: "怀疑他是凶手", result: "你直接抓了他。他冷笑：你抓错人了，真凶就在你旁边。你回头一看，旁边的人跑了。", effects: { fame: 3, attention: 2 }, sets: ["conan_suspect"] },
        { label: "问他为什么没长高", result: "他脸黑了，从口袋里掏出一颗药丸甩你脸上。你年轻了十岁。", effects: { body: 4, insight: -1 }, sets: ["conan_younger"] },
      ],
    },
    {
      id: "side:cameo:naruto", tier: "side", title: "金毛漩涡",
      intro: "宗门来了个外族少年。一头金毛，脸上有六道胡须似的疤，张口闭口「信不信我的忍道」。",
      requires: { ageMin: 30, ageMax: 200 }, once: true,
      options: [
        { label: "和他比一场口才", result: "你们两个嘴皮子斗到天亮。最后他握着你的手说：「你是我兄弟。」 然后消失了。", effects: { fame: 5, insight: 3 }, sets: ["naruto_friend"] },
        { label: "学他的影分身", result: "他真的教了。你勉强分出两个自己，但每次分身回去你都头痛三天。", effects: { cultivation: 10, body: -2 }, sets: ["naruto_clone"] },
        { label: "把他撵走", result: "你说我不喜欢吵。他叹气：「你这人不行。」 走前留了一碗拉面给你。", effects: { luck: 2, body: 2 }, sets: ["naruto_ramen"] },
      ],
    },
    {
      id: "side:cameo:luffy", tier: "side", title: "草帽橡胶人",
      intro: "海边出现一艘破船。船上一个戴草帽的少年跳上岸：「这里有海贼王的宝藏吗？」 他的手臂能拉到一里外。",
      requires: { ageMin: 30, ageMax: 200 }, once: true,
      options: [
        { label: "陪他一起找", result: "你们找了一个月，挖出来的是一坛酒。他喝了一口大笑：「就是这个味！」 给你倒了一杯。", effects: { luck: 5, insight: 3 }, sets: ["luffy_treasure"] },
        { label: "请他吃肉", result: "他狼吞虎咽吃完三大盘，临走给你他帽子的一根麻线。你后来才知道，那是信物。", effects: { fame: 8, luck: 6 }, sets: ["luffy_meat"] },
        { label: "邀他加入宗门", result: "他摇头：「我要当海贼王。」 然后扬帆而去。你目送他消失在地平线。", effects: { insight: 6 }, sets: ["luffy_left"] },
      ],
    },
    {
      id: "side:cameo:snoopy", tier: "side", title: "屋顶上的小狗",
      intro: "你某天发现自家屋顶上躺着一只大耳朵白狗。它戴墨镜，仰头看天，似乎在思考人生。",
      requires: { ageMin: 20, ageMax: 200 }, once: true,
      options: [
        { label: "陪它一起躺着", result: "你们躺了三个时辰没说话。临别时它点了点头，留下一根羽毛。你的人生观变了。", effects: { insight: 15, luck: 5 }, sets: ["snoopy_chill"] },
        { label: "给它喂吃的", result: "它接过你的饭团，戴上耳机摇头晃脑。你怀疑这只狗修为比你高。", effects: { luck: 8 }, sets: ["snoopy_fed"] },
        { label: "驱赶它", result: "它叹了口气，迈着方步走了。三十年后你想起它的眼神，突然顿悟。", effects: { insight: 10 }, sets: ["snoopy_dismissed"] },
      ],
    },
    {
      id: "side:cameo:detective", tier: "side", title: "穿西装的老人",
      intro: "你在金丹庆典上遇到一个穿西装、戴礼帽的老人。他看了一眼你的金丹，叹气：「建议下次还是用 .38 口径。」",
      requires: { ageMin: 100, realmMin: 3 }, once: true,
      options: [
        { label: "请教他是哪位", result: "他说：「只是路过。」 给你递了张名片。名片上写着六个字：天道审计员。", effects: { insight: 8, attention: 3 }, sets: ["audit_card"] },
        { label: "请他喝一杯", result: "他喝了你三杯，告辞前说：「你这局，没问题，我不举报。」 你大汗淋漓。", effects: { luck: 6, insight: 4 }, sets: ["audit_drink"] },
        { label: "不理他继续庆典", result: "他在你庆典上坐了一整夜。你后来才知道，他在帮你挡左韩天尊的注视。", effects: { luck: 10, attention: -3 }, sets: ["audit_shield"] },
      ],
    },
    {
      id: "side:cameo:totoro", tier: "side", title: "大耳朵森林之主",
      intro: "你迷路在一座古老森林里。一只灰色大毛球从树洞里探出头，对你打了个不太响的哈欠。",
      requires: { ageMin: 5, ageMax: 200 }, once: true,
      options: [
        { label: "靠它身上睡一觉", result: "你睡了一觉醒来已是第二天清晨，毛球不见了，你身上挂着一片绿叶。叶子带回去种出了灵药。", effects: { body: 3, stones: 8, luck: 5 }, sets: ["totoro_nap"] },
        { label: "请它带你出森林", result: "它叫来了一辆毛茸茸的「猫车」，把你三息送回宗门。", effects: { luck: 8, insight: 3 }, sets: ["totoro_ride"] },
        { label: "给它一颗果子", result: "它笑了，从树洞里递出来一颗种子。你种下后，那棵树开花结果，每年给你一颗灵丹。", effects: { cultivation: 12, luck: 6 }, sets: ["totoro_gift"] },
      ],
    },
  ];

  const TALENTS = [
    t("t001", "天灵根", 3, "灵根检测仪看完沉默三秒，给你弹出一个会员续费页。", { root: 5, cultivation: 8, attention: 2 }, ["天才流"]),
    t("t002", "五行废灵根", 1, "什么都沾一点，什么都不太沾，主打一个雨露均沾。", { root: -2, luck: 2, body: 1 }, ["废柴流"]),
    t("t003", "天妒红颜", 2, "颜值建模过高，天道后台怀疑你开了滤镜。", { beauty: 6, luck: -3 }, ["颜值流", "高危"]),
    t("t004", "至尊骨体验卡", 3, "出生自带至尊骨，但是说明书写着七天无理由可被挖。", { body: 3, root: 2, attention: 2 }, ["至尊骨"]),
    t("t005", "重瞳但近视", 2, "别人一眼看破虚妄，你一眼看出自己忘戴眼镜。", { insight: 3, beauty: 1, luck: -1 }, ["重瞳"]),
    t("t006", "戒指老爷爷", 3, "戒指里传来苍老声音：少年，先帮我充个电。", { insight: 3, cultivation: 6 }, ["老爷爷"]),
    t("t007", "苟道中人", 2, "你深知活着才有输出，能绕就绕，能跑就跑。", { luck: 3, fame: -1 }, ["凡人流", "苟道"]),
    t("t008", "退婚免疫", 2, "三十年河东三十年河西，你已经办了终身会员。", { fame: 2, beauty: 1, luck: 1 }, ["退婚流"]),
    t("t009", "重生者", 3, "你记得上一世被左韩天尊路过，但忘了路过的具体时间。", { insight: 4, luck: 1, attention: 1 }, ["重生文"]),
    t("t010", "霸总气场", 2, "你还不会走路，已经有人说你眼神三分薄凉七分漫不经心。", { beauty: 3, wealth: 2, insight: -1 }, ["霸总文"]),
    t("t011", "番茄熟练工", 1, "你非常擅长在三行内完成被欺辱、觉醒、反杀。", { cultivation: 5, fame: 1 }, ["番茄流"]),
    t("t012", "系统正在维护", 2, "系统加载到百分之九十九，提示请明年再来。", { luck: -1, insight: 2, cultivation: 3 }, ["系统流"]),
    t("t013", "村口情报王", 1, "你还没满月，已经知道隔壁王叔其实是魔尊小号。", { insight: 2, fame: 1 }, ["吃瓜"]),
    t("t014", "脆皮修士", 1, "风吹一下掉半管血，但你嘴硬说这是松弛感。", { body: -3, insight: 2, beauty: 1 }, ["高危"]),
    t("t015", "气运黑洞", 1, "附近人的机缘会向你靠拢，然后全部摔碎。", { luck: -5, attention: 1 }, ["倒霉蛋"]),
    t("t016", "欧皇转世", 3, "你随手一摸，连石头都想给你爆装备。", { luck: 6, fame: 1 }, ["欧皇"]),
    t("t017", "家里有矿", 2, "你家的矿不是形容词，是真的矿，还会发光。", { wealth: 5, stones: 20 }, ["富二代"]),
    t("t018", "出生负债", 1, "你刚出生就继承了祖传欠条，债主是隔壁山神。", { wealth: -4, luck: 1 }, ["负债流"]),
    t("t019", "左韩雷达", 3, "你能提前三秒感知左韩天尊路过，但只能用来尖叫。", { attention: 3, insight: 2 }, ["左韩相关"]),
    t("t020", "天道亲儿子", 3, "天道给你发了内测资格，但补丁说明写得很吓人。", { root: 2, insight: 2, luck: 3 }, ["天命"]),
    t("t021", "短视频圣体", 1, "你修炼三分钟，剪出来能水成八集。", { fame: 2, insight: -1 }, ["热梗"]),
    t("t022", "抽象派剑修", 2, "你的剑招没人看得懂，包括你自己。", { cultivation: 4, fame: 2, insight: -1 }, ["抽象"]),
    t("t023", "天生反骨", 2, "别人拜师，你问师父有没有五险一金，然后被踢出幻境。", { body: 2, fame: 2, attention: 1 }, ["反骨"]),
    t("t024", "掌心雷过敏", 1, "只要有人放雷法，你就开始思考人生。", { body: -2, luck: 1 }, ["高危"]),
    t("t025", "社恐仙苗", 1, "你可以和万年妖兽对视，但不敢和掌门打招呼。", { insight: 2, fame: -2 }, ["社恐"]),
    t("t026", "显眼包命格", 2, "秘境里最亮的不是宝物，是你。", { beauty: 2, fame: 3, attention: 1 }, ["显眼包"]),
    t("t027", "AI味太冲", 1, "你的顿悟台词像模型生成，长老听完让你重写。", { insight: 1, fame: -1 }, ["AI梗"]),
    t("t028", "情绪价值大师", 2, "你不会炼丹，但你会说丹炉今天也辛苦了。", { luck: 2, fame: 2 }, ["情绪价值"]),
    t("t029", "破鼎体质", 2, "别人炼丹炸炉，你炼丹炸宗门小地图。", { cultivation: 4, luck: -2, attention: 1 }, ["助我破鼎"]),
    t("t030", "凡人跑跑", 2, "你对危险的理解领先同龄人五百年。", { luck: 4, fame: -1 }, ["韩立同款"]),
    t("t031", "炎帝同桌", 2, "你同桌天天带尺子，老师说那是玄重尺。", { fame: 2, cultivation: 2 }, ["萧炎同款"]),
    t("t032", "九龙拉棺邻座", 3, "你上车前看了一眼目的地，感觉这趟票不太对。", { luck: 2, insight: 3, attention: 1 }, ["叶凡同款"]),
    t("t033", "蓝银草园丁", 1, "你能把路边草说得像神级武魂，但路边草不同意。", { root: 1, beauty: 1 }, ["唐三同款"]),
    t("t034", "村咖修士", 1, "你把灵泉冲成拿铁，意外打开了村口商业线。", { wealth: 2, fame: 1 }, ["村咖"]),
    t("t035", "来财命", 2, "你路过的摊位都会突然想打折，但老板会后悔。", { wealth: 3, luck: 2 }, ["来财"]),
    t("t036", "浪浪山小妖怪", 1, "你不想成仙，只想把巡山任务做完，但剧本不允许。", { body: 1, fame: 1, luck: 1 }, ["浪浪山"]),
  ];

  const EVENT_POOL = generateEventPool();
  const ENDINGS = generateEndings();

  // 异步加载 AI 生成的扩展事件（来自 Gemini）
  loadExtraEvents();

  let state = freshState();
  let currentTalents = [];

  function loadExtraEvents() {
    const CAT_DEFAULTS = {
      childhood:  { minAge: 0,  maxAge: 12,    minRealm: 0, maxRealm: 1 },
      initiation: { minAge: 6,  maxAge: 24,    minRealm: 0, maxRealm: 2 },
      mortal:     { minAge: 0,  maxAge: 80,    minRealm: 0, maxRealm: 2 },
      qi:         { minAge: 10, maxAge: 140,   minRealm: 1, maxRealm: 2 },
      foundation: { minAge: 18, maxAge: 260,   minRealm: 2, maxRealm: 3 },
      golden:     { minAge: 30, maxAge: 650,   minRealm: 3, maxRealm: 4 },
      nascent:    { minAge: 80, maxAge: 90000, minRealm: 4, maxRealm: 9 },
      artifact:   { minAge: 5,  maxAge: 20000, minRealm: 0, maxRealm: 9 },
      cameo:      { minAge: 8,  maxAge: 50000, minRealm: 0, maxRealm: 9 },
      crossover:  { minAge: 12, maxAge: 1200,  minRealm: 0, maxRealm: 9 },
    };
    fetch("./data/events-extra.json")
      .then((r) => r.ok ? r.json() : Promise.reject(new Error("no extra file")))
      .then((rawEvents) => {
        let id = 100000;
        let added = 0;
        rawEvents.forEach((raw) => {
          if (!raw.options || !Array.isArray(raw.options)) return;
          const cat = raw.category || "mortal";
          const def = CAT_DEFAULTS[cat] || CAT_DEFAULTS.mortal;
          raw.options.forEach((opt) => {
            if (!opt || !opt.label || !opt.result) return;
            EVENT_POOL.push({
              id: id++,
              category: cat,
              categoryLabel: cat,
              title: raw.title,
              text: raw.intro || raw.title,
              result: opt.result,
              effects: opt.effects || {},
              tags: [cat, "AI"],
              route: null,
              leftHanTier: null,
              character: null,
              minAge: def.minAge,
              maxAge: def.maxAge,
              minRealm: def.minRealm,
              maxRealm: def.maxRealm,
              weight: 22,
              deathChance: 0.005,
              deathText: "你被一段 AI 生成的命运带走，连数据库都没来得及备份。",
            });
            added += 1;
          });
        });
        if (added) console.log(`[AI 扩展] 加载 ${rawEvents.length} 事件，扩 ${added} 选项 → EVENT_POOL 现 ${EVENT_POOL.length} 条`);
      })
      .catch(() => { /* 文件不存在或加载失败，静默 */ });
  }

  renderStart();

  function t(id, name, grade, description, effects, tags) {
    return { id, name, grade, description, effects, tags };
  }

  function freshState() {
    return {
      screen: "start",
      name: "",
      selectedTalents: [],
      rerollsLeft: MAX_REROLLS,
      attrs: { root: 0, insight: 0, body: 0, wealth: 0, luck: 0, beauty: 0 },
      baseAttrs: { root: 0, insight: 0, body: 0, wealth: 0, luck: 0, beauty: 0 },
      age: 0,
      realm: 0,
      cultivation: 0,
      stones: 0,
      fame: 0,
      attention: 0,
      alive: true,
      tags: [],
      logs: [],
      lastResult: null,
      choices: [],
      turns: 0,
      ending: null,
      deathReason: "",
      deathKind: "",
      metCharacters: [],
      routes: Object.fromEntries(ROUTES.map((route) => [route.id, 0])),
      flags: {},
      firedFated: [],
      activeFated: null,
      epitaph: "",
      lastNarration: "",
      highlights: [], // 本局高光时刻 [{kind, text, age}]
      stats: {
        leftHanCount: 0,
        leftHanRumors: 0,
        leftHanAftershocks: 0,
        leftHanBody: 0,
        deathChecks: 0,
        eventsSeen: 0,
        breakthroughs: 0,
        ascensionStage: 0,
        fatedSeen: 0,
      },
    };
  }

  function renderStart() {
    state.screen = "start";
    const unlocked = sessionCatalog.endings.length;
    $app.innerHTML = shell(`
      <section class="hero-banner">
        <img class="hero-bg" src="./assets/mountain.svg" alt="" aria-hidden="true" />
        <img class="hero-crane" src="./assets/crane.svg" alt="" aria-hidden="true" />
      </section>
      <section class="panel scroll-panel">
        <h2 class="panel-title scroll-title">道号录</h2>
        <div class="field">
          <label for="nameInput">道号（留空随机）</label>
          <div class="field-with-action">
            <input id="nameInput" maxlength="12" placeholder="例如 林无敌" value="${escapeHtml(state.name)}" />
            <button class="dice-btn" data-action="dice-name" title="随机道号">🎲</button>
          </div>
        </div>
        <div class="intro-steps">
          <div class="intro-step"><img class="intro-icon" src="./assets/bagua.svg" alt="" /><span class="intro-step-text">抽 10 个天赋，挑 3 个组合上场。</span></div>
          <div class="intro-step"><img class="intro-icon" src="./assets/scroll.svg" alt="" /><span class="intro-step-text">20 点属性自由分配，也可一键流派模板。</span></div>
          <div class="intro-step"><img class="intro-icon" src="./assets/sword.svg" alt="" /><span class="intro-step-text">从 0 岁开局，每年选事件，活到飞升或暴毙。</span></div>
        </div>
        <div class="chips">
          <span class="chip">${EVENT_POOL.length}+ 种事件</span>
          <span class="chip">${ENDINGS.length} 种结局</span>
          <span class="chip">本次解锁 ${unlocked}/${ENDINGS.length}</span>
        </div>
        <div class="action-row single">
          <button class="primary big-cta" data-action="start-talents">⚔ 投胎入道 ⚔</button>
        </div>
      </section>
    `);
    $("#nameInput").addEventListener("input", (event) => {
      state.name = event.target.value.trim();
    });
    bindActions();
  }

  function renderTalent(redraw = true) {
    state.screen = "talent";
    if (redraw) {
      currentTalents = drawTalents(10);
      state.selectedTalents = [];
    }
    const rerollDisabled = state.rerollsLeft <= 0 ? "disabled" : "";
    $app.innerHTML = shell(`
      <section class="panel">
        <h2 class="panel-title">抽取天赋</h2>
        <div class="chips">
          <span class="chip">选择 3 个</span>
          <span class="chip" id="talentCounter">已选 ${state.selectedTalents.length}/3</span>
          <span class="chip">重抽剩余 ${state.rerollsLeft}</span>
        </div>
        <div class="talent-preview">
          <div class="talent-preview-title">已选合计加点</div>
          <div id="talentPreview" class="changes">${renderTalentPreview()}</div>
        </div>
      </section>
      <section class="talent-grid">
        ${currentTalents.map(talentCard).join("")}
      </section>
      <div class="action-row">
        <button class="ghost" data-action="random-talents">随机选 3 个</button>
        <button class="ghost" data-action="reroll-talents" ${rerollDisabled}>重抽（${state.rerollsLeft}）</button>
      </div>
      <div class="action-row single">
        <button class="primary" id="toAttrs" data-action="to-attrs" ${state.selectedTalents.length === 3 ? "" : "disabled"}>分配属性</button>
      </div>
    `);
    bindActions();
  }

  function renderTalentPreview() {
    if (!state.selectedTalents.length) return '<span class="empty">先选 1-3 个天赋看看加点。</span>';
    const sum = {};
    state.selectedTalents.forEach((id) => {
      const eff = getTalent(id).effects;
      Object.entries(eff).forEach(([k, v]) => { sum[k] = (sum[k] || 0) + v; });
    });
    return Object.entries(sum)
      .map(([k, v]) => `<span class="delta ${v >= 0 ? "plus" : "minus"}">${escapeHtml(attrLabel(k))} ${v > 0 ? "+" : ""}${v}</span>`)
      .join("");
  }

  function renderAttributes() {
    state.screen = "attrs";
    const spent = totalAttrPoints();
    $app.innerHTML = shell(`
      <section class="panel">
        <h2 class="panel-title">分配属性</h2>
        <div class="chips">
          <span class="chip">总点数 20</span>
          <span class="chip" id="pointLeft">剩余 ${20 - spent}</span>
          <span class="chip">极端加点会很刺激</span>
        </div>
        <div class="talent-preview-title" style="margin-top:8px;">快速流派模板</div>
        <div class="preset-row">
          ${ATTR_PRESETS.map((p) => `<button class="preset-btn" data-preset="${p.id}">${escapeHtml(p.name)}</button>`).join("")}
          <button class="preset-btn" data-action="random-attrs">🎲 随机</button>
          <button class="preset-btn" data-action="clear-attrs">清零</button>
        </div>
      </section>
      <section class="panel allocator">
        ${ATTRS.map(([key, label]) => attrRow(key, label)).join("")}
      </section>
      <div class="action-row">
        <button class="ghost" data-action="back-talents">返回天赋</button>
        <button class="primary" id="beginLife" data-action="begin-life" ${spent === 20 ? "" : "disabled"}>投胎</button>
      </div>
    `);
    $$("[data-preset]").forEach((btn) => {
      btn.addEventListener("click", () => applyPreset(btn.dataset.preset));
    });
    bindSliders();
    bindActions();
  }

  function bindSliders() {
    $$(".attr-slider").forEach((slider) => {
      slider.addEventListener("input", () => {
        const key = slider.dataset.slider;
        let val = Number(slider.value);
        const otherSum = totalAttrPoints() - state.attrs[key];
        const maxAllowed = 20 - otherSum;
        if (val > maxAllowed) val = maxAllowed;
        if (val < 0) val = 0;
        state.attrs[key] = val;
        slider.value = val;
        const valueEl = document.querySelector(`[data-value="${key}"]`);
        if (valueEl) valueEl.textContent = val;
        const spent = totalAttrPoints();
        const remaining = 20 - spent;
        const pl = $("#pointLeft");
        if (pl) pl.textContent = `剩余 ${remaining}`;
        const bl = $("#beginLife");
        if (bl) bl.disabled = spent !== 20;
        $$(".attr-slider").forEach((other) => {
          const k = other.dataset.slider;
          other.max = state.attrs[k] + remaining;
        });
      });
    });
  }

  function applyPreset(id) {
    const preset = ATTR_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    state.attrs = { ...preset.attrs };
    renderAttributes();
  }

  function randomAttrs() {
    const fresh = { root: 0, insight: 0, body: 0, wealth: 0, luck: 0, beauty: 0 };
    for (let i = 0; i < 20; i += 1) {
      const key = ATTRS[Math.floor(Math.random() * ATTRS.length)][0];
      fresh[key] += 1;
    }
    state.attrs = fresh;
    renderAttributes();
  }

  function clearAttrs() {
    state.attrs = { root: 0, insight: 0, body: 0, wealth: 0, luck: 0, beauty: 0 };
    renderAttributes();
  }

  function renderGame() {
    state.screen = "game";
    const fated = state.activeFated;
    $app.innerHTML = shell(`
      ${statusPanel()}
      ${state.lastResult ? resultPanel(state.lastResult) : ""}
      <section class="panel">
        <h2 class="panel-title">${state.age} 岁这一年</h2>
        ${fated ? renderFatedPanel(fated) : `
          <div class="choice-list">
            ${state.choices.map(choiceCard).join("")}
          </div>
        `}
      </section>
      ${tagsPanel()}
      ${timelinePanel()}
    `);
    bindActions();
    if (state.lastResult) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderFatedPanel(event) {
    const tag = event.tier === "main" ? "主线剧情" : "支线剧情";
    return `
      <div class="fated-event ${event.tier}">
        <div class="fated-tag">${tag} · ${escapeHtml(event.title)}</div>
        <p class="fated-intro">${escapeHtml(fillTemplate(event.intro))}</p>
        <div class="choice-list">
          ${event.options.map((opt, i) => `
            <button class="choice-card fated-option" data-fated="${event.id}|${i}">
              <span class="choice-head">
                <span class="choice-title">→ ${escapeHtml(opt.label)}</span>
              </span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderEnding() {
    state.screen = "ending";
    const ending = state.ending || chooseEnding();
    state.ending = ending;
    recordSessionCatalog(ending);
    const unlocked = sessionCatalog.endings.length;
    const percent = Math.min(100, Math.round((unlocked / ENDINGS.length) * 100));
    $app.innerHTML = shell(`
      <section class="ending-card">
        <h2 class="ending-title">${escapeHtml(ending.name)}</h2>
        <div class="ending-meta">结局 ${String(ending.id).padStart(3, "0")}/100 · ${escapeHtml(ending.rarity)} · 最高境界 ${realmName()}</div>
        <p class="result-copy">${escapeHtml(fillTemplate(ending.text))}</p>
        ${state.epitaph ? `<div class="epitaph-box"><div class="epitaph-tag">墓志铭</div><div id="epitaphBox">${escapeHtml(state.epitaph)}</div></div>` : ""}
        <div class="unlock-progress">
          <div class="unlock-progress-head"><span>本会话解锁进度</span><span>${unlocked}/${ENDINGS.length}</span></div>
          <div class="bar"><i style="width:${percent}%"></i></div>
        </div>
        ${compareCard()}
      </section>
      ${battleReportPanel()}
      ${highlightsPanel()}
      ${statusPanel()}
      <section class="panel">
        <h2 class="panel-title">本局达成标签</h2>
        <div class="tag-list">${summaryTags().map((tag) => `<span class="tag ${tagClass(tag)}">${escapeHtml(tag)}</span>`).join("")}</div>
      </section>
      ${catalogPanel()}
      ${missedRoutesPanel()}
      ${timelinePanel()}
      <section class="panel">
        <h2 class="panel-title">天道加戏</h2>
        <button class="primary" data-action="heaven">请天道加戏</button>
        <div id="heavenOutput" class="heaven-output">天道正在装作没有看见你。</div>
      </section>
      <div class="action-row">
        <button class="ghost" data-action="restart">回到首页</button>
        <button class="primary" data-action="quick-restart">再重开一局</button>
      </div>
    `);
    bindActions();
  }

  function compareCard() {
    if (!lastRunSnapshot) return "";
    return `
      <div class="compare-card">
        <div class="compare-title">上局对比</div>
        <div class="compare-grid">
          <div><b>道号</b><span>${escapeHtml(lastRunSnapshot.name || "—")}</span></div>
          <div><b>享年</b><span>${lastRunSnapshot.age} 岁</span></div>
          <div><b>结局</b><span>${escapeHtml(lastRunSnapshot.endingName || "—")}</span></div>
        </div>
      </div>
    `;
  }

  function highlightsPanel() {
    const hl = (state.highlights || []).slice(-8).reverse(); // 最近 8 个
    if (!hl.length) return "";
    const ICONS = { main: "⚔", cameo: "🎭", breakthrough: "✨", savior: "⚡" };
    return `
      <section class="panel highlights-panel">
        <h2 class="panel-title">✨ 本局高光时刻</h2>
        <div class="highlights-grid">
          ${hl.map(h => `
            <div class="highlight-card ${h.kind}">
              <div class="highlight-icon">${ICONS[h.kind] || "·"}</div>
              <div class="highlight-text">${escapeHtml(h.text)}</div>
              <div class="highlight-age">${h.age} 岁</div>
            </div>
          `).join("")}
        </div>
        <button class="primary share-poster-btn" data-action="generate-poster">📸 生成战报海报</button>
        <div id="posterOutput"></div>
      </section>
    `;
  }

  function missedRoutesPanel() {
    const missed = ROUTES.filter((route) => (state.routes[route.id] || 0) === 0);
    if (!missed.length) return "";
    const sample = missed.slice(0, 4);
    return `
      <section class="panel">
        <h2 class="panel-title">本局错过的剧情线</h2>
        <div class="missed-list">
          ${sample.map((route) => `
            <div class="missed-item">
              <strong>${escapeHtml(route.name)}</strong>
              <span>${escapeHtml(route.stages[0])}…</span>
            </div>
          `).join("")}
        </div>
        <p class="missed-hint">下一局换个流派，说不定能走通其中一条。</p>
      </section>
    `;
  }

  function shell(content) {
    return `
      <header class="topbar">
        <div class="brand">
          <img src="./assets/talisman.svg" alt="修仙符箓像素图" />
          <div>
            <h1 class="brand-title">修仙重开模拟器</h1>
            <p class="brand-subtitle">网络梗乱炖 · 左韩天尊随机路过</p>
          </div>
        </div>
        <span class="pill">${state.name ? escapeHtml(state.name) : "未投胎"}</span>
      </header>
      ${content}
    `;
  }

  function bindActions() {
    $$("[data-action]").forEach((button) => {
      button.addEventListener("click", () => handleAction(button.dataset.action, button));
    });
    $$("[data-talent]").forEach((button) => {
      button.addEventListener("click", () => toggleTalent(button.dataset.talent));
    });
    $$("[data-attr]").forEach((button) => {
      button.addEventListener("click", () => changeAttr(button.dataset.attr, Number(button.dataset.step)));
    });
    $$("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => chooseEvent(button.dataset.choice));
    });
    $$("[data-fated]").forEach((button) => {
      button.addEventListener("click", () => chooseFatedOption(button.dataset.fated));
    });
  }

  function handleAction(action) {
    if (action === "start-talents") {
      state.name = $("#nameInput").value.trim() || randomName();
      renderTalent();
    }
    if (action === "dice-name") {
      const input = $("#nameInput");
      input.value = randomName();
      state.name = input.value;
    }
    if (action === "reroll-talents") {
      if (state.rerollsLeft <= 0) return;
      state.rerollsLeft -= 1;
      renderTalent(true);
    }
    if (action === "random-talents") {
      const pool = [...currentTalents];
      state.selectedTalents = [];
      while (state.selectedTalents.length < 3 && pool.length) {
        const idx = Math.floor(Math.random() * pool.length);
        state.selectedTalents.push(pool.splice(idx, 1)[0].id);
      }
      renderTalent(false);
    }
    if (action === "random-attrs") randomAttrs();
    if (action === "clear-attrs") clearAttrs();
    if (action === "to-attrs") renderAttributes();
    if (action === "back-talents") renderTalent(false);
    if (action === "begin-life") beginLife();
    if (action === "restart") {
      snapshotForCompare();
      state = freshState();
      renderStart();
    }
    if (action === "quick-restart") {
      snapshotForCompare();
      const oldName = state.name;
      state = freshState();
      state.name = oldName;
      renderTalent();
    }
    if (action === "heaven") requestHeaven();
    if (action === "copy-report") copyReport();
    if (action === "generate-poster") showPoster();
  }

  function snapshotForCompare() {
    if (!state.ending) return;
    lastRunSnapshot = {
      name: state.name,
      age: state.age,
      realm: realmName(),
      endingName: state.ending.name,
    };
  }

  function beginLife() {
    state.baseAttrs = clone(state.attrs);
    state.selectedTalents.forEach((id) => applyEffects(getTalent(id).effects, false));
    addTags(state.selectedTalents.flatMap((id) => getTalent(id).tags));
    state.stones += Math.max(0, state.attrs.wealth) * 5;
    state.fame += Math.max(0, Math.floor(state.attrs.beauty / 4));
    state.attention += Math.max(0, Math.floor((state.attrs.root + state.attrs.beauty - state.attrs.luck) / 8));
    logLine("0 岁", `${state.name} 出生了。村口老者看了一眼属性面板，评价：${openingComment()}。`);
    if (checkInstantDeath("birth")) return endRun();
    prepareTurn();
  }

  function prepareTurn() {
    if (!state.alive) return endRun();
    if (state.age > REALMS[state.realm].life) {
      die("寿元耗尽", "你活过了寿元上限。天道翻了翻账本，发现你已经拖更很多年。", "age");
      return endRun();
    }
    // 飞升判定放宽：化神(5)起就有机会，渡劫(9)几乎必飞
    if (state.realm >= 5 && state.cultivation > REALMS[state.realm].threshold * 0.6) {
      const baseAscend = (state.realm - 4) * 12; // 化神12 / 炼虚24 / 合体36 / 大乘48 / 渡劫60
      const roll = Math.random() * 100;
      const score = roll + state.attrs.luck + state.attrs.insight + baseAscend - Math.floor(state.attention / 3);
      if (score > 72) {
        state.alive = false;
        state.deathKind = "ascension";
        state.deathReason = "羽化飞升";
        state.ending = chooseEnding("ascension");
        logLine(`${state.age} 岁`, "你踏入飞升通道。左韩天尊追到门口问你有没有买返程票，你假装没听见。");
        return endRun();
      }
    }
    // 优先检查 fated 事件（主线 > 支线）
    const fated = pickReadyFated();
    if (fated) {
      state.activeFated = fated;
      state.choices = [];
    } else {
      state.activeFated = null;
      state.choices = pickChoices();
    }
    renderGame();
  }

  function matchesFated(event) {
    if (state.firedFated.includes(event.id)) return false;
    const req = event.requires || {};
    if (req.ageMin != null && state.age < req.ageMin) return false;
    if (req.ageMax != null && state.age > req.ageMax) return false;
    if (req.realmMin != null && state.realm < req.realmMin) return false;
    if (req.realmMax != null && state.realm > req.realmMax) return false;
    if (req.talents && req.talents.length) {
      if (!req.talents.some((t) => state.selectedTalents.includes(t))) {
        // 如果 anyOf 提供了备选条件，检查备选
        if (req.anyOf) {
          const hasTalent = req.anyOf.talents && req.anyOf.talents.some((t) => state.selectedTalents.includes(t));
          const hasAttr = req.anyOf.minAttr && Object.entries(req.anyOf.minAttr).every(([k, v]) => state.attrs[k] >= v);
          if (!hasTalent && !hasAttr) return false;
        } else {
          return false;
        }
      }
    }
    if (req.anyOf && !req.talents) {
      const hasTalent = req.anyOf.talents && req.anyOf.talents.some((t) => state.selectedTalents.includes(t));
      const hasAttr = req.anyOf.minAttr && Object.entries(req.anyOf.minAttr).every(([k, v]) => state.attrs[k] >= v);
      if (!hasTalent && !hasAttr) return false;
    }
    if (req.flags && req.flags.length) {
      if (req.anyFlag) {
        if (!req.flags.some((f) => state.flags[f])) return false;
      } else {
        if (!req.flags.every((f) => state.flags[f])) return false;
      }
    }
    return true;
  }

  function pickReadyFated() {
    // 主线：100% 触发
    const mains = FATED_EVENTS.filter((e) => e.tier === "main" && matchesFated(e));
    if (mains.length) return mains[0];
    // 支线：分类区分概率
    const sides = FATED_EVENTS.filter((e) => e.tier === "side" && matchesFated(e));
    if (!sides.length) return null;
    const first = sides[0];
    // 动漫客串（side:cameo:*）：35% 触发，让"擦肩"成为惊喜
    if (first.id.startsWith("side:cameo:")) {
      return Math.random() < 0.35 ? first : null;
    }
    // 其他支线：60% 触发，让水文有呼吸
    return Math.random() < 0.60 ? first : null;
  }

  function chooseFatedOption(token) {
    if (!state.alive) return;
    const [eventId, idxStr] = token.split("|");
    const event = FATED_EVENTS.find((e) => e.id === eventId);
    if (!event) return;
    const option = event.options[Number(idxStr)];
    if (!option) return;
    state.firedFated.push(eventId);
    state.stats.fatedSeen += 1;
    if (event.sets?.flags) event.sets.flags.forEach((f) => { state.flags[f] = true; });
    if (option.sets) option.sets.forEach((f) => { state.flags[f] = true; });
    const before = snapshotStats();
    applyEffects(option.effects || {}, true);
    state.lastResult = {
      title: `${event.title} · ${option.label}`,
      text: option.result,
      changes: diffStats(before, snapshotStats()),
      category: event.tier === "main" ? "fated-main" : "fated-side",
    };
    logLine(`${state.age} 岁`, `【${event.tier === "main" ? "主线" : "支线"}】${event.title}：${option.label}`);
    // 高光记录：主线全部 + 含动漫角色的支线
    if (event.tier === "main") recordHighlight("main", `${event.title}·${option.label}`);
    else if (event.id.startsWith("side:cameo:")) recordHighlight("cameo", `${event.title}`);
    // 主线选项触发 DeepSeek 旁白；支线只在关键节点触发
    if (event.tier === "main") fetchNarrator(event, option);
    if (option.triggersAscension) {
      state.alive = false;
      state.deathKind = "ascension";
      state.deathReason = "羽化飞升";
      state.ending = chooseEnding("ascension");
      return endRun();
    }
    if (option.triggersDeath) {
      die(option.triggersDeath.reason, option.triggersDeath.text, option.triggersDeath.kind || "death");
      return endRun();
    }
    tryBreakthrough();
    if (!state.alive) return endRun();
    state.turns += 1;
    state.age += nextAgeSpan();
    state.activeFated = null;
    if (checkInstantDeath("turn")) return endRun();
    prepareTurn();
  }

  function chooseEvent(eventId) {
    const event = EVENT_POOL.find((item) => item.id === Number(eventId));
    if (!event || !state.alive) return;
    state.stats.eventsSeen += 1;
    const before = snapshotStats();
    addTags(event.tags || []);
    if (event.character) rememberCharacter(event.character);
    if (event.route) advanceRoute(event.route);
    if (event.leftHanTier) recordLeftHan(event.leftHanTier);
    // 自动 flag：水文事件按分类 set flag，让后续主线读取（早期选择影响晚期）
    const AUTO_FLAGS = {
      artifact: "fc_artifact",   // 接触过法宝
      cameo: "fc_cameo",          // 见过小说主角
      crossover: "fc_crossover",  // 经历串台
      golden: "fc_golden_event",  // 金丹期事件
      nascent: "fc_nascent_event",// 元婴期事件
      zuohan: "fc_zuohan_event",  // 左韩相关事件
      death: "fc_brushed_death",  // 接触过死亡边缘
    };
    if (AUTO_FLAGS[event.category]) state.flags[AUTO_FLAGS[event.category]] = true;
    if (event.leftHanTier?.id === "body") state.flags.fc_zuohan_witness = true;
    applyEffects(event.effects, true);
    state.lastResult = {
      title: event.title,
      text: event.result,
      changes: diffStats(before, snapshotStats()),
      category: event.category,
      route: event.route,
      leftHanTier: event.leftHanTier,
    };
    logLine(`${state.age} 岁`, `${event.title}：${event.result}`);
    // 飞升序章事件链：finale 类事件 + 化神(5)以上 → 累进 ascensionStage，第3次触发飞升
    if (event.category === "finale" && state.realm >= 5) {
      state.stats.ascensionStage += 1;
      if (state.stats.ascensionStage === 1) {
        logLine(`${state.age} 岁`, "你听见远方天门的第一声回响——飞升序章已开启。");
      } else if (state.stats.ascensionStage === 2) {
        logLine(`${state.age} 岁`, "天门为你开启第二重，雷声在三界外低响。再走一步就够得着了。");
      } else if (state.stats.ascensionStage >= 3) {
        state.alive = false;
        state.deathKind = "ascension";
        state.deathReason = "羽化飞升";
        state.ending = chooseEnding("ascension");
        logLine(`${state.age} 岁`, "你迈出最后一步，飞升通道在身后合拢。左韩天尊在门外问你有没有买返程票，你假装没听见。");
        return endRun();
      }
    }
    if (rollDeath(event)) return endRun();
    tryBreakthrough();
    if (!state.alive) return endRun();
    state.turns += 1;
    state.age += nextAgeSpan();
    if (checkInstantDeath("turn")) return endRun();
    prepareTurn();
  }

  function tryBreakthrough() {
    const realm = REALMS[state.realm];
    if (state.cultivation < realm.threshold) return;
    if (state.realm >= REALMS.length - 1) return;
    const chance = 55 + state.attrs.root * 3 + state.attrs.insight * 2 + state.attrs.body + state.attrs.luck - Math.floor(state.attention / 2);
    const roll = Math.random() * 100;
    if (roll < chance) {
      const oldRealm = realm.name;
      state.realm += 1;
      state.cultivation = Math.floor(state.cultivation * 0.25);
      state.stats.breakthroughs += 1;
      addTags([`${REALMS[state.realm].name}修士`]);
      state.lastResult.changes.push({ label: "境界", value: `${oldRealm} -> ${REALMS[state.realm].name}`, kind: "plus" });
      logLine(`${state.age} 岁`, `你突破到${REALMS[state.realm].name}。天道弹出提示：千百次练习只为这一刻。`);
      flashOverlay("breakthrough");
      if (state.realm >= 3) recordHighlight("breakthrough", `${state.age}岁突破${REALMS[state.realm].name}`);
    } else {
      state.cultivation = Math.floor(state.cultivation * 0.65);
      const damage = Math.ceil((100 - chance) / 40);
      state.attrs.body -= damage;
      state.lastResult.changes.push({ label: "突破失败", value: `体魄 -${damage}`, kind: "minus" });
      logLine(`${state.age} 岁`, `突破失败。丹田发出一声尊嘟假嘟，你决定先敬自己一杯。`);
      if (state.attrs.body < -8 && Math.random() < 0.15) {
        die("突破炸号", "你强行突破，结果把自己炼成了宗门热搜第一。", "breakthrough");
      }
    }
  }

  function rollDeath(event) {
    let chance = event.deathChance || 0;
    chance += Math.max(0, -state.attrs.body) * 0.05;
    chance += Math.max(0, -state.attrs.luck) * 0.04;
    if (state.attrs.beauty > 16 && state.attrs.luck < 3) chance += 0.08;
    if (event.category === "zuohan") chance += Math.min(0.24, state.attention * 0.025);
    if (event.leftHanTier?.id === "rumor") chance *= 0.25;
    if (event.leftHanTier?.id === "aftershock") chance *= 0.85;
    if (event.leftHanTier?.id === "body") chance += 0.18;
    if (Math.random() < chance) {
      // 死亡挽救：优先触发救命手段
      const savior = pickSavior();
      if (savior) {
        applySavior(savior, event);
        return false;
      }
      const text = event.deathText || deathTextFor(event.category);
      const reason = pickDeathReason(event.category, event.leftHanTier);
      die(reason, text, event.category);
      return true;
    }
    return false;
  }

  // 死亡挽救：返回第一个可用救命手段
  // 记录高光时刻
  function recordHighlight(kind, text) {
    if (!state.highlights) state.highlights = [];
    state.highlights.push({ kind, text, age: state.age });
    if (state.highlights.length > 12) state.highlights.shift();
  }

  function pickSavior() {
    if (!state.stats.usedSaviors) state.stats.usedSaviors = {};
    const used = state.stats.usedSaviors;
    if ((state.flags.ring_master || state.flags.ring_contract) && (used.ring || 0) < 3 && state.cultivation >= 15) {
      return { kind: "ring", cost: 15, name: "戒指老爷爷救场" };
    }
    if (state.flags.sys_signed && !used.sys) {
      return { kind: "sys", cost: 0, name: "系统救命礼包" };
    }
    if (state.flags.heaven_amused && !used.heaven) {
      return { kind: "heaven", cost: 0, name: "天道豁免符" };
    }
    if ((state.flags.re_remembers || state.flags.re_faced_doom) && (used.rebirth || 0) < 2) {
      return { kind: "rebirth", cost: 0, name: "重生者预感闪避" };
    }
    if (state.attrs.luck >= 12) {
      return { kind: "luck", cost: 4, name: "气运庇佑" };
    }
    if (state.selectedTalents.includes("t004") && state.attrs.body >= 3) {
      return { kind: "bone", cost: 5, name: "至尊骨硬扛" };
    }
    return null;
  }

  function applySavior(s, event) {
    const used = state.stats.usedSaviors;
    used[s.kind] = (used[s.kind] || 0) + 1;
    if (s.kind === "ring") state.cultivation = Math.max(0, state.cultivation - s.cost);
    if (s.kind === "luck") state.attrs.luck -= s.cost;
    if (s.kind === "bone") state.attrs.body -= s.cost;
    addTags([`${s.name}救命`]);
    logLine(`${state.age} 岁`, `⚡ ${s.name} 触发！${event.title} 本该是绝境，但${s.name}替你扛了下来。`);
    if (state.lastResult) {
      state.lastResult.savior = `⚡ ${s.name} 救你一命${s.cost ? `（代价：${s.cost}）` : ""}`;
    }
    // 高光时刻记录
    recordHighlight("savior", `${state.age}岁${s.name}救命`);
  }

  function checkInstantDeath(moment) {
    state.stats.deathChecks += 1;
    if (moment === "birth") {
      if (state.attrs.beauty >= 18 && state.attrs.body <= 1 && Math.random() < 0.15) {
        die("天妒红颜", "你把点数几乎全给了颜值。出生第三天，天道发现这个建模不合理，直接打补丁。", "beauty");
        return true;
      }
      if (state.attrs.wealth <= 0 && state.attrs.body <= 0 && Math.random() < 0.10) {
        die("出生即饥饿", "你试图辟谷，结果发现自己只是没饭吃。", "poverty");
        return true;
      }
      if (state.attrs.luck <= 0 && state.attrs.body <= 1 && Math.random() < 0.05) {
        die("左韩路过", "左韩天尊第一天路过你村，疑惑为什么反派要等主角长大，于是顺手把地图刷新了。", "zuohan");
        return true;
      }
    }
    if (state.attrs.body < -10 && Math.random() < 0.15) {
      die("脆皮形体崩散", "你被一阵灵风吹出了剧情边界，旁白都没来得及加载。", "body");
      return true;
    }
    if (state.attention > 24 && Math.random() < 0.05) {
      die("左韩精准定位", "左韩天尊打开小地图，发现你这个亮点过于显眼，决定亲自测试一下伤害。", "zuohan");
      return true;
    }
    return false;
  }

  function die(reason, text, kind) {
    state.alive = false;
    state.deathReason = reason;
    state.deathKind = kind;
    addTags(["已死亡", reason]);
    logLine(`${state.age} 岁`, `${reason}：${text}`);
    state.ending = chooseEnding(kind);
    flashOverlay("death");
    fetchEpitaph();
  }

  function fetchEpitaph() {
    state.epitaph = "墓志铭撰写中……";
    const payload = {
      name: state.name,
      age: state.age,
      realm: realmName(),
      reason: state.deathReason,
      topFlags: Object.keys(state.flags).slice(0, 6),
      tags: summaryTags().slice(0, 5),
    };
    fetch("/api/epitaph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((data) => {
        state.epitaph = data.text || `${state.name}，享年 ${state.age} 岁。`;
        const node = document.getElementById("epitaphBox");
        if (node) node.textContent = state.epitaph;
      })
      .catch(() => {
        state.epitaph = `${state.name}，享年 ${state.age} 岁。葬于无名山下。`;
        const node = document.getElementById("epitaphBox");
        if (node) node.textContent = state.epitaph;
      });
  }

  function fetchNarrator(event, option) {
    state.lastNarration = "天道沉思中……";
    const payload = {
      event: event.title,
      option: option.label,
      result: option.result,
      age: state.age,
      realm: realmName(),
    };
    fetch("/api/narrator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((data) => {
        state.lastNarration = data.text || "";
        const node = document.getElementById("narratorBox");
        if (node) node.textContent = state.lastNarration;
      })
      .catch(() => {
        state.lastNarration = "天道默默记下了这一笔。";
        const node = document.getElementById("narratorBox");
        if (node) node.textContent = state.lastNarration;
      });
  }

  function flashOverlay(kind) {
    const node = document.createElement("div");
    node.className = `flash-overlay ${kind}`;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 800);
  }

  function showToast(text) {
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = text;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 2200);
  }

  function endRun() {
    state.alive = false;
    if (!state.epitaph) fetchEpitaph();
    renderEnding();
  }

  function pickChoices() {
    const count = randInt(2, 4);
    const candidates = EVENT_POOL.filter(matchesEvent).map((event) => ({
      event,
      weight: eventWeight(event),
    }));
    const choices = [];
    while (choices.length < count && candidates.length) {
      const picked = weightedPick(candidates);
      choices.push(picked);
      for (let index = candidates.length - 1; index >= 0; index -= 1) {
        if (candidates[index].event.id === picked.id || candidates[index].event.title === picked.title) {
          candidates.splice(index, 1);
        }
      }
    }
    return choices;
  }

  function matchesEvent(event) {
    if (state.age < event.minAge || state.age > event.maxAge) return false;
    if (state.realm < event.minRealm || state.realm > event.maxRealm) return false;
    if (event.requiresTag && !state.tags.includes(event.requiresTag)) return false;
    if (event.blocksTag && state.tags.includes(event.blocksTag)) return false;
    if (event.category === "finale" && state.realm < 5) return false;
    if (event.leftHanTier?.id === "body" && state.age < 6 && state.attrs.luck > 1) return false;
    if (event.leftHanTier?.id === "body" && state.attention < 5 && state.attrs.luck > 2 && state.realm < 2) return false;
    return true;
  }

  function eventWeight(event) {
    let weight = event.weight;
    if (event.leftHanTier?.id === "rumor") weight += Math.max(0, state.attention) * 0.5;
    if (event.leftHanTier?.id === "aftershock") weight += Math.max(0, state.attention - 4) * 0.4;
    if (event.leftHanTier?.id === "body") weight += Math.max(0, state.attention - 14) * 0.2;
    if (event.category === "death") weight += Math.max(0, 8 - state.attrs.luck) * 1;
    if (event.category === "cameo" && state.fame > 6) weight += 12;
    if (event.category === "artifact" && state.attrs.luck > 6) weight += 10;
    if (event.category === "childhood" && state.age <= 10) weight += 24;
    if (event.category === "finale" && state.realm >= 5) weight += 30;
    if (event.category === "nascent" && state.realm >= 4) weight += 20;
    if (event.category === "golden" && state.realm >= 3) weight += 18;
    return Math.max(0.2, weight);
  }

  function advanceRoute(routeId) {
    if (!routeId || !(routeId in state.routes)) return;
    state.routes[routeId] = clamp(state.routes[routeId] + 1, 0, 5);
    addTags([routeName(routeId)]);
  }

  function recordLeftHan(tier) {
    if (!tier) return;
    state.stats.leftHanCount += 1;
    if (tier.id === "rumor") state.stats.leftHanRumors += 1;
    if (tier.id === "aftershock") state.stats.leftHanAftershocks += 1;
    if (tier.id === "body") state.stats.leftHanBody += 1;
  }

  function applyEffects(effects = {}, clampAttrs) {
    Object.entries(effects).forEach(([key, value]) => {
      if (key in state.attrs) {
        state.attrs[key] += value;
        if (clampAttrs) state.attrs[key] = clamp(state.attrs[key], -10, 30);
      } else if (key in state) {
        state[key] += value;
        if (key === "attention") state[key] = clamp(state[key], 0, 50);
        if (key === "cultivation") state[key] = Math.max(0, state[key]);
      }
    });
  }

  function drawTalents(count) {
    const pool = [...TALENTS];
    const result = [];
    while (result.length < count && pool.length) {
      const index = Math.floor(Math.random() * pool.length);
      result.push(pool.splice(index, 1)[0]);
    }
    return result;
  }

  function toggleTalent(id) {
    const picked = state.selectedTalents.includes(id);
    if (picked) state.selectedTalents = state.selectedTalents.filter((item) => item !== id);
    else if (state.selectedTalents.length < 3) state.selectedTalents.push(id);
    $$(".talent-card").forEach((card) => {
      card.classList.toggle("selected", state.selectedTalents.includes(card.dataset.talent));
    });
    $("#talentCounter").textContent = `已选 ${state.selectedTalents.length}/3`;
    $("#toAttrs").disabled = state.selectedTalents.length !== 3;
    const preview = $("#talentPreview");
    if (preview) preview.innerHTML = renderTalentPreview();
  }

  function changeAttr(key, step) {
    const spent = totalAttrPoints();
    if (step > 0 && spent >= 20) return;
    if (step < 0 && state.attrs[key] <= 0) return;
    state.attrs[key] += step;
    renderAttributes();
  }

  function totalAttrPoints() {
    return ATTRS.reduce((sum, [key]) => sum + state.attrs[key], 0);
  }

  function generateEventPool() {
    let id = 1;
    return CATEGORY_PLAN.flatMap(([key, label, count]) => {
      const config = categoryConfig(key, label);
      const events = [];
      const SCENE_LEN = config.scenes.length;
      const ACTION_LEN = config.actions.length;
      for (let i = 0; i < count; i += 1) {
        // 正交索引：每对 (scene, action) 在 SCENE_LEN×ACTION_LEN 个组合中均匀分布
        const sceneIdx = i;
        const actionIdx = Math.floor(i / SCENE_LEN) + i * 3;
        const introIdx = i * 7 + 11 + Math.floor(i / (SCENE_LEN * 2));
        const titleIdx = i * 11 + 3;
        const memeIdx = i * 5 + 7;
        const outcomeIdx = i * 7 + 4;
        const meme = cycle(MEMES, memeIdx);
        const actor = cycle(NOVEL_NAMES, i + config.actorOffset);
        const scene = cycle(config.scenes, sceneIdx);
        const action = cycle(config.actions, actionIdx);
        const outcome = cycle(config.outcomes, outcomeIdx);
        const title = buildTitle(scene, action, titleIdx);
        const effects = buildEffects(key, i);
        const leftHanTier = key === "zuohan" ? leftHanTierFor(i) : null;
        tuneLeftHanEffects(effects, leftHanTier);
        const route = routeFor(key, i);
        const tags = [...config.tags, meme];
        if (route) tags.push(routeName(route));
        if (leftHanTier) tags.push(leftHanTier.label);
        if (key === "cameo") tags.push(actor);
        events.push({
          id: id++,
          category: key,
          categoryLabel: leftHanTier?.label || label,
          title: leftHanTier ? `${leftHanTier.label}：${title}` : title,
          text: buildIntro(key, scene, actor, action, meme, leftHanTier, introIdx),
          result: fillEventResult(outcomeForTier(outcome, leftHanTier), actor, meme),
          effects,
          tags,
          route,
          leftHanTier,
          character: key === "cameo" ? actor : null,
          minAge: config.minAge,
          maxAge: config.maxAge,
          minRealm: config.minRealm,
          maxRealm: config.maxRealm,
          weight: eventBaseWeight(config, i, leftHanTier),
          deathChance: eventBaseDeathChance(config, i, leftHanTier),
          deathText: deathTextForTier(cycle(config.deaths, i), leftHanTier),
        });
      }
      return events;
    });
  }

  function leftHanTierFor(index) {
    if (index % 29 === 0) return LEFT_HAN_TIERS[2];
    if (index % 7 === 0) return LEFT_HAN_TIERS[1];
    return LEFT_HAN_TIERS[0];
  }

  function routeFor(key, index) {
    if (key === "zuohan") return "zuohan";
    if (key === "artifact" && index % 2 === 0) return "ring";
    if (key === "crossover") return "overbearing";
    if ((key === "initiation" || key === "childhood") && index % 4 === 0) return "marriage";
    if ((key === "childhood" || key === "death") && index % 5 === 0) return "beautyDoom";
    if ((key === "mortal" || key === "qi" || key === "foundation") && index % 3 === 0) return "survivor";
    return null;
  }

  function routeName(routeId) {
    return ROUTES.find((route) => route.id === routeId)?.name || routeId;
  }

  function tuneLeftHanEffects(effects, leftHanTier) {
    if (!leftHanTier) return;
    if (leftHanTier.id === "rumor") {
      effects.attention = 0;
      effects.luck = 0;
      effects.cultivation = Math.max(1, effects.cultivation || 1);
    }
    if (leftHanTier.id === "aftershock") {
      effects.attention = 1;
      effects.luck = -1;
      effects.cultivation = Math.min(2, effects.cultivation || 0);
    }
    if (leftHanTier.id === "body") {
      effects.attention = 3;
      effects.luck = -2;
      effects.body = (effects.body || 0) - 1;
    }
  }

  function eventBaseWeight(config, index, leftHanTier) {
    if (leftHanTier) return leftHanTier.weight + (index % 3);
    return config.weight + (index % 9);
  }

  function eventBaseDeathChance(config, index, leftHanTier) {
    if (leftHanTier) return leftHanTier.deathChance + (index % 17 === 0 ? 0.03 : 0);
    return config.deathChance + (index % 17 === 0 ? 0.08 : 0);
  }

  function outcomeForTier(outcome, leftHanTier) {
    if (!leftHanTier) return outcome;
    if (leftHanTier.id === "rumor") return `你只是听见一些传闻：${outcome}`;
    if (leftHanTier.id === "aftershock") return `余波扫过小地图：${outcome}`;
    return `左韩天尊本体真的路过：${outcome}`;
  }

  function deathTextForTier(text, leftHanTier) {
    if (!leftHanTier) return text;
    if (leftHanTier.id === "rumor") return "你被左韩传闻吓到腿软，但严格来说这次不是他本人动手。";
    if (leftHanTier.id === "aftershock") return "左韩余波擦过，你的人生像低配地图一样开始掉帧。";
    return text;
  }

  function categoryConfig(key, label) {
    const common = {
      actorOffset: 0,
      titleLinks: ["遭遇", "触发", "撞见", "误入", "捡到"],
      scenes: ["村口大槐树", "破旧祠堂", "后山小路", "灵田旁边", "坊市拐角"],
      actions: ["神秘传闻", "离谱机缘", "古怪选择", "小型事故", "抽象剧情"],
      outcomes: ["你当场悟了，但悟得不多", "天道沉默，旁白加班", "附近修士表示这不合理", "你获得一点点情绪价值"],
      deaths: ["你被剧情强行下线，连遗言都像自动生成。"],
      tags: [label],
      minAge: 0,
      maxAge: 90000,
      minRealm: 0,
      maxRealm: REALMS.length - 1,
      weight: 20,
      deathChance: 0.02,
    };
    const map = {
      childhood: {
        ...common,
        minAge: 0,
        maxAge: 12,
        weight: 42,
        deathChance: 0.012,
        scenes: ["满月宴", "摇篮边", "村口井边", "私塾门口", "祖传土炕", "村尾鸡窝", "后院菜园", "村口大槐树", "邻家屋檐", "庙会摊前", "山脚溪边", "村口告示栏", "夜里被窝", "祖母膝头", "村塾后厨", "土地庙前", "邻村大集", "山道驴车", "祖宅老井", "祠堂石阶", "村东老桥", "山间野草丛", "村口铁匠铺", "屋顶瓦片"],
        actions: ["天赋检测", "奶瓶渡劫", "抓周抓到飞剑", "被路人甲预言", "婴儿期顿悟", "偷尝灵酒", "撞见隐世高人", "捡到一枚铜钱", "被野猫盯上", "听见怪梦", "误闯邻家", "学到第一个字", "做了一个怪决定", "被夸了一句", "踢翻一只蛐蛐罐", "捡到半张符箓", "认识一个怪叔叔", "学会爬到房顶", "数清楚天上星星", "做了第一场梦", "被狗追了三条街", "尝到第一口辣", "认识同岁邻居", "抓住一只发光萤火虫"],
        outcomes: ["你还不会说话，已经开始被退婚", "全村都说你像主角，左韩天尊听见了", "你试图辟谷，幸好只是睡着了", "天道给你打了一个幼年补丁", "你笑出了声，全村都松了口气", "你做了件没人记得的小事，但你自己记了五十年", "你被邻居夸像主角，但是反派那种", "你的瞳孔好像闪了一下，没人看见", "你学到的第一句话是请客", "你做的怪事被写进村史"],
        deaths: ["你被全村围观到没人记得喂饭，达成高颜值低体魄经典死法。"],
      },
      initiation: {
        ...common,
        minAge: 6,
        maxAge: 24,
        weight: 38,
        deathChance: 0.018,
        scenes: ["测灵根大会", "山门石阶", "退婚现场", "拜师广场", "外门考核", "宗门小厨房", "藏经阁门口", "新人迎客厅", "考核擂台", "山门告示墙", "前辈试炼洞", "宗门内门入口", "杂役堂后山", "执法堂大门", "炼器房入口", "丹房后院", "弟子寝舍", "演武厅", "藏剑阁顶层", "宗门戏台", "弟子澡堂", "山门挑水井"],
        actions: ["灵根炸表", "戒指发光", "三年之约", "师父抢人", "宗门录取", "被分到杂役堂", "偷看禁书", "抢前辈的位置", "拒绝霸道师姐", "意外答出问题", "搞砸新人任务", "顶撞执法长老", "和师姐结仇", "偷藏好功法", "抢内门资格", "替师兄背锅", "拜入冷门系", "考核作弊被抓", "意外救人立功", "被同门排挤"],
        outcomes: ["长老看了你的面板，决定先让你交报名费", "你喊出三十年河东，结果对面问你河在哪", "戒指老爷爷刚醒就要求更新版本", "你差点拜入仙门，差的是一点气运", "你的回答让长老沉默了三秒", "你成功把杂役堂混成了情报站", "你被罚抄三百遍门规，全部背了下来", "你混进了内门弟子小群"],
      },
      mortal: {
        ...common,
        minAge: 0,
        maxAge: 80,
        maxRealm: 2,
        deathChance: 0.015,
        scenes: ["茶馆说书", "镖局门口", "村咖摊位", "夜市桥头", "破庙避雨", "驿站马厩", "码头早市", "城北当铺", "戏台后巷", "客栈柜台", "巷口小馄饨摊", "渡口废船", "城南棋摊", "庙会戏台", "州府衙门", "镖路客栈", "山下集市", "破庙古井", "私塾窗前", "卖艺人群", "城门口", "黑市后巷"],
        actions: ["江湖传闻", "低配奇遇", "凡人流跑路", "市井挑战", "小地图刷新", "替人跑腿", "目睹斗法", "被误认为大人物", "捡到一封信", "和镖师打赌", "撞见逃犯", "围观处决", "解读一道符箓", "替算命先生当托", "误买真灵丹", "替人挡刀", "和驿丞下棋", "听到江湖秘辛", "做了一笔小生意", "撞破密谋"],
        outcomes: ["说书人把你的经历讲成了三百章水文", "你学会了凡人流核心：活着", "路人说你这命格太番茄了，三章内必反杀", "你获得一杯灵泉拿铁，简称村咖", "你和摊主互相说包的，气氛突然凝固", "你做的事第二天上了城里热搜", "你拿到一份免费早茶", "你的名字被写进当地州志的一行小注"],
      },
      qi: {
        ...common,
        minAge: 10,
        maxAge: 140,
        minRealm: 1,
        maxRealm: 2,
        weight: 44,
        deathChance: 0.025,
        scenes: ["炼气洞府", "小秘境入口", "灵石矿洞", "夜间练剑场", "散修集市", "山涧瀑布", "宗门坐忘台", "废弃丹房", "外门长廊", "灵泉池边", "云海观星台", "落叶林后", "野外灵田", "断崖洞天", "古井灵眼", "藏书楼夹层", "竹海深处", "禁山边缘", "迷雾沼泽", "雪山外围", "妖兽巢穴", "幻境入口"],
        actions: ["吐纳翻车", "捡漏摊位", "基础功法", "妖兽擦边", "低阶擂台", "打坐入定", "被同门挑衅", "尝试新功法", "采集灵草", "比试一招", "破除小幻阵", "驯服一只幼兽", "炼制低阶丹药", "试穿法袍", "学习剑诀", "夜探禁地", "假装路过偷听", "替人代修一日", "击退山贼", "捡到一块灵骨"],
        outcomes: ["你把基础练习做成了千百次只为这一刻", "一只妖兽路过，被你的抽象剑法劝退", "摊主说包的，然后把假货卖给了你", "你修为上涨，钱包下降，符合能量守恒", "你打坐时听见同门的内心 OS，决定假装没听见", "你顺手做了一件事，被记进师门日志", "你的功法终于练到第三层", "你和妖兽对视，它先眨了眼"],
      },
      foundation: {
        ...common,
        minAge: 18,
        maxAge: 260,
        minRealm: 2,
        maxRealm: 3,
        weight: 42,
        deathChance: 0.03,
        scenes: ["筑基秘境", "古修洞府", "雷雨山谷", "灵药园深处", "拍卖会后门", "古战场遗址", "鬼市深巷", "无名峰顶", "前辈遗骸旁", "禁地外围", "封魔崖底", "天罡海眼", "万妖谷边", "古道残碑", "九幽冰湖", "孤剑山顶", "幽魂渡口", "镇魔塔下", "云外天桥", "断龙崖", "古巨人遗骨", "传送阵废墟"],
        actions: ["秘境夺宝", "老爷爷教学", "雷劫擦肩", "古法筑基", "灵药成精", "破阵闯关", "和同道分赃", "强夺机缘", "拒绝心魔", "拆穿陷阱", "试用古法", "焚毁邪物", "唤醒沉睡前辈", "签下契约灵兽", "祭出本命法宝", "夺取秘境真传", "立下重誓", "渡过小雷劫", "结识强力盟友", "破解古文"],
        outcomes: ["你差点以为自己是天命之子，直到门票要另付", "古修留言写着尊嘟假嘟，你决定谨慎一点", "灵药问你要不要情绪价值，你说先给修为", "你筑基的姿势很帅，但围观群众更关心爆率", "你拆穿了陷阱，反派当场加你好友", "你和同道分赃时让出一份，多年后被回报", "你站在崖顶半天，悟出了一个小道理", "你的本命法宝认主了，它叫了你一声主人"],
      },
      golden: {
        ...common,
        minAge: 30,
        maxAge: 650,
        minRealm: 3,
        maxRealm: 4,
        weight: 37,
        deathChance: 0.025,
        scenes: ["金丹庆典", "大能遗迹", "海上仙岛", "跨服擂台", "古城天榜", "天南剑会", "九州论道台", "万妖朝拜山", "御灵仙城", "金丹宴客厅", "诸宗联盟会", "天梯赛场", "归墟岛", "古战神祠", "炎黄炼丹峰", "金丹真人府"],
        actions: ["装逼翻车", "夺宝反转", "天榜留名", "丹成异象", "仇家堵门", "宗门联姻", "拒绝邀请", "大杀四方", "立下宗规", "镇压邪修", "解救前辈", "拆穿天才假面", "招收第一批弟子", "破开禁地"],
        outcomes: ["你刚想说我命由我，台下有人递来版权登记表", "金丹异象像短视频滤镜，AI味太冲", "仇家排队堵门，你怀疑自己进了爽文批发市场", "你一招镇住全场，除了左韩天尊的影子", "你的名字被刻进金丹榜第三页", "你和宿敌握手言和，背后捅了一刀"],
      },
      nascent: {
        ...common,
        minAge: 80,
        maxAge: 90000,
        minRealm: 4,
        weight: 30,
        deathChance: 0.03,
        scenes: ["元婴法会", "星海裂缝", "上古战场", "界域通道", "万族议事厅", "九天宫阙", "诸天宝鉴前", "时空旋涡", "蛮荒大陆", "天劫雷池", "诸天图书馆", "万古道场", "无尽彼岸", "众神墓地", "天命算盘前", "三千大道殿"],
        actions: ["大能论道", "界域碰瓷", "法相显化", "万族围观", "天道试卷", "签订平行协议", "执掌一方", "镇压一界", "传道授业", "改写命格", "炼化星辰", "穿越古今", "建立宗派", "审判后辈"],
        outcomes: ["你开口论道，三界弹幕都在刷这把高端局", "法相太大，把隔壁剧情挤出屏幕", "万族都以为你有后手，其实你只有手汗", "天道试卷最后一题问左韩为什么路过", "你一句话定了一方界域的法理", "你伸手按住了一颗即将爆炸的星辰"],
      },
      zuohan: {
        ...common,
        actorOffset: 5,
        weight: 12,
        deathChance: 0.09,
        scenes: ["左韩天尊路过", "左韩天尊抬眼", "左韩天尊翻地图", "左韩天尊打喷嚏", "左韩天尊想起你"],
        actions: ["新手村灭世", "随机点名", "因果锁定", "小地图刷新", "终局预告"],
        outcomes: ["他疑惑反派为何要等主角成长，于是决定不等", "他只是路过，但路过这个动作本身很有伤害", "他看了你一眼，你的人生开始加载缓慢", "你试图装死，左韩天尊说演技不错，下次别演"],
        deaths: ["左韩天尊没有恶意，只是轻轻路过。你所在的小地图表示不接受这个轻轻。"],
        tags: [label, "左韩相关"],
      },
      cameo: {
        ...common,
        actorOffset: 0,
        minAge: 8,
        maxAge: 50000,
        weight: 8,
        scenes: ["跨书客栈", "天骄大会", "奇怪班级群", "诸天聊天频道", "退婚观众席"],
        actions: ["主角乱入", "名场面串台", "强者借路", "同款剧情", "热血旁白"],
        outcomes: ["你和{actor}对视三秒，发现对方也在等金手指到账", "{actor}建议你先苟住，你觉得很有道理", "你想复制名场面，但天道提示库存不足", "围观群众把你和{actor}剪成了对比视频"],
        tags: [label, "主角乱入"],
      },
      crossover: {
        ...common,
        minAge: 12,
        maxAge: 1200,
        weight: 22,
        scenes: ["霸总办公室", "重生回档点", "番茄热榜", "都市天台", "短剧片场"],
        actions: ["文体串台", "三章反杀", "霸总凝视", "重生选择", "热榜爆款"],
        outcomes: ["霸总说女人你成功引起了我的注意，你说自己其实是男修", "你重生到十分钟前，发现还是躲不开左韩", "番茄热榜给你安排了三行逆袭，你嫌太快", "短剧导演让你五秒内完成飞升，你选择报警"],
        tags: [label, "串台"],
      },
      artifact: {
        ...common,
        minAge: 5,
        maxAge: 20000,
        weight: 28,
        deathChance: 0.04,
        scenes: ["地摊破戒指", "无名古剑", "会骂人的丹炉", "残缺系统", "祖传铜镜"],
        actions: ["法宝认主", "老爷爷开机", "系统弹窗", "器灵吐槽", "隐藏任务"],
        outcomes: ["法宝认主前先看了你的气运，沉默得很大声", "老爷爷醒来第一句话是上链接", "系统弹窗写着正在降本增笑", "器灵说你不配，但语气很有情绪价值"],
        tags: [label, "法宝流"],
      },
      death: {
        ...common,
        minAge: 14,
        maxAge: 90000,
        weight: 8,
        deathChance: 0.10,
        scenes: ["天道补丁", "雷劫误投", "剧情边界", "野生旁白", "小地图坍塌"],
        actions: ["隐藏死法", "暴毙检测", "因果清算", "离谱下线", "随机盒饭"],
        outcomes: ["你听见旁白说这不合理，然后旁白也没了", "天道给你发来问卷：如何呢又能怎", "你觉得还能抢救，抢救按钮显示未解锁", "系统提示这是高质量死亡样例"],
        deaths: ["你触发隐藏死法。全场沉默，只有弹幕在刷已读乱回。"],
        tags: [label, "高危"],
      },
      finale: {
        ...common,
        minAge: 80,
        maxAge: 90000,
        minRealm: 5,
        weight: 10,
        deathChance: 0.07,
        scenes: ["飞升台", "天门之外", "终局棋盘", "三界尽头", "命运后台"],
        actions: ["飞升判定", "终局反转", "左韩决战", "天道面试", "大结局彩蛋"],
        outcomes: ["天门打开一半，里面传来左韩天尊的咳嗽声", "你准备飞升，天道问你是否确认提交本局", "终局棋盘上写着敬自己一杯", "你一脚迈进结局，发现还有付费番外"],
        tags: [label, "终局"],
      },
    };
    return map[key] || common;
  }

  function buildEffects(key, i) {
    const sign = i % 4 === 0 ? -1 : 1;
    const pulse = (i % 3) + 1;
    const map = {
      childhood: { body: sign, luck: sign > 0 ? 1 : -1, cultivation: pulse },
      initiation: { root: sign > 0 ? 1 : 0, insight: 1, cultivation: 2 + pulse, fame: i % 2 },
      mortal: { wealth: sign, luck: 1, stones: 1 + pulse, cultivation: pulse },
      qi: { cultivation: 4 + pulse, stones: sign > 0 ? 2 : -1, insight: i % 2 },
      foundation: { cultivation: 7 + pulse, body: sign, luck: sign > 0 ? 1 : -1, stones: 2 },
      golden: { cultivation: 10 + pulse, fame: 2, attention: i % 3 === 0 ? 1 : 0, luck: sign },
      nascent: { cultivation: 16 + pulse, fame: 3, attention: 1, insight: sign > 0 ? 1 : -1 },
      zuohan: { attention: 2 + (i % 3), luck: -1, cultivation: sign > 0 ? 2 : -2 },
      cameo: { fame: 2 + (i % 2), cultivation: 5 + pulse, luck: sign },
      crossover: { beauty: sign > 0 ? 1 : 0, fame: 2, wealth: sign, insight: 1 },
      artifact: { cultivation: 6 + pulse, luck: sign > 0 ? 2 : -1, stones: sign > 0 ? 4 : -2 },
      death: { luck: -2, body: -1, attention: i % 2 },
      finale: { cultivation: 22 + pulse, fame: 4, attention: 2 },
    };
    return map[key] || { cultivation: 1 };
  }

  function buildTitle(scene, action, i) {
    const pattern = cycle(TITLE_TEMPLATES, i);
    return pattern.replaceAll("{scene}", scene).replaceAll("{action}", action);
  }

  function buildIntro(key, scene, actor, action, meme, leftHanTier, i) {
    let bucket;
    if (key === "zuohan" && leftHanTier?.id === "rumor") bucket = INTRO_TEMPLATES.zuohan_rumor;
    else if (key === "zuohan" && leftHanTier?.id === "aftershock") bucket = INTRO_TEMPLATES.zuohan_aftershock;
    else if (key === "zuohan") bucket = INTRO_TEMPLATES.zuohan_body;
    else bucket = INTRO_TEMPLATES[key];
    if (!bucket || !bucket.length) bucket = INTRO_TEMPLATES.mortal;
    const tpl = cycle(bucket, i);
    return tpl
      .replaceAll("{scene}", scene)
      .replaceAll("{actor}", actor)
      .replaceAll("{action}", action)
      .replaceAll("{meme}", meme);
  }

  function generateEndings() {
    const groups = [
      ["death", 120, "死亡结局"],
      ["normal", 100, "普通修仙结局"],
      ["zuohan", 100, "左韩天尊结局"],
      ["cameo", 80, "主角乱入结局"],
      ["ascension", 50, "飞升终局"],
      ["hidden", 50, "隐藏彩蛋"],
    ];
    let id = 1;
    const pool = [];
    groups.forEach(([kind, count, label]) => {
      for (let i = 0; i < count; i += 1) {
        pool.push({
          id: id++,
          kind,
          name: endingName(kind, i),
          rarity: endingRarity(kind, i),
          text: endingText(kind, i, label),
        });
      }
    });
    return pool;
  }

  function endingName(kind, i) {
    const names = {
      death: [
        "天妒红颜", "左韩路过型受害者", "脆皮修士下线", "戒指老爷爷反客为主", "雷劫误投",
        "贫穷辟谷失败", "童年盒饭专业户", "丹田炸号纪念碑", "渡劫前一秒名场面", "妖兽零食",
        "短命剑修", "灵根过敏症患者", "气运黑洞代言人", "雷劫定向投放对象", "天道补丁实验体",
        "被自家法宝反噬", "心魔吞噬纪念", "走火入魔不归人", "瓶颈卡死殉道者", "魔尊小号牺牲品",
        "祭天专用模板", "因果报应名册首位", "三章内反杀失败", "境界塌缩集大成者", "宗门内斗烈士",
        "突破炸丹田", "禁地误入新人", "封魔术失败者", "心魔吞噬试用版", "天劫定位精准死法",
      ],
      normal: [
        "凡人也能苟", "炼气传说", "小镇做题修士", "散修小富即安", "秘境边缘人",
        "金丹不装了", "宗门档案管理员", "镇上灵泉店老板", "山下教书先生", "云海钓客",
        "三流剑客无名传", "守矿散修", "客栈老板归隐", "镖局退役老镖头", "山门看守长者",
        "灵田老农", "杂役堂总管", "外门长老退休工", "炼药房保管员", "藏书楼守夜人",
        "渡劫前一刻退休", "无名仙乡村长", "灵宠饲养员", "古道扫地僧",
      ],
      zuohan: [
        "左韩注视之人", "天尊小地图标记", "反派不等发育", "与左韩擦肩", "左韩天尊收藏品",
        "灭世余波", "天尊点名册首页", "左韩朋友圈访客", "被左韩备注的人",
        "左韩天尊路过截图", "天尊雷达常驻", "余波后遗症", "左韩门下走狗",
        "天尊背景板", "灭世预演演员", "左韩观察日志样本", "天尊午饭名单",
        "左韩日记常客", "余波周边产品", "天尊心情指标",
      ],
      cameo: [
        "萧炎同桌", "韩立跑路搭子", "叶凡邻座", "唐三草坪顾问", "诸天串台者",
        "番茄热榜路人", "石昊村口邻居", "罗峰星空联机队友", "牧尘旁边的学渣",
        "许七安同款打工人", "悟空陪练", "鸣人忍道辩友", "柯南私家咨询",
        "路飞海贼跟班", "龙猫森林管理员", "史努比同款躺平", "哆啦 A 梦道具回收员",
        "诸天奶茶店员",
      ],
      ascension: [
        "飞升成功但没完全成功", "天门打卡", "渡劫赢家", "三界破鼎者", "天道面试通过",
        "羽化登仙", "天门保安通融", "雷劫优等生", "飞升序章圆满", "天道编外人员",
        "九重天实习生", "天界 KPI 优秀员工", "六道轮回管理员", "南天门保安队长",
        "三界图书馆员", "上仙试用期", "天庭快递员",
      ],
      hidden: [
        "质疑天道成为天道", "短剧五秒飞升", "霸总误入修仙界", "电子榨菜仙尊", "尊嘟假嘟大帝",
        "AI 味太冲尊者", "降本增笑天尊", "情绪价值仙人", "助我破鼎大帝", "已读乱回真君",
        "城市不城市仙人", "包的仙尊", "绝绝子大帝", "yyds 真君",
        "如何呢又能怎天尊", "我嘞个豆道祖", "抽象到元婴出窍真人",
      ],
    };
    return cycle(names[kind], i);
  }

  function endingRarity(kind, i) {
    if (kind === "hidden" || kind === "ascension") return i % 3 === 0 ? "传说" : "稀有";
    if (kind === "zuohan") return i % 2 === 0 ? "稀有" : "史诗";
    if (kind === "death") return i % 5 === 0 ? "稀有" : "普通";
    return i % 4 === 0 ? "稀有" : "普通";
  }

  function endingText(kind, i, label) {
    const lines = {
      death: [
        "你的人生结束得非常突然，突然到旁白都以为自己卡了。最高境界是{realm}，死因是{reason}。",
        "你证明了一件事：修仙可以逆天，但不能逆左韩路过。标签记录员给你贴上了{tags}。",
        "你把属性点分配成了一种行为艺术，天道看完表示如何呢又能怎。",
      ],
      normal: [
        "你没有成为最强，但你活得像一篇稳定更新的长篇。最高境界{realm}，名声{fame}。",
        "你避开了大多数离谱剧情，偶尔被梗砸中，也能爬起来继续修。",
        "你的一生主打一个能活就行，凡人流作者看了都想给你递水。",
      ],
      zuohan: [
        "左韩天尊在你人生里出现了{leftHanCount}次。你能活到{age}岁，已经属于地图加载奇迹。",
        "你被左韩天尊标记过，但仍然留下了传说。小地图评价：这人命真硬。",
        "你终于明白，终极 Boss 最大的压迫感不是强，而是他真的会提前来。",
      ],
      cameo: [
        "你和{characters}产生了奇妙交集。诸天聊天频道认为你是本局最会串台的人。",
        "热门主角们陆续路过，你努力不被他们的主线余波震飞。",
        "你没有抢到主角光环，但成功蹭到了弹幕热度。",
      ],
      ascension: [
        "你抵达飞升门前，天道问你是否确认提交本局。你点了确认，然后听见左韩天尊在门后咳嗽。",
        "你渡过雷劫，踏出凡尘。弹幕齐刷：千百次练习只为这一刻。",
        "你飞升了。虽然飞升通道像临时搭的，但结果是真的。",
      ],
      hidden: [
        "你触发了隐藏路线。天道后台显示：这玩家不是来修仙的，是来测边界的。",
        "你的人生像一碗修仙、霸总、重生、番茄和抽象梗混合的电子榨菜。",
        "你质疑天道，理解天道，最后发现天道也在质疑你。",
      ],
    };
    return `${cycle(lines[kind], i)} · ${label}`;
  }

  function chooseEnding(kind = state.deathKind) {
    let endingKind = kind;
    if (!endingKind) endingKind = state.alive ? "normal" : "death";
    if (endingKind === "beauty" || endingKind === "poverty" || endingKind === "body" || endingKind === "breakthrough") endingKind = "death";

    // 飞升：寿元耗尽 + 化神以上，或 ascension 显式触发
    if (kind === "ascension" || endingKind === "ascension") return cycleEndingByKind("ascension");
    if (kind === "age" && state.realm >= 5) return cycleEndingByKind("ascension");

    // 隐藏结局：11 条触发路径（含早期 flag 因果）
    const hiddenTriggers = [
      state.stats.breakthroughs >= 7,
      state.attrs.beauty >= 18 && state.age >= 100,
      state.stats.leftHanBody >= 2 && state.alive,
      state.metCharacters.length >= 5,
      state.attention >= 30 && state.alive,
      state.tags.includes("霸总文") && state.tags.includes("重生文") && state.tags.includes("番茄流"),
      state.attention >= 18 && state.attrs.luck <= -2 && state.age >= 80,
      // 因果隐藏：童年见过左韩 + 飞升前还活着
      state.flags.zh_witnessed && state.realm >= 5,
      // 喝过左韩的酒 = 隐藏
      state.flags.zh_drank_with,
      // 早年因果回响 = 隐藏
      state.flags.karma_redeemed || state.flags.karma_brother,
      // 戒指反向收编 + 飞升序章 = 隐藏
      state.flags.ring_enslaved && state.stats.ascensionStage >= 2,
    ];
    if (hiddenTriggers.some(Boolean)) return cycleEndingByKind("hidden");

    // 左韩：必须被深度标记
    const leftHanQualified = endingKind === "zuohan"
      || state.stats.leftHanBody >= 1
      || state.attention >= 20
      || state.stats.leftHanAftershocks >= 3;
    if (leftHanQualified) return cycleEndingByKind("zuohan");

    // 主角乱入：门槛 ≥3 个角色
    if (state.metCharacters.length >= 3) return cycleEndingByKind("cameo");

    // 普通修仙：寿元耗尽 OR 死亡时年龄≥30且境界<化神（「过得普通也是一种修仙「）
    if (kind === "age" || (state.age >= 30 && state.realm < 5 && !state.alive)) {
      return cycleEndingByKind("normal");
    }

    // 兜底（多半是早夭/暴毙）
    return cycleEndingByKind(endingKind);
  }

  function cycleEndingByKind(endingKind) {
    let candidates = ENDINGS.filter((ending) => ending.kind === endingKind);
    if (!candidates.length) candidates = ENDINGS.filter((ending) => ending.kind === "death");
    if (!candidates.length) candidates = ENDINGS;
    // 反向加权：会话内抽中越多的结局，下次概率越低；从没抽到过的结局优先级最高
    const weights = candidates.map((e) => 1 / (1 + (endingPickCounts[e.id] || 0) * 1.6));
    const total = weights.reduce((a, b) => a + b, 0);
    let roll = Math.random() * total;
    for (let i = 0; i < candidates.length; i += 1) {
      roll -= weights[i];
      if (roll <= 0) {
        endingPickCounts[candidates[i].id] = (endingPickCounts[candidates[i].id] || 0) + 1;
        return candidates[i];
      }
    }
    const last = candidates[candidates.length - 1];
    endingPickCounts[last.id] = (endingPickCounts[last.id] || 0) + 1;
    return last;
  }

  function recordSessionCatalog(ending) {
    addUnique(sessionCatalog.endings, `${String(ending.id).padStart(3, "0")} ${ending.name}`);
    if (state.deathReason) addUnique(sessionCatalog.deaths, state.deathReason);
    activeRoutes()
      .map((route) => route.name)
      .forEach((name) => addUnique(sessionCatalog.routes, name));
  }

  function addUnique(list, value) {
    if (value && !list.includes(value)) list.push(value);
  }

  function activeRoutes() {
    return ROUTES
      .map((route) => ({ ...route, value: state.routes[route.id] || 0 }))
      .filter((route) => route.value > 0)
      .sort((a, b) => b.value - a.value);
  }

  function routePanel() {
    const routes = activeRoutes().slice(0, 4);
    if (!routes.length) return "";
    return `
      <section class="panel">
        <h2 class="panel-title">剧情线</h2>
        <div class="route-list">
          ${routes.map(routeProgress).join("")}
        </div>
      </section>
    `;
  }

  function routeProgress(route) {
    const stageIndex = clamp(route.value - 1, 0, route.stages.length - 1);
    const percent = Math.min(100, route.value * 20);
    return `
      <div class="route-item">
        <div class="route-head">
          <strong>${escapeHtml(route.name)}</strong>
          <span>${escapeHtml(route.stages[stageIndex])}</span>
        </div>
        <div class="bar route-bar"><i style="width:${percent}%"></i></div>
      </div>
    `;
  }

  function battleReportPanel() {
    const tags = summaryTags().slice(0, 6);
    return `
      <section class="panel report-card">
        <h2 class="panel-title">本局战报</h2>
        <div class="report-grid">
          <div><b>享年</b><span>${state.age} 岁</span></div>
          <div><b>最高境界</b><span>${realmName()}</span></div>
          <div><b>死因/终局</b><span>${escapeHtml(state.deathReason || "剧情收束")}</span></div>
          <div><b>左韩关系</b><span>${escapeHtml(leftHanRelation())}</span></div>
        </div>
        <p class="one-liner">${escapeHtml(oneLineReview())}</p>
        <div class="tag-list">${tags.map((tag) => `<span class="tag ${tagClass(tag)}">${escapeHtml(tag)}</span>`).join("")}</div>
        <button class="ghost copy-report" data-action="copy-report">复制战报</button>
      </section>
    `;
  }

  function catalogPanel() {
    return `
      <section class="panel">
        <h2 class="panel-title">本局图鉴</h2>
        <div class="catalog-grid">
          ${catalogColumn("见过结局", sessionCatalog.endings)}
          ${catalogColumn("见过死法", sessionCatalog.deaths)}
          ${catalogColumn("走过剧情线", sessionCatalog.routes)}
        </div>
      </section>
    `;
  }

  function catalogColumn(title, items) {
    const visible = items.slice(-5).reverse();
    return `
      <div class="catalog-column">
        <strong>${title}</strong>
        ${visible.length ? visible.map((item) => `<span>${escapeHtml(item)}</span>`).join("") : "<em>暂无</em>"}
      </div>
    `;
  }

  function leftHanRelation() {
    if (state.stats.leftHanBody) return `本体路过 ${state.stats.leftHanBody} 次`;
    if (state.stats.leftHanAftershocks) return `吃到余波 ${state.stats.leftHanAftershocks} 次`;
    if (state.stats.leftHanRumors) return `听过传闻 ${state.stats.leftHanRumors} 次`;
    return "暂未正面遭遇";
  }

  function oneLineReview() {
    if (state.deathKind === "zuohan" || state.stats.leftHanBody) return "你不是打不过左韩天尊，你是还没加载到能打他的版本。";
    if (state.deathKind === "beauty") return "颜值是点满了，防雷系统是一点没点。";
    if (state.metCharacters.length >= 2) return "你这局不像修仙，像诸天主角路演后台。";
    if (activeRoutes()[0]) return `主线味最重的是：${activeRoutes()[0].name}。`;
    if (state.stats.breakthroughs > 1) return "千百次练习只为这一刻，你真的练出来了一点东西。";
    return "这局主打一个随机应变，变得很随机。";
  }

  async function copyReport() {
    const text = reportText();
    try {
      await navigator.clipboard.writeText(text);
      showToast("📋 战报已复制，去贴给道友");
    } catch (error) {
      showToast("复制失败，已显示在天道框");
      const output = $("#heavenOutput");
      if (output) output.textContent = text;
    }
  }

  // Canvas 生成战报海报
  function generatePoster() {
    const W = 540, H = 960;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");

    // 背景（仿宣纸+墨色）
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#2c2014");
    bg.addColorStop(0.5, "#1e1812");
    bg.addColorStop(1, "#0a0706");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 外框
    ctx.strokeStyle = "#8b6a3a";
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.strokeStyle = "#f2b544";
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, W - 56, H - 56);

    ctx.textBaseline = "top";
    // 标题
    ctx.font = "bold 38px KaiTi, 楷体, sans-serif";
    ctx.fillStyle = "#f2b544";
    ctx.shadowColor = "#000"; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2;
    ctx.fillText("修 仙 重 开 模 拟 器", 60, 60);
    ctx.shadowBlur = 0;

    ctx.font = "16px KaiTi, 楷体, sans-serif";
    ctx.fillStyle = "#b09870";
    ctx.fillText("本局战报", 60, 108);

    // 道号 + 寿命大字
    ctx.fillStyle = "#f4e2a8";
    ctx.font = "bold 28px KaiTi, 楷体";
    ctx.fillText(`道号：${state.name || "无名"}`, 60, 150);
    ctx.font = "22px KaiTi, 楷体";
    ctx.fillText(`享年 ${state.age} 岁  ·  最高境界 ${realmName()}`, 60, 192);

    // 结局名
    const ending = state.ending?.name || "剧情收束";
    ctx.font = "bold 26px KaiTi, 楷体";
    ctx.fillStyle = "#d33d3d";
    ctx.fillText(`【${ending}】`, 60, 232);

    // 墓志铭
    if (state.epitaph) {
      ctx.font = "italic 14px KaiTi, 楷体";
      ctx.fillStyle = "#d9c685";
      wrapText(ctx, state.epitaph, 60, 280, W - 120, 22);
    }

    // 高光时刻区
    ctx.font = "bold 20px KaiTi, 楷体";
    ctx.fillStyle = "#5cc8c0";
    ctx.fillText("✦ 本局高光时刻 ✦", 60, 360);
    ctx.font = "14px KaiTi, 楷体";
    ctx.fillStyle = "#f4e2a8";
    const hls = (state.highlights || []).slice(-6).reverse();
    let y = 400;
    if (hls.length === 0) {
      ctx.fillStyle = "#888";
      ctx.fillText("（这一局过得平淡）", 60, y);
    } else {
      const ICONS = { main: "⚔", cameo: "🎭", breakthrough: "✨", savior: "⚡" };
      hls.forEach(h => {
        ctx.fillStyle = "#f2b544";
        ctx.fillText(ICONS[h.kind] || "·", 60, y);
        ctx.fillStyle = "#f4e2a8";
        ctx.fillText(`${h.age}岁`, 88, y);
        ctx.fillStyle = "#d9c685";
        wrapText(ctx, h.text, 138, y, W - 198, 22, 1);
        y += 32;
      });
    }

    // 关键词
    ctx.font = "bold 18px KaiTi, 楷体";
    ctx.fillStyle = "#b68cff";
    ctx.fillText("关键词", 60, 660);
    ctx.font = "14px KaiTi, 楷体";
    ctx.fillStyle = "#d9c685";
    const tags = summaryTags().slice(0, 6).join(" · ");
    wrapText(ctx, tags, 60, 690, W - 120, 22);

    // 锐评
    ctx.font = "italic 16px KaiTi, 楷体";
    ctx.fillStyle = "#fff4bf";
    wrapText(ctx, `「${oneLineReview()}」`, 60, 770, W - 120, 24);

    // 底部
    ctx.font = "12px KaiTi, 楷体";
    ctx.fillStyle = "#888";
    ctx.fillText("xiuxian-restart.pages.dev", 60, H - 60);
    ctx.fillStyle = "#b09870";
    ctx.font = "10px KaiTi";
    ctx.fillText("（截图分享你的修仙人生）", 60, H - 42);

    return canvas.toDataURL("image/png");
  }

  function wrapText(ctx, text, x, y, maxW, lineH, maxLines = 4) {
    const chars = text.split("");
    let line = "";
    let lines = 0;
    for (let i = 0; i < chars.length; i += 1) {
      const test = line + chars[i];
      const m = ctx.measureText(test);
      if (m.width > maxW && line) {
        ctx.fillText(line, x, y);
        line = chars[i];
        y += lineH;
        lines += 1;
        if (lines >= maxLines) return;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, x, y);
  }

  function showPoster() {
    const dataUrl = generatePoster();
    const box = $("#posterOutput");
    if (!box) return;
    box.innerHTML = `
      <div class="poster-wrap">
        <img src="${dataUrl}" alt="本局战报海报" />
        <p class="poster-hint">长按或右键图片 → 保存图片，分享给道友</p>
      </div>
    `;
    box.querySelector("img").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function reportText() {
    return [
      `《修仙重开模拟器》本局战报`,
      `道号：${state.name}`,
      `享年：${state.age} 岁`,
      `最高境界：${realmName()}`,
      `死因/终局：${state.deathReason || "剧情收束"}`,
      `左韩关系：${leftHanRelation()}`,
      `关键词：${summaryTags().slice(0, 8).join("、") || "无"}`,
      `锐评：${oneLineReview()}`,
    ].join("\n");
  }

  function statusPanel() {
    return `
      <section class="panel">
        <div class="status-strip">
          <div class="status-item"><b>年龄</b><span>${state.age}</span></div>
          <div class="status-item"><b>境界</b><span>${realmName()}</span></div>
          <div class="status-item"><b>寿元</b><span>${REALMS[state.realm].life}</span></div>
          <div class="status-item"><b>修为</b><span>${state.cultivation}/${REALMS[state.realm].threshold}</span></div>
          <div class="status-item"><b>灵石</b><span>${state.stones}</span></div>
          <div class="status-item"><b>左韩注视</b><span>${state.attention}</span></div>
        </div>
      </section>
      <section class="panel">
        <div class="stat-grid">
          ${ATTRS.map(([key, label]) => `<div class="stat-tile"><span class="stat-label">${label}</span><span class="stat-value">${state.attrs[key]}</span></div>`).join("")}
        </div>
      </section>
    `;
  }

  function resultPanel(result) {
    const showNarrator = result.category === "fated-main" && state.lastNarration;
    return `
      <section class="result-box fade-in">
        <strong>${escapeHtml(result.title)}</strong>
        <p class="result-copy">${escapeHtml(result.text)}</p>
        <div class="changes">
          ${result.changes.length ? result.changes.map((change) => `<span class="delta ${change.kind}">${escapeHtml(change.label)} ${escapeHtml(String(change.value))}</span>`).join("") : '<span class="delta">无明显变化</span>'}
        </div>
        ${result.savior ? `<div class="savior-banner">${escapeHtml(result.savior)}</div>` : ""}
        ${showNarrator ? `<div class="narrator-box" id="narratorBox">${escapeHtml(state.lastNarration)}</div>` : ""}
      </section>
    `;
  }

  function tagsPanel() {
    const tags = state.tags.slice(-14);
    return `
      <section class="panel">
        <h2 class="panel-title">本局标签</h2>
        <div class="tag-list">${tags.length ? tags.map((tag) => `<span class="tag ${tagClass(tag)}">${escapeHtml(tag)}</span>`).join("") : '<span class="empty">还没有离谱标签。</span>'}</div>
      </section>
    `;
  }

  function timelinePanel() {
    return `
      <section class="panel">
        <h2 class="panel-title">人生履历</h2>
        <div class="timeline">
          ${state.logs.length ? state.logs.slice(-18).reverse().map((log) => `<div class="log-item"><div class="log-age">${escapeHtml(log.age)}</div><div class="log-text">${escapeHtml(log.text)}</div></div>`).join("") : '<div class="empty">命运还没开始胡说。</div>'}
        </div>
      </section>
    `;
  }

  function talentCard(talent) {
    const sel = state.selectedTalents.includes(talent.id) ? " selected" : "";
    return `
      <button class="talent-card${sel}" data-talent="${talent.id}">
        <span class="talent-head">
          <span class="talent-name">${escapeHtml(talent.name)}</span>
          <span class="grade g${talent.grade}">${"★".repeat(talent.grade)}</span>
        </span>
        <span class="desc">${escapeHtml(talent.description)}</span>
        <span class="changes">${effectDeltas(talent.effects)}</span>
      </button>
    `;
  }

  function attrRow(key, label) {
    const value = state.attrs[key];
    const sliderMax = value + (20 - totalAttrPoints());
    return `
      <div class="attr-row">
        <strong>${label}</strong>
        <span class="attr-value" data-value="${key}">${value}</span>
        <input type="range" class="attr-slider" data-slider="${key}" min="0" max="${sliderMax}" value="${value}" />
        <button data-attr="${key}" data-step="-1">-</button>
        <button data-attr="${key}" data-step="1">+</button>
      </div>
    `;
  }

  function choiceCard(event) {
    const cat = event.leftHanTier?.id === "body" ? "zuohan-body" : event.category;
    const emoji = event.leftHanTier?.id === "body" ? "🔴" : (CHOICE_EMOJI[event.category] || "✦");
    return `
      <button class="choice-card" data-choice="${event.id}" data-cat="${cat}">
        <span class="choice-head">
          <span class="choice-title"><span class="choice-emoji">${emoji}</span>${escapeHtml(event.title)}</span>
          <span class="grade">${escapeHtml(event.categoryLabel.slice(0, 2))}</span>
        </span>
        <span class="choice-copy">${escapeHtml(event.text)}</span>
      </button>
    `;
  }

  function effectDeltas(effects) {
    return Object.entries(effects)
      .map(([key, value]) => {
        const label = attrLabel(key);
        const kind = value >= 0 ? "plus" : "minus";
        return `<span class="delta ${kind}">${escapeHtml(label)} ${value > 0 ? "+" : ""}${value}</span>`;
      })
      .join("");
  }

  async function requestHeaven() {
    const output = $("#heavenOutput");
    output.textContent = "天道正在翻你的黑历史。";
    const payload = {
      name: state.name,
      age: state.age,
      realm: realmName(),
      reason: state.deathReason,
      tags: summaryTags(),
      logs: state.logs.slice(-8),
      attrs: state.attrs,
    };
    try {
      const response = await fetch("/api/heaven-commentary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("bad response");
      const data = await response.json();
      output.textContent = data.text || localHeaven(payload);
    } catch (error) {
      output.textContent = localHeaven(payload);
    }
  }

  function localHeaven(payload) {
    const tag = cycle(payload.tags.length ? payload.tags : ["无标签修士"], payload.age);
    return `天道点评：${payload.name}这一生主打一个${tag}。最高境界${payload.realm}，结尾原因“${payload.reason || "强行收束"}”。建议下次少信路边戒指，多躲左韩天尊。`;
  }

  function snapshotStats() {
    return {
      ...state.attrs,
      cultivation: state.cultivation,
      stones: state.stones,
      fame: state.fame,
      attention: state.attention,
    };
  }

  function diffStats(before, after) {
    const changes = [];
    Object.keys(after).forEach((key) => {
      const diff = after[key] - before[key];
      if (!diff) return;
      changes.push({
        label: attrLabel(key),
        value: `${diff > 0 ? "+" : ""}${diff}`,
        kind: diff > 0 ? "plus" : "minus",
      });
    });
    return changes;
  }

  function attrLabel(key) {
    const found = ATTRS.find(([attr]) => attr === key);
    return found ? found[1] : EXTRA_LABELS[key] || key;
  }

  function realmName() {
    return REALMS[state.realm].name;
  }

  function nextAgeSpan() {
    const [min, max] = REALMS[state.realm].span;
    return randInt(min, max);
  }

  function randomName() {
    return cycle(RANDOM_SURNAMES, randInt(0, 999)) + cycle(RANDOM_NAMES, randInt(0, 999));
  }

  function openingComment() {
    if (state.attrs.beauty >= 16) return "颜值过高，建议远离天道审核";
    if (state.attrs.luck <= 1) return "气运低得很有创意";
    if (state.attrs.root >= 12) return "灵根像主角，但命格像配角";
    if (state.attrs.wealth >= 12) return "家底不错，适合被人借钱";
    return "平平无奇，但这年头平平无奇也可能三章起飞";
  }

  function fillEventResult(text, actor, meme) {
    return text.replaceAll("{actor}", actor).replaceAll("{meme}", meme);
  }

  function fillTemplate(text) {
    return text
      .replaceAll("{realm}", realmName())
      .replaceAll("{reason}", state.deathReason || "剧情收束")
      .replaceAll("{tags}", summaryTags().slice(0, 4).join("、") || "无标签")
      .replaceAll("{fame}", String(state.fame))
      .replaceAll("{leftHanCount}", String(state.stats.leftHanCount))
      .replaceAll("{age}", String(state.age))
      .replaceAll("{characters}", state.metCharacters.join("、") || "若干路人主角");
  }

  function summaryTags() {
    const talentTags = state.selectedTalents.flatMap((id) => getTalent(id).tags);
    const tags = [
      ...talentTags,
      ...state.tags,
      realmName(),
      state.deathReason,
      state.stats.leftHanCount ? "左韩目击者" : "",
      state.metCharacters.length ? "诸天串台" : "",
    ].filter(Boolean);
    return [...new Set(tags)].slice(0, 20);
  }

  function tagClass(tag) {
    if (/死亡|高危|左韩|天妒|贫穷|暴毙/.test(tag)) return "bad";
    if (/天才|欧皇|飞升|至尊|重瞳|传说|渡劫|主角/.test(tag)) return "rare";
    if (/炼气|筑基|金丹|元婴|化神|大乘|来财|情绪/.test(tag)) return "good";
    return "";
  }

  function getTalent(id) {
    return TALENTS.find((talent) => talent.id === id);
  }

  function addTags(tags) {
    tags.filter(Boolean).forEach((tag) => {
      if (!state.tags.includes(tag)) state.tags.push(tag);
    });
  }

  function rememberCharacter(name) {
    if (name && !state.metCharacters.includes(name)) state.metCharacters.push(name);
  }

  function logLine(age, text) {
    state.logs.push({ age, text });
  }

  const DEATH_TEXTS = {
    zuohan: [
      "左韩天尊路过得很轻，你死得很重。",
      "左韩天尊只是抬了抬眼，你就被抬走了。",
      "你不是被打死的，你是被注视死的。",
      "左韩天尊问了一句「这是谁」，你就再也回答不了了。",
      "左韩天尊伸了个懒腰，你被打散在空气里。",
      "你和左韩天尊只擦了半个肩，结果是另外那一半没保住。",
      "他没看你，但他经过的那阵风看了你。",
      "你以为自己藏得很好，左韩天尊默默给小地图加了标记。",
      "左韩天尊打了个喷嚏，你这一片山头都重新洗牌了。",
      "左韩天尊：「你叫啥来着？」你：「死。」",
      "你冲他大喊：「老子不怕你！」他点头：「不怕就好。」然后你不见了。",
      "左韩天尊翻了下你的人物档案，叹气：「这页删了吧。」",
      "你和左韩天尊隔着三千里对视。你输了。",
      "你给左韩天尊发了个表情包，他回复 666。但你已经不在了。",
      "左韩天尊路过时鞋带松了，蹲下系鞋带的瞬间踩平了你。",
      "你听见左韩天尊小声哼歌。歌词大意是：欢迎来到我的删除列表。",
    ],
    artifact: [
      "法宝认主失败，改成认你为材料。",
      "戒指老爷爷醒来发现你不太行，决定换个宿主。",
      "系统弹窗：宿主资格不足，已注销账号。",
      "器灵嫌弃地说了句包的，然后就把你包了。",
      "你按下确认键，结果确认的是退出登录。",
      "祖传铜镜照了你一眼，把你照没了。",
    ],
    death: [
      "你触发了隐藏死法，天道评价：这段很有节目效果。",
      "旁白还没读到你的名字，你已经被翻过页了。",
      "你成为本局最早的盒饭，弹幕表示节奏不错。",
      "你被一条隐藏 BUG 收走，天道连补丁都懒得发。",
      "你按 ESC 想退出，结果退出了人生。",
      "你站错了像素，剧情把你当成了背景擦掉了。",
      "天道点开你的人物档案，叹了口气，把档案合上。",
      "你成了官方运营都救不回的卡牌。",
      "你试图复读，但复读机选择了你。",
      "你说了一句这不科学，然后人就没了。",
      "你被划进了灰度发布名单，运气不好，灰掉了。",
      "你接到一个匿名电话，电话挂了，你也挂了。",
      "你掉进自动备份失败的瞬间。",
      "你的人生进度条到一半，进度条自己跑了。",
      "你触发了那种连开发者都忘了的边界 BUG。",
      "你和命运打了个平手，但命运可以加时。",
      "你被一阵风带走，风也没回头。",
      "你在原地多站了三秒，天道把你优化掉了。",
      "你拍了拍胸口确认还活着，胸口拒绝配合。",
      "你说我命由我，旁白说不由你。",
    ],
    childhood: [
      "你还没学会说完整的话，剧情就告一段落了。",
      "你试着对天道挥了挥手，被当成了告别。",
      "村里人记得你笑过一次，仅此而已。",
      "你刚学会喊「娘」，剧情就把「娘」哭成了「凉」。",
      "你被一只本地土鸡盯了三天，第四天没起床。",
      "你的童年很短，短到只够村里人讲一遍。",
    ],
    initiation: [
      "你拜师没拜成，先把命交了。",
      "你的报名表还压在长老桌上，本人已经下了考核台。",
      "你成为外门弟子最短续约纪录的保持者。",
      "你刚领到杂役服，杂役服直接被传给了下一位。",
      "你想问师父有没有五险一金，话没说完先有了寿险。",
    ],
    mortal: [
      "你死在街口，说书人正好缺一个新段子。",
      "你被一笔糊涂账带走，至今没人记得你借了什么。",
      "你倒在镖局门口，镖师把你也算进了行李。",
      "你被江湖传闻当成主角带走了。",
      "你点了一杯灵泉拿铁，拿铁结账时只剩个杯子。",
    ],
    qi: [
      "你打坐时入定太深，再也没出来。",
      "你练气练成了散气，散得很彻底。",
      "你和妖兽对线一局，妖兽赢了。",
      "你顺手吐了口纳，把自己一并吐出去了。",
      "你修出了气感，气感不修你。",
    ],
    foundation: [
      "你筑基没成功，反而把自己拆基了。",
      "雷劫只擦了一下，你就成了焦炭。",
      "你以为自己看穿了陷阱，陷阱看穿了你。",
      "你筑了基，基没承住你。",
      "你和古修留言比谁活得久，古修赢了。",
    ],
    golden: [
      "你的金丹成了别人的战利品。",
      "天榜留名当天，仇家也来留名。",
      "你刚说我命由我，命就由别人了。",
      "金丹异象太美，引来了一颗陨石。",
      "你的金丹在拍卖会上拍出了高价，可惜不是你拍的。",
    ],
    nascent: [
      "你的元婴出了壳，没回来。",
      "你以为是论道，结果是宣判。",
      "你的法相被天道打回原形，包括本体。",
      "你站上元婴法会的台子，台子代表你下台。",
      "你的元婴和神识分手了，谁也找不到对方。",
    ],
    finale: [
      "你在飞升前一步被收回。",
      "终局棋盘上你那枚棋子被抹掉了。",
      "你看到了天门里面，天门发现了，关上了。",
      "你伸手够到了那条线，那条线伸手挪开了。",
    ],
  };

  function deathTextFor(category) {
    const pool = DEATH_TEXTS[category] || DEATH_TEXTS.death;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function weightedPick(items) {
    const total = items.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * total;
    for (const item of items) {
      roll -= item.weight;
      if (roll <= 0) return item.event;
    }
    return items[items.length - 1].event;
  }

  function cycle(list, index) {
    return list[Math.abs(index) % list.length];
  }

  function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function $(selector) {
    return document.querySelector(selector);
  }

  function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  }
})();
