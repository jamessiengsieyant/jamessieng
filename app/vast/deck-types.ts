/**
 * One spoken beat. `marks` are private delivery notes (pauses, laugh beats,
 * rate changes) — they are shown on /vast/script and deliberately never
 * written into the PowerPoint, because speaker notes travel with the file
 * and the panel receives a copy of it.
 */
export type Beat = { cue: string; opener: string; rest: string; marks?: string };

export type Item = { lead: string; sub?: string };

export type Visual =
  | { t: "title" }
  | { t: "statement"; kick: string; title: string; sub?: string }
  | { t: "list"; kick: string; title: string; items: Item[]; callout?: string }
  | {
      t: "cards";
      kick: string;
      title: string;
      a: { h: string; lines: string };
      b: { h: string; lines: string };
      tail?: string;
    }
  | { t: "flow"; kick: string; title: string; tail: string }
  | {
      t: "chain";
      kick: string;
      title: string;
      sub?: string;
      /** each link renders as "from → to"; stacked vertically */
      links: { from: string; to: string }[];
      tail?: string;
    };

/** One slide: what the room sees, and what James says over it. */
export type DeckSlide = {
  section: string;
  sectionTitle: string;
  visual: Visual;
  beats: Beat[];
};

/** Speaker notes for a slide — the spoken beats, joined. */
export function notesFor(slide: DeckSlide): string {
  return slide.beats
    .map((b) => [b.opener, b.rest].filter(Boolean).join(" "))
    .join("\n\n");
}
