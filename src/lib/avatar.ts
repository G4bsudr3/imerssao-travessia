// DiceBear "thumbs" — simples, colorido, case com tom CHŎRA
export function avatarUrl(seed: string, size = 96): string {
  const s = encodeURIComponent(seed || "frattz");
  return `https://api.dicebear.com/7.x/thumbs/svg?seed=${s}&radius=50&size=${size}`;
}

export function randomSeed(): string {
  return Math.random().toString(36).slice(2, 10);
}
