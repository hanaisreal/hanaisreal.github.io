#!/usr/bin/env node
// 사진 추가/삭제 후 실행: npm run sync-bg
// public/pictures/backgrounds/{dawn,morning,afternoon,sunset,night}/ 를 스캔해서
// src/components/data/backgroundsData.ts 를 자동 생성합니다.

const fs   = require('fs');
const path = require('path');

const BACKGROUNDS_DIR = path.join(__dirname, '../public/pictures/backgrounds');
const OUTPUT_FILE     = path.join(__dirname, '../src/components/data/backgroundsData.ts');
const TIME_SLOTS      = ['dawn', 'morning', 'afternoon', 'sunset', 'night'];
const IMAGE_EXT       = /\.(jpg|jpeg|png|webp)$/i;

// 기존 파일에서 location 메타데이터 보존
function loadExistingLocations() {
  const locations = {};
  if (!fs.existsSync(OUTPUT_FILE)) return locations;
  const src = fs.readFileSync(OUTPUT_FILE, 'utf8');
  const re = /file:\s*'([^']+)',\s*timeOfDay:\s*'\w+',\s*location:\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (m[2]) locations[m[1]] = m[2];
  }
  return locations;
}

const existing = loadExistingLocations();
const entries  = [];

for (const slot of TIME_SLOTS) {
  const dir = path.join(BACKGROUNDS_DIR, slot);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir)
    .filter(f => IMAGE_EXT.test(f))
    .sort();
  for (const file of files) {
    const key      = `${slot}/${file}`;
    const location = existing[key] || '';
    entries.push({ file: key, timeOfDay: slot, location });
  }
}

const lines = entries.map(
  e => `  { file: '${e.file}', timeOfDay: '${e.timeOfDay}', location: '${e.location}' },`
);

const output = `export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'sunset' | 'night';

export interface BackgroundItem {
  file: string;       // 예: 'morning/IMG_1871.jpg'
  timeOfDay: TimeOfDay;
  location: string;   // 예: '의성 자두밭, 한국'
}

// ⚠️  이 파일은 scripts/sync-backgrounds.js 가 자동 생성합니다.
// 사진 추가/삭제 후:  npm run sync-bg
// location 메타는 직접 수정해도 sync-bg 실행 시 보존됩니다.
const backgrounds: BackgroundItem[] = [
${lines.join('\n')}
];

export function pickBackground(hour: number): BackgroundItem {
  let timeOfDay: TimeOfDay;
  if      (hour >= 4   && hour < 6.5)  timeOfDay = 'dawn';
  else if (hour >= 6.5 && hour < 11.5) timeOfDay = 'morning';
  else if (hour >= 11.5 && hour < 16)  timeOfDay = 'afternoon';
  else if (hour >= 16  && hour < 20.5) timeOfDay = 'sunset';
  else                                  timeOfDay = 'night';

  const pool = backgrounds.filter(b => b.timeOfDay === timeOfDay);
  const candidates = pool.length > 0 ? pool : backgrounds;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export default backgrounds;
`;

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`✓ synced ${entries.length} backgrounds →`, OUTPUT_FILE);
entries.forEach(e => console.log(`  [${e.timeOfDay}] ${e.file}${e.location ? ' — ' + e.location : ''}`));
