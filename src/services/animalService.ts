import  { API_BASE_URL } from "./api";
import { fetchJson } from "../utils/fetchJson";
import type { Animal, AnimalFormData } from "../types/animal";

const base = `${API_BASE_URL}/animais`;

export async function listAnimals(): Promise<Animal[]> {
    return fetchJson<Animal[]>(base);
}

export async function createAnimal(payload: AnimalFormData): Promise<Animal> {
    return fetchJson<Animal>(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

export async function updateAnimal(id: Animal["id"], payload: AnimalFormData): Promise<Animal> {
    return fetchJson<Animal>(`${base}/${id}`, {
    method: "PUT",
        headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
});
}

export async function deleteAnimal(id: Animal["id"]): Promise<void> {
    await fetchJson<void>(`${base}/${id}`, { method: "DELETE" });
}