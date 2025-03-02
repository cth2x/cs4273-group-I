import {getIronSession, SessionOptions, IronSession} from 'iron-session'
import { cookies } from 'next/headers'


type SessionData = {
    email: string,
    role: string
}


// Returns the session of a request. SESSION_PASSWORD environment variable must be set with a
// 32-character length password for security
export default async function getSession(): Promise<IronSession<SessionData>> {

    const sessionOptions: SessionOptions = {
	password: process.env.SESSION_PASSWORD || 'B.}Tg(!hn;#287SEb@ZpzaWVRMfUr9">v%Qp8]Rmz~ja(#*dXBAq}7x">F9$PVu;hL[bz+.uEasd@cA_NU8&Y;G,(->:nS7ra_<~=x;P?%]6#pBGuf$EV5DvQ2h!(&ZkXt"J(;V7+b{,^FR>W5Zrw_UP8.29*h[%',
	cookieName: "session",
	cookieOptions: {
	    httpOnly: true,
	    secure: process.env.NODE_ENV === 'production',
	}
    }

    return getIronSession<SessionData>(await cookies(), sessionOptions)
}
