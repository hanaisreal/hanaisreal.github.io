const BASE = process.env.PUBLIC_URL;

export interface CollectionItem {
  korean: string;
  original: string;
  language: string;
  description: string;
  src?: string;
}

export const collections: CollectionItem[] = [
  {
    korean: "러지셩베이",
    original: "乐极生悲",
    language: "chinese",
    description: "커다란 기쁨을 맛본 뒤에 찾아오는 텅 빈 기분.",
    src: `${BASE}/pictures/collections/lejieshengbei.jpg`,
  },
  {
    korean: "헤젤리흐",
    original: "gezellig",
    language: "dutch",
    description:
      "사랑하는 이들과 함께 보내는 시간이 만들어 내는 감각. 자신보다 더 광장한 것에 속해 있다는 기분. 공원에서 즐기는 피크닉, 보트 타기, 카페에서 즐기는 데이트…… 그 어떤 일에도 헤젤리흐를 느낄 수 있다.",
    src: `${BASE}/pictures/collections/gezellig.jpg`,
  },
  {
    korean: "아윗바이언",
    original: "uitwaaien",
    language: "dutch",
    description: "산책을 하면서 여러 가지 불필요한 생각을 거두고 머리를 비우기.",
    src: `${BASE}/pictures/collections/uitwaaien.jpg`,
  },
  {
    korean: "프릴루풋슬리브",
    original: "friluftsliv",
    language: "norwegian",
    description:
      "신선한 공기를 마시며 자연에 머무르겠다는 결심. 세상과 자신의 조화를 느끼게 해 준다.",
    src: `${BASE}/pictures/collections/friluftsliv.jpg`,
  },
  {
    korean: "피엘반트",
    original: "fjellvant",
    language: "norwegian",
    description: "산길을 가는 습관. 등산은 목표를 찾아 주고 육체 활동은 기쁨을 가져다준다.",
    src: `${BASE}/pictures/collections/fjellvant.jpg`,
  },
  {
    korean: "패이스코스",
    original: "peiskos",
    language: "norwegian",
    description: "타닥거리는 모닥불 앞에 앉아 따뜻하게 즐길 때 느끼는 포근함.",
    src: `${BASE}/pictures/collections/peiskos.jpg`,
  },
  {
    korean: "에테르포클록스카프",
    original: "etterpåklokskap",
    language: "norwegian",
    description: "실수로부터 얻은 지식.",
    src: `${BASE}/pictures/collections/etterpaaklokskap.jpg`,
  },
  {
    korean: "르트루바유",
    original: "retrouvailles",
    language: "french",
    description:
      "서로를 다시 찾는 일. 오랜 시간 떨어져 지내다 다시 만났을 때 느끼는 기쁨. 사람과의 관계뿐 아니라 좋아하는 장소로 되돌아오는 일도 포함한다.",
    src: `${BASE}/pictures/collections/retrouvailles.jpg`,
  },
  {
    korean: "이키가이",
    original: "生き甲斐",
    language: "japanese",
    description: "매일 아침 당신을 눈뜨게 하는 삶의 의미.",
    src: `${BASE}/pictures/collections/ikigai.jpg`,
  },
  {
    korean: "고모레비",
    original: "木漏れ日",
    language: "japanese",
    description: "나뭇잎 사이로 비치는 햇살. 그리고 그 햇살을 바라보며 느끼는 행복.",
    src: `${BASE}/pictures/collections/komorebi.jpg`,
  },
  {
    korean: "아운",
    original: "阿吽",
    language: "japanese",
    description: "가까운 친구끼리 아무 말 없이도 서로 이해하는 것.",
    src: `${BASE}/pictures/collections/aun.jpg`,
  },
  {
    korean: "고이노요칸",
    original: "恋の予感",
    language: "japanese",
    description: "사랑의 예감. 첫 만남에서 피할 수 없는 사랑이라고 느끼는 것.",
    src: `${BASE}/pictures/collections/koinoyokan.jpg`,
  },
  {
    korean: "비비르 알 디아",
    original: "vivir al día",
    language: "spanish",
    description:
      "가장 중요한 것은 지금 일어나는 일이기에 오늘에 충실하기. 감정을 억누르지 말고 웃고 싶으면 웃고, 울고 싶으면 울기.",
    src: `${BASE}/pictures/collections/vivir-al-dia.jpg`,
  },
  {
    korean: "소브레메사",
    original: "sobremesa",
    language: "spanish",
    description:
      "함께 식사를 마친 뒤에 아무도 자리를 뜨지 않고 빈 접시를 앞에 둔 채 이야기를 나누는 시간.",
    src: `${BASE}/pictures/collections/sobremesa.jpg`,
  },
  {
    korean: "바실란도",
    original: "vacilando",
    language: "spanish",
    description: "목적지에 다다르는 것보다 목적지로 가는 과정이 더 중요한 여정.",
    src: `${BASE}/pictures/collections/vacilando.jpg`,
  },
];

export const getLanguages = (): string[] =>
  ["all", ...Array.from(new Set(collections.map(c => c.language)))];
