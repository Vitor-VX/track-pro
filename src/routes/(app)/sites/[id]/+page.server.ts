export const load = async ({ fetch, params, cookies }: any) => {
    const { id } = params;
    const token = cookies.get("access_token");

    if (!token) {
        throw new Error("Unauthorized");
    }

    const [siteRes, metricsRes, chartRes, behaviorRes, funnelRes] = await Promise.all([
        fetch(`http://localhost:4000/api/v1/sites/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        fetch(`http://localhost:4000/api/v1/metrics/site/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        fetch(`http://localhost:4000/api/v1/metrics/performance/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        fetch(`http://localhost:4000/api/v1/metrics/behavior/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        fetch(`http://localhost:4000/api/v1/metrics/funnel/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    ]);

    if (!metricsRes.ok || !chartRes.ok) {
        throw new Error("Erro ao carregar dados do dashboard");
    }

    const metricsJson = await metricsRes.json();
    const chartJson = await chartRes.json();
    const siteJson = await siteRes.json();
    const behaviorJson = await behaviorRes.json();
    const funnelJson = await funnelRes.json();

    return {
        metrics: metricsJson.data,
        chart: chartJson.data,
        site: siteJson.data,
        behavior: behaviorJson.data,
        funnel: funnelJson.data
    };
};