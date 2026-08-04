import { readDeck } from "../deckFile";
import SlideSections from "../SlideSections";

export const dynamic = "force-dynamic";

export default async function IntroductionPage() {
  const slides = (await readDeck()).filter((s) => s.section.startsWith("Part 01"));
  return <SlideSections slides={slides} />;
}
