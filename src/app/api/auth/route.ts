import { getSession } from '@/lib/session';

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
