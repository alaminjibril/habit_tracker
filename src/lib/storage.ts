export function getItem<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
        return JSON.parse(data) as T;
    } catch {
        return null;
    }
}

export function setItem<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem(key);
}

export function clearStorage(): void {
    if (typeof window === "undefined") return;

    localStorage.clear();
}