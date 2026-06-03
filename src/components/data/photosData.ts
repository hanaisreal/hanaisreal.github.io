const BASE = process.env.PUBLIC_URL;

export interface Photo {
  src: string;
  keyword: string;
}

// Add your photos here. src is relative to /public.
// keyword is the small label shown on hover/tap.
export const photos: Photo[] = [
  { src: `${BASE}/pictures/profile_main.png`, keyword: "seoul" },
  { src: `${BASE}/pictures/upstage2.png`,     keyword: "upstage ai" },
  { src: `${BASE}/pictures/upstagearc.png`,   keyword: "upstage" },
  { src: `${BASE}/pictures/gephi.png`,         keyword: "networks" },
  { src: `${BASE}/pictures/SPARCS.png`,        keyword: "sparcs" },
  { src: `${BASE}/pictures/LetmeCU.png`,       keyword: "letmecu" },
];
