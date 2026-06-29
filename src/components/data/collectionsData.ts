const BASE = process.env.PUBLIC_URL;

export interface CollectionItem {
  kind?: 'word' | 'activity' | 'poetry' | 'reference';
  korean: string;
  original: string;
  language: string;
  keywordLabel?: string;
  cardLabel?: string;
  cardLabelEn?: string;
  description: string;
  descriptionEn?: string;
  src?: string;
  gallery?: string[];
  meta?: string;
  metaEn?: string;
  glance?: string;
  glanceEn?: string;
  curatorNote?: string;
  curatorNoteEn?: string;
  source?: string;
  sourceEn?: string;
  href?: string;
}

export const poetryProjects: CollectionItem[] = [
  {
    kind: 'poetry',
    korean: "대마리 시 번역",
    original: "Daemari Translation Archive",
    language: "poetry",
    cardLabel: "번역 아카이브",
    cardLabelEn: "translation archive",
    meta: "2020.07 · 정춘근 · 대마리, 지뢰꽃마을",
    metaEn: "July 2020 · Jeong Choon-geun · Daemari, The Village of Landmine Flower",
    description:
      "2020년 7월, 정춘근 시집 『대마리, 지뢰꽃마을』 속 두 편의 시를 번역하며 남긴 작은 번역 아카이브.",
    descriptionEn:
      "A small translation archive built around two poems I translated in July 2020 from Jeong Choon-geun's Daemari, The Village of Landmine Flower.",
    glance: "시 번역, 장소, 기억에 대한 개인 아카이브.",
    glanceEn: "A small archive of poetry translation, place, and memory.",
    curatorNote:
      "번역을 통해 장소의 공기와 정서를 얼마나 옮길 수 있는지 궁금해서 시작했던 작업이다. 대마리는 철원의 실제 마을이고, 시집은 분단과 지뢰의 긴장이 남아 있는 풍경을 계속 돌아본다.",
    curatorNoteEn:
      "I started this to see how much translation could hold onto a place's atmosphere as well as its meaning. Daemari is a real village in Cheorwon, and the collection keeps returning to its landscape, division, and the quiet tension of landmine-marked borders.",
    source: "정춘근, 『대마리, 지뢰꽃마을』",
    sourceEn: "Jeong Choon-geun, Daemari, The Village of Landmine Flower",
  },
];

