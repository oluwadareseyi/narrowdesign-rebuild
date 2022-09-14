export function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

export function clamp(min, max, number) {
  return Math.max(min, Math.min(number, max));
}
