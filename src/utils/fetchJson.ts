import type { ApiError } from "../types/animal";

export async function fetchJson<T>(
    input: RequestInfo | URL,
    init?: RequestInit
): Promise<T> {
    const res = await fetch(input, init);
    if (!res.ok) {
        const err: ApiError = new Error("Erro na requisição");
        err.status = res.status;
        throw err;
    }
    return res.json() as Promise<T>;
}