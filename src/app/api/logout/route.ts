import { getSession } from "@/lib/session";

// Clear session data
export async function POST() {
  const session = await getSession();

  session.email = "";
  session.role = "";

  await session.save();

  return Response.json({ success: true }, { status: 200 });
}
