/**
 * The journey is one continuous timeline, not four scenes.
 *
 * Every route is a waypoint on a single parameter t ∈ [0,1]; navigating
 * animates t toward the new waypoint. Going backwards animates it down, so
 * reverse playback is not authored anywhere — it falls out of the fact that
 * there is only ever one number moving. Topic 2 back to the front door is
 * simply t: 1 → 0, which is the whole arc in reverse.
 */
export const WAYPOINTS: Record<string, number> = {
  "/vast": 0,
  "/vast/introduction": 0.34,
  "/vast/topic-1": 0.67,
  "/vast/topic-2": 1,
};

/** Routes that are documents, not part of the journey. */
export function isJourneyRoute(pathname: string): boolean {
  return pathname in WAYPOINTS;
}

export function waypointFor(pathname: string): number {
  return WAYPOINTS[pathname] ?? 0;
}

/** Smoothstep — eased at both ends, so nothing starts or stops abruptly. */
export function smooth(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
