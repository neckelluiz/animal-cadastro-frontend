export function getPageSlice<T>(items: T[], page: number, perPage: number) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
}

export function getTotalPages(totalItems: number, perPage: number) {
    return Math.max(1, Math.ceil(totalItems / perPage));
}