export function formatDate(date: string | Date): string {
    if (typeof date === "string") {
        const [year, month, day] = date.split("-").map(Number);
        return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
        });
    }

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
    });
}