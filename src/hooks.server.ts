import { type Handle } from "@sveltejs/kit";
import { PUBLIC_URL_API } from "$env/static/public";

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("access_token");

    const res = await fetch(`${PUBLIC_URL_API}/api/v1/users/me`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (res.ok) {
        const data = await res.json();
        event.locals.user = data.data;
    } else {
        event.locals.user = null;
    }

    return resolve(event);
};