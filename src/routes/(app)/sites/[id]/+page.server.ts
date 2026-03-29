import { PUBLIC_URL_API } from "$env/static/public"

export const load = async ({ fetch, params, cookies }: any) => {
    const { id } = params;
    const token = cookies.get("access_token");

    if (!token) {
        throw new Error("Unauthorized");
    }

    const headers = { Authorization: `Bearer ${token}` };

    const [siteRes, metricsRes, chartRes, behaviorRes, funnelRes, sourceRes, campaignsRes, metaSummaryRes] = await Promise.all([
        fetch(`${PUBLIC_URL_API}/api/v1/sites/${id}`, { headers }),
        fetch(`${PUBLIC_URL_API}/api/v1/metrics/site/${id}`, { headers }),
        fetch(`${PUBLIC_URL_API}/api/v1/metrics/performance/${id}`, { headers }),
        fetch(`${PUBLIC_URL_API}/api/v1/metrics/behavior/${id}`, { headers }),
        fetch(`${PUBLIC_URL_API}/api/v1/metrics/funnel/${id}`, { headers }),
        fetch(`${PUBLIC_URL_API}/api/v1/metrics/source/${id}`, { headers }),
        fetch(`${PUBLIC_URL_API}/api/v1/meta/campaigns/${id}`, { headers }),
        fetch(`${PUBLIC_URL_API}/api/v1/meta/summary/${id}`, { headers }),
    ]);

    if (!metricsRes.ok || !chartRes.ok) {
        throw new Error("Erro ao carregar dados do dashboard");
    }

    const [
        siteJson,
        metricsJson,
        chartJson,
        behaviorJson,
        funnelJson,
        sourceJson,
        campaignsJson,
        metaSummaryJson,
    ] = await Promise.all([
        siteRes.json(),
        metricsRes.json(),
        chartRes.json(),
        behaviorRes.json(),
        funnelRes.json(),
        sourceRes.json(),
        campaignsRes.json(),
        metaSummaryRes.json(),
    ]);

    return {
        token,
        site: siteJson.data,
        metrics: metricsJson.data,
        chart: chartJson.data,
        behavior: behaviorJson.data,
        funnel: funnelJson.data,
        source: sourceJson.data,
        campaigns: campaignsJson.data || [],
        metaSummary: metaSummaryJson.data || null,
    };
};