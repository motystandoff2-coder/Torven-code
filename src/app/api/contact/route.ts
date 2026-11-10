import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";

export async function POST(request: Request) {
  try {
    if (!db) {
      return Response.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const { name, email, phone, company, service, budget, description } = body;

    if (!name || !email || !description) {
      return Response.json(
        { error: "Name, email, and description are required" },
        { status: 400 }
      );
    }

    await db.insert(contactSubmissions).values({
      name,
      email,
      phone: phone || null,
      company: company || null,
      service: service || null,
      budget: budget || null,
      description,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
