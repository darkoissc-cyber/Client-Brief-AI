import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { key, token, listId, cards } = await req.json();

    if (!key || !token || !listId || !cards || !Array.isArray(cards)) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const createdCards = [];

    for (const card of cards) {
      const trelloRes = await fetch(
        `https://api.trello.com/1/cards?idList=${listId}&key=${key}&token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: card.title,
            desc: card.description || "",
            due: card.dueDate || null,
          }),
        }
      );

      if (trelloRes.ok) {
        const data = await trelloRes.json();
        createdCards.push(data.url);
      } else {
        const errPayload = await trelloRes.text();
        console.error("Trello API error response:", errPayload);
      }
    }

    return NextResponse.json({ success: true, urls: createdCards });
  } catch (err: any) {
    console.error("Trello export failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
