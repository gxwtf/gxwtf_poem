// Iron Session Options

import { SessionOptions } from "iron-session";

export interface SessionData {
    username: string;
    isLoggedIn: boolean;
    counter: number;
    email: string;
    userid: number;
    admin: boolean;
    real_name: string;
    grade: number;
}

export const defaultSession: SessionData = {
    username: "",
    isLoggedIn: false,
    counter: 0,
    email: "",
    userid: 0,
    admin: false,
    real_name: "",
    grade: 0,
};

export const sessionOptions: SessionOptions = {
    password: process.env.SES_SECRET as string,
    cookieName: "gxpoem_session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