export const collections: CollectionItem[] = [
  {
    kind: 'word',
    korean: "러지셩베이",
    original: "乐极生悲",
    language: "chinese",
    description: "커다란 기쁨을 맛본 뒤에 찾아오는 텅 빈 기분.",
    descriptionEn: "The hollow feeling that follows an intense burst of joy.",
    src: `${BASE}/pictures/collections/lejieshengbei.jpg`,
  },
  {
    kind: 'word',
    korean: "헤젤리흐",
    original: "gezellig",
    language: "dutch",
    description:
      "사랑하는 이들과 함께 보내는 시간이 만들어 내는 감각. 자신보다 더 광장한 것에 속해 있다는 기분. 공원에서 즐기는 피크닉, 보트 타기, 카페에서 즐기는 데이트…… 그 어떤 일에도 헤젤리흐를 느낄 수 있다.",
    descriptionEn: "The warm sense of belonging that comes from time spent with loved ones — the feeling of being part of something larger than yourself. A picnic, a boat ride, a café date: gezellig can be found anywhere.",
    src: `${BASE}/pictures/collections/gezellig.jpg`,
  },
  {
    kind: 'word',
    korean: "아윗바이언",
    original: "uitwaaien",
    language: "dutch",
    description: "산책을 하면서 여러 가지 불필요한 생각을 거두고 머리를 비우기.",
    descriptionEn: "Clearing your head by taking a walk — letting unnecessary thoughts fall away as you move through the air.",
    src: `${BASE}/pictures/collections/uitwaaien.jpg`,
  },
  {
    kind: 'word',
    korean: "프릴루풋슬리브",
    original: "friluftsliv",
    language: "norwegian",
    description:
      "신선한 공기를 마시며 자연에 머무르겠다는 결심. 세상과 자신의 조화를 느끼게 해 준다.",
    descriptionEn: "The commitment to stay in nature, breathing fresh air. It brings a sense of harmony between yourself and the world.",
    src: `${BASE}/pictures/collections/friluftsliv.jpg`,
  },
  {
    kind: 'word',
    korean: "피엘반트",
    original: "fjellvant",
    language: "norwegian",
    description: "산길을 가는 습관. 등산은 목표를 찾아 주고 육체 활동은 기쁨을 가져다준다.",
    descriptionEn: "The habit of walking mountain paths. Hiking gives you a goal; the physical effort brings its own joy.",
    src: `${BASE}/pictures/collections/fjellvant.jpg`,
  },
  {
    kind: 'word',
    korean: "패이스코스",
    original: "peiskos",
    language: "norwegian",
    description: "타닥거리는 모닥불 앞에 앉아 따뜻하게 즐길 때 느끼는 포근함.",
    descriptionEn: "The coziness of sitting by a crackling fire, soaking in its warmth.",
    src: `${BASE}/pictures/collections/peiskos.jpg`,
  },
  {
    kind: 'word',
    korean: "에테르포클록스카프",
    original: "etterpåklokskap",
    language: "norwegian",
    description: "실수로부터 얻은 지식.",
    descriptionEn: "Knowledge gained from mistakes — wisdom that only arrives after the fact.",
    src: `${BASE}/pictures/collections/etterpaaklokskap.jpg`,
  },
  {
    kind: 'word',
    korean: "르트루바유",
    original: "retrouvailles",
    language: "french",
    description:
      "서로를 다시 찾는 일. 오랜 시간 떨어져 지내다 다시 만났을 때 느끼는 기쁨. 사람과의 관계뿐 아니라 좋아하는 장소로 되돌아오는 일도 포함한다.",
    descriptionEn: "The joy of finding each other again — the happiness felt when reuniting after a long separation. It applies not only to people but to returning to a beloved place.",
    src: `${BASE}/pictures/collections/retrouvailles.jpg`,
  },
  {
    kind: 'word',
    korean: "이키가이",
    original: "生き甲斐",
    language: "japanese",
    description: "매일 아침 당신을 눈뜨게 하는 삶의 의미.",
    descriptionEn: "The reason you get out of bed each morning — your sense of purpose.",
    src: `${BASE}/pictures/collections/ikigai.jpg`,
  },
  {
    kind: 'word',
    korean: "고모레비",
    original: "木漏れ日",
    language: "japanese",
    description: "나뭇잎 사이로 비치는 햇살. 그리고 그 햇살을 바라보며 느끼는 행복.",
    descriptionEn: "Sunlight filtering through leaves — and the quiet happiness of watching it.",
    src: `${BASE}/pictures/collections/komorebi.jpg`,
  },
  {
    kind: 'word',
    korean: "아운",
    original: "阿吽",
    language: "japanese",
    description: "가까운 친구끼리 아무 말 없이도 서로 이해하는 것.",
    descriptionEn: "The wordless mutual understanding between close friends.",
    src: `${BASE}/pictures/collections/aun.jpg`,
  },
  {
    kind: 'word',
    korean: "고이노요칸",
    original: "恋の予感",
    language: "japanese",
    description: "사랑의 예감. 첫 만남에서 피할 수 없는 사랑이라고 느끼는 것.",
    descriptionEn: "A premonition of love — the feeling upon a first meeting that falling for this person is inevitable.",
    src: `${BASE}/pictures/collections/koinoyokan.jpg`,
  },
  {
    kind: 'word',
    korean: "비비르 알 디아",
    original: "vivir al día",
    language: "spanish",
    description:
      "가장 중요한 것은 지금 일어나는 일이기에 오늘에 충실하기. 감정을 억누르지 말고 웃고 싶으면 웃고, 울고 싶으면 울기.",
    descriptionEn: "Living fully in the present, because what matters most is what's happening now. Don't suppress your feelings — laugh when you want to laugh, cry when you need to cry.",
    src: `${BASE}/pictures/collections/vivir-al-dia.jpg`,
  },
  {
    kind: 'word',
    korean: "소브레메사",
    original: "sobremesa",
    language: "spanish",
    description:
      "함께 식사를 마친 뒤에 아무도 자리를 뜨지 않고 빈 접시를 앞에 둔 채 이야기를 나누는 시간.",
    descriptionEn: "The time after a shared meal when no one gets up to leave — sitting together with empty plates, still talking.",
    src: `${BASE}/pictures/collections/sobremesa.jpg`,
  },
  {
    kind: 'word',
    korean: "바실란도",
    original: "vacilando",
    language: "spanish",
    description: "목적지에 다다르는 것보다 목적지로 가는 과정이 더 중요한 여정.",
    descriptionEn: "A journey where the process of getting there matters more than arriving at the destination.",
    src: `${BASE}/pictures/collections/vacilando.jpg`,
  },
];

