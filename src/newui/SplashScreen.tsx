import React, { useEffect, useState } from 'react';
import { BackgroundItem } from '../components/data/backgroundsData';

interface Props {
  bg: BackgroundItem;
  onDone: () => void;
}

function getGreeting(hour: number): string {
  if (hour >= 4  && hour < 6.5) return 'morning,';
  if (hour >= 6.5 && hour < 12) return 'good morning,';
  if (hour >= 12 && hour < 16)  return 'good afternoon,';
  if (hour >= 16 && hour < 20.5) return 'good evening,';
  return 'hello,';
}

function getAddress(isReturn: boolean): string {
  if (isReturn) return 'nice to see you again.';
  return 'visitor.';
}

function checkIsReturn(): boolean {
  const key = 'hana_visited';
  const visited = !!localStorage.getItem(key);
  localStorage.setItem(key, '1');
  return visited;
}

type Phase = 'text-in' | 'bg-in' | 'hold' | 'fade-out';

const SplashScreen: React.FC<Props> = ({ bg, onDone }) => {
  const [phase, setPhase] = useState<Phase>('text-in');
  const hour = new Date().getHours();
  const isReturn = checkIsReturn();

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('bg-in'),    500);
    const t2 = setTimeout(() => setPhase('hold'),    1800);
    const t3 = setTimeout(() => setPhase('fade-out'), 2600);
    const t4 = setTimeout(onDone,                    3400);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className={`splash${phase === 'fade-out' ? ' splash--out' : ''}`}>
      <div
        className={`splash__bg${phase !== 'text-in' ? ' splash__bg--in' : ''}`}
        style={{ backgroundImage: `url('/pictures/backgrounds/${bg.file}')` }}
      />
      <div className="splash__veil" />
      <div className={`splash__text${phase !== 'fade-out' ? ' splash__text--in' : ''}`}>
        <p className="splash__greeting">{getGreeting(hour)}</p>
        <p className="splash__visitor">{getAddress(isReturn)}</p>
        {bg.location && (
          <p className="splash__location">{bg.location}</p>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
