import { readDeck } from "../deckFile";
import PowerPointClient from "./PowerPointClient";

export const dynamic = "force-dynamic";

export default async function PowerPointPage() {
  const slides = await readDeck();
  return <PowerPointClient slides={slides} />;
}
