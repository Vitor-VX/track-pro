export async function apiRequest(url: string, options: {}) {
    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Erro na requisição");
    }

    return data;
}