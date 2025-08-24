// Iron Session Client Component with SWR

import useSWR from "swr";
import { SessionData, defaultSession } from "./iron";
import useSWRMutation from "swr/mutation";

const sessionApiRoute =
    "/api/session";

async function fetchJson<JSON = unknown>(
    input: RequestInfo,
    init?: RequestInit,
): Promise<JSON> {
    const response = await fetch(input, {
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
        ...init,
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
}

function doLogin(url: string, { arg }: { arg: {username: string, password: string} }) {
    return fetchJson<SessionData>(url, {
        method: "POST",
        body: JSON.stringify(arg),
    });
}

function doLogout(url: string) {
    return fetchJson<SessionData>(url, {
        method: "DELETE",
    });
}

function doIncrement(url: string) {
    return fetchJson<SessionData>(url, {
        method: "PATCH",
    });
}

export default function useSession() {
    const { data: session, isLoading } = useSWR(
        sessionApiRoute,
        fetchJson<SessionData>,
        {
            fallbackData: defaultSession,
        },
    );

    const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
        // 登录失败时需要重新验证以恢复正确状态
        revalidate: true,
    });
    const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);
    const { trigger: increment } = useSWRMutation(sessionApiRoute, doIncrement);

    return { session, logout, login, increment, isLoading };
}
