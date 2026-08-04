import { readDeck } from "../deckFile";
import SlideSections from "../SlideSections";

export const dynamic = "force-dynamic";

export default async function Topic1Page() {
  const slides = (await readDeck()).filter((s) => s.section.startsWith("Part 02"));
  return <SlideSections slides={slides} />;
}
