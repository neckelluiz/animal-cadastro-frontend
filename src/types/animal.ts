export interface Animal {
    id: number | string;
    nome?: string;
    especie: string;
    raca: string;
    sexo?: string;
    idade_aproximada?: number | string;
    tamanho?: string;
    urlImagem?: string;
}

export interface AnimalFormData {
    especie: string;
    raca: string;
    sexo?: string;
    idade_aproximada?: number | string;
    tamanho?: string;
    urlImagem?: string;
}

export interface ApiError extends Error {
    status?: number;
}

export interface Paginated<T> {
    items: T[];
    total: number;
    page: number;
    perPage: number;
}