export function calculateFgtsPenalty(
  fgtsBalance: number,
  penaltyRate: number
): number {
  return fgtsBalance * penaltyRate;
}