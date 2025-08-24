"use client";

import * as css from "./css";
import useSession from "@/lib/use-session";
import { defaultSession } from "@/lib/iron";

export function Form() {
    const { session, isLoading, increment } = useSession();

    if (isLoading) {
        return <p className="text-lg">Loading...</p>;
    }

    if (session.isLoggedIn) {
        return (
            <>
                <p className="text-lg">
                    Logged in user: <strong>{session.username}</strong>
                    &nbsp;
                    <button
                        className={css.button}
                        onClick={() => {
                            increment(null, {
                                optimisticData: {
                                    ...session,
                                    counter: session.counter + 1,
                                },
                                revalidate: false,
                            });
                        }}
                    >
                        {session.counter}
                    </button>
                </p>
                <LogoutButton />
            </>
        );
    }

    return <LoginForm />;
}

function LoginForm() {
    const { session, login } = useSession();

    return (
        <form
            onSubmit={function (event) {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const username = formData.get("username") as string;
                const password = formData.get("password") as string;
                login({ username, password }, {
                    optimisticData: {
                        ...session
                    },
                });
            }}
            method="POST"
            className={css.form}
        >
            <label className="block text-lg">
                <span className={css.label}>Username</span>
                <input
                    type="text"
                    name="username"
                    className={css.input}
                    placeholder=""
                    defaultValue="小广"
                    required
                    // for demo purposes, disabling autocomplete 1password here
                    autoComplete="off"
                    data-1p-ignore
                />
            </label>
            <label className="block text-lg">
                <span className={css.label}>Password</span>
                <input
                    type="password"
                    name="password"
                    className={css.input}
                    placeholder=""
                    defaultValue="gxwtf_2714"
                    required
                    // for demo purposes, disabling autocomplete 1password here
                    autoComplete="off"
                    data-1p-ignore
                />
            </label>
            <div>
                <input type="submit" value="Login" className={css.button} />
            </div>
        </form>
    );
}

function LogoutButton() {
    const { logout } = useSession();

    return (
        <p>
            <a
                className={css.button}
                onClick={(event) => {
                    event.preventDefault();
                    logout(null, {
                        optimisticData: defaultSession,
                    });
                }}
            >
                Logout
            </a>
        </p>
    );
}
