import { PUBLIC_URL_API } from "$env/static/public";

export const load = async ({ fetch, params, cookies }: any) => {
    const { id } = params;
    const token = cookies.get("access_token");

    if (!token) {
        throw new Error("Unauthorized");
    }

    const [siteRes, funnelRes] = await Promise.all([
        fetch(`${PUBLIC_URL_API}/api/v1/sites/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        fetch(`${PUBLIC_URL_API}/api/v1/metrics/funnel/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
    ]);

    if (!funnelRes.ok) {
        throw new Error("Erro ao carregar dados do dashboard");
    }

    const siteJson = await siteRes.json();
    const funnelJson = await funnelRes.json();
    
    return {
        site: siteJson.data,
        funnel: funnelJson.data,
    };
};