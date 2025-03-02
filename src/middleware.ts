import {NextRequest, NextResponse} from 'next/server'
import {getSession} from '@/lib/session'

const protectedRoutes = ['/admin']

export default async function middleware(req: NextRequest) {

  const path = req.nextUrl.pathname
  const isProtected = protectedRoutes.includes(path)

  const session = await getSession();

  const isAdmin = session.role === 'admin'


  console.log(path, isAdmin)
  if (isProtected && !isAdmin) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes that middleware shouldn't run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
