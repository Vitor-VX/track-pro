import { PUBLIC_URL_API } from "$env/static/public";

export const load = async ({ fetch, cookies }: any) => {
    const token = cookies.get("access_token");
    const res = await fetch(`${PUBLIC_URL_API}/api/v1/metrics/overview`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (!res.ok) {
        return {
            overview: null
        };
    }

    const data = await res.json();
    const overview = data.data;
    return {
        overview
    };
};