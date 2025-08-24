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

async function doLogin(url: string, { arg }: { arg: {username: string, password: string} }) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
        body: JSON.stringify(arg),
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // 从响应头获取版本信息并保存到localStorage
    const version = response.headers.get('X-Session-Version');
    if (version && (version === 'junior' || version === 'senior')) {
        localStorage.setItem('poemVersion', version);
    }
    
    const sessionData = await response.json();
    
    // 触发版本同步
    if (typeof window !== 'undefined') {
        // 发布自定义事件通知VersionProvider进行同步
        window.dispatchEvent(new CustomEvent('versionSync', { detail: { version } }));
    }
    
    return sessionData;
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
