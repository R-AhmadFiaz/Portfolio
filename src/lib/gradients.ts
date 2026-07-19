export const gradientTokens: Record<string, string> = {
  "violet-blue": "from-violet-500 via-indigo-500 to-blue-500",
  "orange-pink": "from-orange-400 via-rose-500 to-pink-500",
  "emerald-teal": "from-emerald-400 via-teal-500 to-cyan-500",
  "amber-rose": "from-amber-400 via-orange-500 to-rose-500",
  "blue-cyan": "from-blue-500 via-sky-500 to-cyan-400",
  "fuchsia-purple": "from-fuchsia-500 via-purple-500 to-violet-600",
};

export function getGradient(token: string) {
  return gradientTokens[token] ?? gradientTokens["violet-blue"];
}
