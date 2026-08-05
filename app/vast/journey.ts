/**
 * The journey is one continuous timeline, not four scenes.
 *
 * Every route is a waypoint on a single parameter t ∈ [0,1]; navigating
 * animates t toward the new waypoint. Going backwards animates it down, so
 * reverse playback is not authored anywhere — it falls out of the fact that
 * there is only ever one number moving. Topic 2 back to the front door is
 * simply t: 1 → 0, which is the whole arc in reverse.
 */
/**
 * The spans are deliberately uneven. /vast is a cover page — it holds one
 * headline and a launch, and giving it an equal share would make the other
 * three feel starved. The three that carry the thirty beats get equal thirds
 * of what is left.
 */
export const WAYPOINTS: Record<string, number> = {
  "/vast": 0,
  "/vast/introduction": 0.1,
  "/vast/topic-1": 0.4,
  "/vast/topic-2": 0.7,
};

/** How far scrolling a given page moves the timeline. */
export const SPANS: Record<string, number> = {
  "/vast": 0.1,
  "/vast/introduction": 0.3,
  "/vast/topic-1": 0.3,
  "/vast/topic-2": 0.3,
};

/** Scene boundaries on the same timeline, named so the scene code reads. */
export const PAD_END = 0.1;    // 1: on the pad, watching it go
export const CLIMB_END = 0.4;  // 2: climbing out until it is gone
export const DOCK_END = 0.7;   // 3: above Earth, Haven-1 separates and closes

export function spanFor(pathname: string): number {
  return SPANS[pathname] ?? 0.3;
}

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
