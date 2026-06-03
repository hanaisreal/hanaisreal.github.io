export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'sunset' | 'night';

export interface BackgroundItem {
  file: string;       // 예: 'morning/IMG_1871.jpg'
  timeOfDay: TimeOfDay;
  location: string;   // 예: '의성 자두밭, 한국'
}

// ⚠️  이 파일은 scripts/sync-backgrounds.js 가 자동 생성합니다.
// 사진 추가/삭제 후:  npm run sync-bg
// location 메타는 직접 수정해도 sync-bg 실행 시 보존됩니다.
const backgrounds: BackgroundItem[] = [
  { file: 'dawn/20260209_183133.jpg', timeOfDay: 'dawn', location: '' },
  { file: 'dawn/20260419_074250.jpg', timeOfDay: 'dawn', location: '' },
  { file: 'dawn/20260419_075541.jpg', timeOfDay: 'dawn', location: '' },
  { file: 'morning/20220707_192555.jpg', timeOfDay: 'morning', location: '' },
  { file: 'morning/20230105_180116.jpg', timeOfDay: 'morning', location: '' },
  { file: 'morning/20240808_154609.jpg', timeOfDay: 'morning', location: '' },
  { file: 'morning/20240907_192127.jpg', timeOfDay: 'morning', location: '' },
  { file: 'morning/IMG_1871.jpg', timeOfDay: 'morning', location: '의성 자두밭, 한국' },
  { file: 'morning/IMG_2451.jpg', timeOfDay: 'morning', location: '' },
  { file: 'afternoon/20210704_195403.jpg', timeOfDay: 'afternoon', location: '' },
  { file: 'afternoon/20240705_105529.jpg', timeOfDay: 'afternoon', location: '' },
  { file: 'afternoon/20250404_170551.jpg', timeOfDay: 'afternoon', location: '' },
  { file: 'sunset/20240814_201907.jpg', timeOfDay: 'sunset', location: '' },
  { file: 'sunset/20241003_181848.jpg', timeOfDay: 'sunset', location: '' },
  { file: 'sunset/IMG_2542.JPG', timeOfDay: 'sunset', location: '' },
  { file: 'night/20260228_235215.jpg', timeOfDay: 'night', location: '' },
  { file: 'night/IMG_3323.JPG', timeOfDay: 'night', location: '' },
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