export const communityActivities: CollectionItem[] = [
  {
    kind: 'activity',
    korean: "캠퍼스 & 관악산 플로깅",
    original: "Campus & Gwanaksan Plogging",
    language: "community",
    meta: "2026.05.19 · Seoul National University & Gwanaksan",
    metaEn: "May 19, 2026 · Seoul National University & Gwanaksan",
    description:
      "서울대학교와 관악산 일대에서 쓰레기를 수거하며, 지역 사회와 함께 환경 지속가능성을 실천한 플로깅 활동.",
    descriptionEn:
      "Collected litter around Seoul National University and Gwanaksan while promoting environmental sustainability through community volunteering.",
    glance: "지역 돌봄, 지속가능성, 다문화 커뮤니티 활동.",
    glanceEn: "A local thread of care, sustainability, and multicultural community work.",
    src: `${BASE}/pictures/community/shanum-plogging-forest.webp`,
    gallery: [
      `${BASE}/pictures/community/shanum-plogging-forest.webp`,
      `${BASE}/pictures/community/shanum-plogging-gate.webp`,
    ],
    curatorNote:
      "서울대학교 사회적 책임 다문화 봉사 동아리 샤눔에서 진행한 활동이다. 지역 안에서 지속가능성과 돌봄을 함께 실천하는 방식에 더 가깝다.",
    curatorNoteEn:
      "This was organized through SHANUM, the multicultural volunteer society for social responsibility at Seoul National University. For me, it sits within a broader thread of local care, shared responsibility, and multicultural community work.",
    source: "서울대학교 샤눔 다문화 봉사 활동",
    sourceEn: "Volunteer at SHANUM Multicultural Society for Social Responsibility at Seoul National University",
  },
];

