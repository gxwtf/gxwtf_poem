// Iron Session SSO Login Route /sso/callback

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/iron";
import { SessionData } from "@/lib/iron";
import axios from "axios";

// login
export async function GET(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { token, back } = queryParams;

    try {
        const res = await axios.post(`${process.env.GXACCOUNT_URL}/sso/verify`, {
            token,
        });

        if (res.status === 200) {
            session.isLoggedIn = true;
            session.username = res.data.userName;
            session.userid = res.data.userId;
            session.admin = res.data.admin;
            session.real_name = res.data.userRealName;
            session.email = res.data.userEmail;
            session.grade = 10;
            session.counter = 0;
            session.version = session.grade >= 10 ? 'senior' : 'junior';
            await session.save();

            return NextResponse.redirect(new URL(back, request.url), 302);
        }
        else {
            return NextResponse.redirect(new URL('/login?back='+back, request.url), 302);
        }
    } catch (e) {
        console.error(e);
        return NextResponse.redirect(new URL('/login?back='+back, request.url), 302);
    }
}
