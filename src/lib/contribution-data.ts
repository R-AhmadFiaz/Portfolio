function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export function generateContributions(weeks = 52): ContributionDay[][] {
  const rand = mulberry32(19980614);
  const today = new Date();
  const days: ContributionDay[] = [];

  const totalDays = weeks * 7;
  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const roll = rand();
    let count = 0;
    if (roll > (isWeekend ? 0.55 : 0.32)) {
      count = Math.floor(rand() * (isWeekend ? 6 : 12));
    }
    const level: ContributionDay["level"] =
      count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;
    days.push({ date: date.toISOString().slice(0, 10), count, level });
  }

  const grid: ContributionDay[][] = [];
  for (let w = 0; w < weeks; w++) {
    grid.push(days.slice(w * 7, w * 7 + 7));
  }
  return grid;
}
