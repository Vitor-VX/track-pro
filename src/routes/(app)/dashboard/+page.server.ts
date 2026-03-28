export const load = async ({ fetch, cookies }: any) => {
    const token = cookies.get("access_token");
    const res = await fetch("http://localhost:4000/api/v1/metrics/overview", {
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