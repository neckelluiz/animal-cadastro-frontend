import type { Animal } from "../types/animal";

export function filterAnimals(animals: Animal[], term: string): Animal[] {
    if (!term?.trim()) return animals;
    const t = term.toLowerCase();
    return animals.filter(a =>
        (a.especie ?? "").toLowerCase().includes(t) ||
        (a.raca ?? "").toLowerCase().includes(t) ||
        (a.nome ?? "").toLowerCase().includes(t)
    );
}