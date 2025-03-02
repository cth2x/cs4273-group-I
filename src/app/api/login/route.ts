import type {NextApiRequest, NextApiResponse} from 'next'
import getSession from '@/lib/session'





export async function POST(req: Request) {

  const formData = await req.formData();

  const email = formData.get('email')
  const password = formData.get('password')


  console.log(email)
  console.log(password)

  
  if (email === 'admin@gmail.com' && password === 'password') {

    const session = await getSession();
    session.email = 'admin@gmail.com';
    session.role = 'admin';

    await session.save();
    
    return Response.json({}, {status: 200})
  }

  return Response.json({}, {status: 400})
  
}
