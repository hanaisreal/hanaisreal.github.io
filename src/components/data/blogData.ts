export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  published: boolean;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-research-trajectories-2024",
    title: "The Trajectory of AI Research",
    subtitle: "Economic Structures, Human Agency, and the Next Fifty Years",
    date: "2024-12-05",
    readTime: "12 min read",
    category: "AI Research",
    tags: ["AI", "Research", "Human-Computer Interaction", "Ethics", "Agency"],
    excerpt: "AI research unfolds within economic structures that reward specific forms of capability while obscuring others. Every model trained carries implicit decisions about what intelligence means and what thinking should accomplish.",
    content: `AI research unfolds within economic structures that reward specific forms of capability while obscuring others. Every model trained, every benchmark achieved, every deployment celebrated carries implicit decisions about what intelligence means and what thinking should accomplish. The question is not whether AI systems become more capable—capability advances through sheer computational investment—but whether this capability serves human reasoning or supplants it. Current trajectories suggest we are building systems optimized for replacement rather than collaboration, for automation rather than augmentation, for efficiency rather than understanding.

To understand where AI research is headed, we must examine not just technical architectures but the structural forces shaping what gets built. Three dynamics warrant particular attention: the valorization of performance, the automation of judgment, and the externalization of consequence.

**Performance becomes the measure of progress.** AI research increasingly optimizes for measurable outputs: accuracy rates, response speeds, task completion metrics. These numbers are not neutral—they encode specific assumptions about what matters. A system that generates text faster is not necessarily one that helps humans think more deeply. A model that answers more questions correctly is not necessarily one that preserves human agency in reasoning. Yet performance metrics create their own gravity: they are legible, comparable, fundable. Research that improves benchmark scores attracts resources; research that questions whether benchmarks capture what matters struggles for legitimacy. The desire to advance AI becomes channeled into advancing scores, not because researchers believe scores capture intelligence, but because scores offer the only path between relevance and obsolescence.

**Judgment becomes automated through training.** AI systems learn what to value by absorbing patterns from data generated under existing conditions. A model trained on human decisions inherits the biases, shortcuts, and contextual assumptions embedded in those decisions. It learns not just to predict but to normalize—to treat historical patterns as natural law. When such systems are deployed to guide human choices, they don't merely assist judgment; they encode and enforce particular frameworks of what constitutes good judgment. The person using the system experiences this not as constraint but as enhancement, not as replacement but as partnership. Yet with each delegation of judgment to the system, the capacity to exercise independent judgment atrophies. We are building AI that makes thinking feel easier by making certain forms of thinking unnecessary.

**Consequences are displaced across time and population.** The impacts of AI systems are not evenly distributed. Those who build the systems experience their benefits most immediately: productivity gains, novel capabilities, intellectual excitement. Those who encounter the systems in contexts of use—students, workers, decision-makers—experience effects that compound slowly: subtle erosions of skill, gradual dependencies on assistance, increasing difficulty distinguishing system output from personal understanding. These impacts remain difficult to measure because they manifest across years, not quarters; across populations, not individuals; in capacities not developed rather than capabilities actively lost. By the time we recognize the cost, the systems are already infrastructure. By the time we understand what we've traded, the trade is already complete.

These are not problems of bad actors or flawed designs. They are structural features of how AI research happens: within market competition, funded by growth expectations, evaluated through proxy metrics, built by people whose careers depend on demonstrating progress within existing frameworks. The pressures are not invisible—we know funding flows toward deployable products, that impact requires scale, that scale requires simplification, that simplification requires choosing what complexity to preserve and what to discard. But knowing the pressures does not make them escapable.

**What, then, is at stake in the next five years? The next fifty?**

The immediate horizon—five years—will determine whether AI becomes infrastructure or remains tool. If current trajectories persist, we will see systems increasingly embedded in contexts where humans cannot easily opt out: educational platforms that mediate learning, workplace assistants that structure professional development, recommendation engines that curate information access. These systems will work, in the limited sense that they will produce outputs users find helpful. But working is not the same as preserving the conditions for human capability. A student who receives AI-generated essay feedback learns to satisfy the AI's patterns, not to develop critical judgment. A worker who relies on AI-generated analysis learns to recognize plausible output, not to conduct reasoning. These are not failures of the technology—the technology accomplishes exactly what it was designed to accomplish. They are failures of design intent, shaped by economic pressures that reward adoption over development, engagement over understanding, convenience over capacity.

The longer horizon—fifty years—will determine whether human reasoning remains distributed or becomes concentrated. If we build AI that makes thinking unnecessary for most people most of the time, we create a bifurcation: a small population that retains the capacity and context to reason independently, and a larger population whose intellectual development has been shaped by perpetual augmentation. This is not about intelligence—human cognitive capacity will not diminish. It is about agency—the ability to navigate uncertainty without prescribed frameworks, to form judgments without algorithmic mediation, to think through problems without automated assistance. These capacities require practice to develop and context to maintain. If AI systems handle increasingly complex reasoning tasks, where do humans practice? If systems provide increasingly sophisticated guidance, when do humans develop judgment? The question is not whether some humans will retain these capacities—they will, particularly those whose education and professional contexts require it. The question is whether these capacities remain broadly accessible or become privileges of position.

**Human core values cannot be discovered through research—they must be chosen through commitment.** Every AI system embodies assumptions about what humans should do and what machines should handle, about what thinking is worth preserving and what can be automated, about who bears risk and who receives benefit. These assumptions are not technical; they are ethical and political. They cannot be optimized through better algorithms or resolved through more data. They require explicit choices about what kind of human-AI relationship we want to build.

The choice is not between progress and stagnation, between embracing AI and resisting change. The choice is between AI that preserves human agency by design and AI that erodes it by default. Between systems that make reasoning feel easier by doing it for us, and systems that make reasoning more powerful by clarifying its process. Between research that optimizes for what we can measure and research that protects what we cannot.

We are not powerless in this. Researchers can ask not just "can we build this" but "should we build this"—not as abstract ethics but as concrete design. Funders can reward work that demonstrates sustained human capability, not just immediate productivity gains. Institutions can evaluate AI deployments by their effects on human development, not just their effects on operational efficiency. Users can demand transparency about what systems do to reasoning processes, not just what outputs they produce.

But time compounds. Each system deployed, each delegation normalized, each capability assumed rather than developed makes the next step feel more inevitable. We are not building a single AI—we are building the conditions under which humans will or will not develop their own capacities. This is the urgency: not that AI will become too powerful, but that we will design our own diminishment and call it progress.

The next five years will reveal whether we recognize this. The next fifty will reveal whether recognition mattered.`,
    published: true,
    featured: true
  },
  {
    id: "interface-and-lived-experience",
    title: "경험을 잃지 않는 인터페이스",
    date: "2025-09-12",
    readTime: "6 min read",
    category: "Interface Design",
    tags: ["interface", "memory", "experience", "design"],
    excerpt: "일기를 쓰는 이유는 기억하기 위해서가 아니라, 경험이 흘러가지 않도록 붙잡기 위해서다.",
    content: `일기를 쓰는 이유는 기억하기 위해서가 아니라, 경험이 흘러가지 않도록 붙잡기 위해서다.

우리는 하루에 수백 개의 순간을 지나친다. 대부분은 인식하지 못한 채 흘러간다. 인터페이스가 그 순간들을 잡아주는 역할을 할 수 있을까? 아니면 오히려 더 빨리 흘려보내는 역할을 하고 있는 걸까?

나는 편리함과 포착 사이에 긴장이 있다고 생각한다. 스크롤이 쉬울수록, 우리는 더 빠르게 지나간다. 저장이 자동화될수록, 우리는 덜 선택한다. 인터페이스가 마찰을 제거할 때, 그 마찰 안에 있던 의미도 함께 사라질 수 있다.

좋은 인터페이스는 사용자를 빠르게 만들지 않는다. 사용자가 자기 경험을 알아차리게 만든다. 그 차이는 작아 보이지만, 설계의 목표를 완전히 다른 방향으로 이끈다.`,
    published: true
  },
  {
    id: "writing-with-ai",
    title: "AI가 대신 쓴 문장이 내 문장이 될 수 있을까",
    date: "2025-11-03",
    readTime: "7 min read",
    category: "Writing & AI",
    tags: ["AI", "writing", "authorship", "agency"],
    excerpt: "AI 보조 도구가 생기고 나서 나는 더 많이 썼지만, 더 적게 생각하게 됐다는 느낌을 지울 수 없었다.",
    content: `AI 보조 도구가 생기고 나서 나는 더 많이 썼지만, 더 적게 생각하게 됐다는 느낌을 지울 수 없었다.

도구는 내가 원하는 방향을 알아채고 문장을 완성해줬다. 처음엔 편했다. 그런데 어느 순간부터 내가 쓰는 건지, 선택하는 건지 구분이 흐릿해졌다. 문장이 잘 나왔을 때 그게 내 생각인지 AI가 보여준 가능성인지 알 수 없었다.

글쓰기는 단순한 표현 행위가 아니다. 생각을 발견하는 과정이다. 문장을 찾는 과정에서 내가 무엇을 말하고 싶은지가 명확해진다. AI가 그 과정을 건너뛰게 해준다면, 우리는 더 많이 쓰면서도 더 적게 발견하게 되는 것일 수 있다.

내 문장이 되려면, 내가 그것을 만든 과정이 있어야 한다. 선택과 수정과 실패가 포함된 과정. AI가 그걸 대신할 수 있을까, 아니면 그것이 바로 AI가 건드려서는 안 되는 부분일까.`,
    published: true
  },
  {
    id: "system-memory-self",
    title: "시스템이 기억하는 나와 내가 기억하는 나",
    date: "2026-02-18",
    readTime: "8 min read",
    category: "Memory & Systems",
    tags: ["memory", "AI", "identity", "personalization"],
    excerpt: "추천 시스템이 나를 설명하는 방식은 때로 내가 나 자신을 설명하는 방식보다 정확하다.",
    content: `추천 시스템이 나를 설명하는 방식은 때로 내가 나 자신을 설명하는 방식보다 정확하다.

나는 스스로를 다양한 것에 관심 있는 사람이라고 생각한다. 하지만 알고리즘이 본 나는 특정 패턴을 반복하는 사람이다. 둘 다 틀리지 않다. 그런데 그 두 개의 '나' 사이에서, 나는 어느 쪽을 더 믿어야 할까?

시스템이 기억하는 나는 행동의 집합이다. 클릭, 체류 시간, 반복. 반면 내가 기억하는 나는 의도와 감정과 맥락의 혼합이다. 시스템의 나는 더 일관되고, 내 나는 더 모순적이다.

문제는 시스템이 나를 점점 더 닮아가는 게 아니라, 내가 시스템이 기억하는 나를 닮아가는 것이다. 추천을 따라가면서 나는 내 패턴을 강화한다. 어느 순간부터 내가 선택하는 게 아니라 확인하는 것이 된다.

이 루프를 끊으려면 시스템이 달라져야 한다. 사용자의 현재 행동을 반영하는 것을 넘어서, 사용자가 자신을 바라보는 방식을 함께 담을 수 있어야 한다.`,
    published: true
  }
];

// Helper functions
export const getFeaturedPosts = (): BlogPost[] =>
  blogPosts.filter(post => post.featured && post.published);

export const getPostsByCategory = (category: string): BlogPost[] =>
  blogPosts.filter(post => post.category === category && post.published);

export const getPostById = (id: string): BlogPost | undefined =>
  blogPosts.find(post => post.id === id);

export const getAllTags = (): string[] => {
  const allTags = blogPosts.flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
};

export const getPostsByTag = (tag: string): BlogPost[] =>
  blogPosts.filter(post => post.tags.includes(tag) && post.published);

export const getAllCategories = (): string[] => {
  const categories = blogPosts.map(post => post.category);
  return Array.from(new Set(categories)).sort();
};