export const referenceProjects: CollectionItem[] = [
  {
    kind: 'reference',
    korean: "Douglas Engelbart",
    original: "Douglas Engelbart",
    language: "reference",
    keywordLabel: "Engelbart",
    cardLabelEn: "augmenting intellect",
    meta: "1962 · Augmenting Human Intellect",
    metaEn: "1962 · Augmenting Human Intellect",
    description:
      "컴퓨터를 단순한 자동화 기계가 아니라 인간의 지적 능력과 협업 능력을 확장하는 도구로 보았던 관점으로 자주 돌아가게 된다.",
    descriptionEn:
      "I keep returning to Engelbart's idea that computers should augment human intellect and collective problem-solving rather than simply automate tasks.",
    glance: "\"augmenting human intellect\"라는 말이 내가 도구를 보는 기준이 된다.",
    glanceEn:
      "\"Augmenting human intellect\" is one of the phrases I keep using to judge what a tool is really helping people do.",
    curatorNote:
      "내게 남는 것은 발명품 자체보다도, 컴퓨팅이 사람을 더 잘 생각하게 하고 더 잘 함께 일하게 해야 한다는 전제다. 그래서 어떤 시스템을 볼 때도 결과를 대신 만들어 주는지를 넘어서, 이해와 협업의 능력을 실제로 키워 주는지를 보게 된다.",
    curatorNoteEn:
      "What stays with me is not only the artifacts he built, but the premise behind them: computing should increase human capability. It keeps pushing me to ask whether a system helps people see more clearly, coordinate better, and build understanding over time.",
    source: "Douglas Engelbart, Augmenting Human Intellect: A Conceptual Framework",
    sourceEn: "Douglas Engelbart, Augmenting Human Intellect: A Conceptual Framework",
    href: "https://www.dougengelbart.org/pubs/papers/scanned/Doug_Engelbart-AugmentingHumanIntellect.pdf",
  },
  {
    kind: 'reference',
    korean: "Alan Kay",
    original: "Alan Kay",
    language: "reference",
    keywordLabel: "Alan Kay",
    cardLabelEn: "dynamic media",
    meta: "1977 · Personal Dynamic Media",
    metaEn: "1977 · Personal Dynamic Media",
    description:
      "컴퓨터를 정보를 전달하는 채널이 아니라, 사람이 생각하고 배우고 실험할 수 있는 'personal dynamic media'로 본 관점이 오래 남는다.",
    descriptionEn:
      "I keep returning to Alan Kay's view of the computer as personal dynamic media: a medium for thought, learning, and experimentation rather than mere delivery.",
    glance: "\"personal dynamic media\"와 생각을 바깥으로 구체화하는 인터페이스에 대한 관점.",
    glanceEn:
      "\"Personal dynamic media\" and the idea that external media can materialize thought keep shaping how I imagine interfaces.",
    curatorNote:
      "내게 영향을 주는 것은 컴퓨터를 단순히 정보를 보여 주는 창이 아니라, 사람이 사고를 바깥으로 펼치고 다시 다루게 하는 매체로 본 점이다. 그래서 인터페이스를 설계할 때도 소비보다 탐색, 학습, 실험의 공간으로 보게 된다.",
    curatorNoteEn:
      "What influences me most is the shift in perspective: the computer is not just a channel for content, but a medium people can think in. That keeps pulling me toward interfaces that support exploration, learning, and reshaping ideas instead of passive consumption.",
    source: "Alan Kay and Adele Goldberg, Personal Dynamic Media",
    sourceEn: "Alan Kay and Adele Goldberg, Personal Dynamic Media",
    href: "https://augmentingcognition.com/assets/Kay1977.pdf",
  },
  {
    kind: 'reference',
    korean: "Bret Victor",
    original: "Bret Victor",
    language: "reference",
    keywordLabel: "Bret Victor",
    cardLabelEn: "thinking tools",
    meta: "2013 · Media for Thinking the Unthinkable",
    metaEn: "2013 · Media for Thinking the Unthinkable",
    description:
      "표현 방식 자체가 사고를 바꾼다는 점, 그리고 'media are our thinking tools'라는 관점 때문에 계속 돌아보게 되는 작업이다.",
    descriptionEn:
      "I keep returning to Bret Victor's claim that media are our thinking tools, and that better representations can change what we are able to understand.",
    glance: "\"media are our thinking tools\"라는 문장이 표현과 이해의 관계를 계속 다시 보게 만든다.",
    glanceEn:
      "\"Media are our thinking tools\" keeps me focused on how representation shapes understanding.",
    curatorNote:
      "내게 남는 것은 도구를 더 예쁘게 만드는 문제가 아니라, 무엇을 어떻게 보이게 하느냐가 곧 사고의 범위를 바꾼다는 점이다. 그래서 나는 즉각적인 피드백, 여러 표현 방식의 연결, 사용자가 자기 해석을 눈앞에서 다룰 수 있는 시스템에 끌린다.",
    curatorNoteEn:
      "What stays with me is the idea that better tools are not only smoother tools; they are better ways of seeing. It keeps me drawn to immediate feedback, linked representations, and systems that let people manipulate their own interpretations in front of them.",
    source: "Bret Victor, Media for Thinking the Unthinkable",
    sourceEn: "Bret Victor, Media for Thinking the Unthinkable",
    href: "https://worrydream.com/",
  },
  {
    kind: 'reference',
    korean: "필 앳 홈",
    original: "Feel at Home",
    language: "reference",
    keywordLabel: "Feel at Home",
    meta: "2025 · Ori Ease · 인터랙티브 설치",
    metaEn: "2025 · Ori Ease · interactive installation",
    src: `${BASE}/pictures/references/feel-at-home-ori-ease-screenshot.jpg`,
    description:
      "Ori Ease의 작업으로, 냉장고라는 일상적 사물을 통해 서로 다른 삶과 집, 이야기를 들여다보게 하는 인터랙티브 설치.",
    descriptionEn:
      "A project by Ori Ease that lets the viewer peek into different lives, homes, and stories through an everyday object: a fridge.",
    glance: "집, 이야기, 일상적 사물을 통해 사람을 바라보는 방식에 대한 레퍼런스.",
    glanceEn: "Screenshot from Ori Ease's project page, saved here as a reference rather than my own work.",
    curatorNote:
      "내 작업이 아니라, 내가 좋아하고 자주 돌아보는 레퍼런스다. 어떤 집에는 편안함을 느끼고 어떤 집에는 낯섦을 느끼게 만드는 방식이 오래 남는다.",
    curatorNoteEn:
      "This is not my project. This image is a screenshot from Ori Ease's Feel at Home project page, and I keep it here because I return to the way it reveals different homes and stories through a fridge, and to the question of when a place feels welcoming or unfamiliar.",
    source: "Ori Ease · Feel at Home 스크린샷",
    sourceEn: "Screenshot from Ori Ease · Feel at Home",
    href: "https://oriease.com/feel-at-home",
  },
];

export const getLanguages = (): string[] =>
  ["all", ...Array.from(new Set(collections.map(c => c.language)))];
