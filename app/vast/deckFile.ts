import { copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DeckSlide } from "./deck-types";

/** The single source of truth: slide visuals + the spoken beats over them. */
const FILE = path.join(process.cwd(), "app", "vast", "deck.json");

export async function readDeck(): Promise<DeckSlide[]> {
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
