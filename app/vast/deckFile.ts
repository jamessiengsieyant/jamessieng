import { copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DeckSlide } from "./deck-types";
import bundled from "./deck.json";

/** The single source of truth: slide visuals + the spoken beats over them. */
const FILE = path.join(process.cwd(), "app", "vast", "deck.json");

/**
 * In production the deck is read from the import, so it is bundled into the
 * serverless function and cannot go missing. Reading it off disk there would
 * depend on file tracing picking up a path built at runtime, which it does not
 * reliably do — and a deck that 500s on the day of the interview is the one
 * failure this whole thing cannot have.
 *
 * In dev it is read from disk on every request, so saves from the editor at
 * /vast/script appear without restarting the server.
 */
export async function readDeck(): Promise<DeckSlide[]> {
  if (process.env.NODE_ENV === "production") return bundled as DeckSlide[];
  return JSON.parse(await readFile(FILE, "utf8")) as DeckSlide[];
}

/**
 * Strict shape check. This file is the presentation — a malformed POST must
 * never be allowed to overwrite it.
 */
export function isValidDeck(data: unknown): data is DeckSlide[] {
  if (!Array.isArray(data) || data.length === 0) return false;
  return data.every((s) => {
    if (!s || typeof s !== "object") return false;
    const slide = s as DeckSlide;
    return (
      typeof slide.section === "string" &&
      typeof slide.sectionTitle === "string" &&
      slide.visual != null &&
      typeof slide.visual === "object" &&
      typeof (slide.visual as { t?: unknown }).t === "string" &&
      Array.isArray(slide.beats) &&
      slide.beats.every(
        (b) =>
          b &&
          typeof b === "object" &&
          typeof b.cue === "string" &&
          typeof b.opener === "string" &&
          typeof b.rest === "string"
      )
    );
  });
}

export async function writeDeck(slides: DeckSlide[]): Promise<void> {
  // keep one generation of history in case a save goes wrong mid-rehearsal
  await copyFile(FILE, `${FILE}.bak`).catch(() => {});
  await writeFile(FILE, `${JSON.stringify(slides, null, 2)}\n`, "utf8");
}
