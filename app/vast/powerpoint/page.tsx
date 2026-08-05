import { currentUser } from "@clerk/nextjs/server";
import { readDeck } from "../deckFile";
import { isOwnerEmail } from "../owner";
import PowerPointClient from "./PowerPointClient";

export const dynamic = "force-dynamic";

export default async function PowerPointPage() {
  // Guests are allowed on this page — it is the deck. They are NOT allowed the
  // speaker notes, which are the word-for-word script. Decided on the server so
  // the notes are never serialised into the client payload for a guest.
  const devBypass = process.env.NODE_ENV !== "production";
  const user = devBypass ? null : await currentUser();
  const owner =
    devBypass || (user?.emailAddresses?.some((e) => isOwnerEmail(e.emailAddress)) ?? false);

  const slides = await readDeck();
  const safe = owner
    ? slides
    : slides.map((s) => ({ ...s, beats: [] }));

  return <PowerPointClient slides={safe} canSeeNotes={owner} />;
}
