// SSO Login Route /sso/login

"use server"

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { system, back } = queryParams;

    return NextResponse.redirect(new URL(process.env.GXACCOUNT_URL+'/sso/login?system='+system+'&back='+back), 302);
}