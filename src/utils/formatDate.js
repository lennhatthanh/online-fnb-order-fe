export default function formatDate(isoString) {
    const date = new Date(isoString);

    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);

    const month = parts.find((p) => p.type === "month").value;
    const day = parts.find((p) => p.type === "day").value;
    const year = parts.find((p) => p.type === "year").value;
    const hour = parts.find((p) => p.type === "hour").value;
    const minute = parts.find((p) => p.type === "minute").value;
    const dayPeriod = parts.find((p) => p.type === "dayPeriod").value.toUpperCase();

    return `${month} ${day}, ${year} at ${hour}:${minute} ${dayPeriod}`;
}
