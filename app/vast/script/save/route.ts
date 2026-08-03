import { isValidDeck, writeDeck } from "../../deckFile";

export async function POST(request: Request) {
  // Dev-only. In production the filesystem is read-only anyway, but this
  // makes the intent explicit: the deployed deck is never editable.
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Body was not valid JSON." }, { status: 400 });
  }

  if (!isValidDeck(body)) {
    return Response.json(
      { ok: false, error: "Rejected — payload did not match the deck shape." },
      { status: 400 }
    );
  }

  await writeDeck(body);
  return Response.json({ ok: true, savedAt: new Date().toISOString() });
}
