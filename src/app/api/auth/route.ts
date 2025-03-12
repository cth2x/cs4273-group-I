import { getSession } from '@/lib/session';

//Retrieve session data
export async function GET() {
  const session = await getSession();

  const isAuthenticated = session.role === 'admin' && session.email !== '';

  return Response.json(
    {
      isAuthenticated,
      role: session.role || '',
    },
    { status: 200 }
  );
}
