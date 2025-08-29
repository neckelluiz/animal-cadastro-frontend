import { useEffect, useState } from "react";
import type { AnimalFormData } from "../types/animal";
import ImageUploader from "./ImagemUpload";

interface Props {
    onSubmit: (data: AnimalFormData) => void | Promise<void>;
    initialData?: Partial<AnimalFormData>;
    onCancel: () => void;
    isCreating: boolean;
}

export default function AnimalForm({ onSubmit, initialData, onCancel, isCreating }: Props) {
    const [formData, setFormData] = useState<AnimalFormData>({
        especie: initialData?.especie ?? "",
        raca: initialData?.raca ?? "",
        sexo: initialData?.sexo ?? "",
        idade_aproximada: initialData?.idade_aproximada ?? "",
        tamanho: initialData?.tamanho ?? "",
        urlImagem: initialData?.urlImagem ?? "",
    });

    useEffect(() => {
        setFormData({
            especie: initialData?.especie ?? "",
            raca: initialData?.raca ?? "",
            sexo: initialData?.sexo ?? "",
            idade_aproximada: initialData?.idade_aproximada ?? "",
            tamanho: initialData?.tamanho ?? "",
            urlImagem: initialData?.urlImagem ?? "",
        });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (imageUrl: string) => {
        setFormData(prev => ({ ...prev, urlImagem: imageUrl }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="text-left">
                <label htmlFor="especie" className="block mb-1 font-medium text-[#34495e]">
                    Espécie
                </label>
                <input
                    id="especie"
                    name="especie"
                    placeholder="Ex: Cachorro, Gato, Pássaro"
                    value={formData.especie}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e9ecef] rounded-[30px] text-[1rem]
                     bg-[#f8f9fa] transition focus:border-[#2ecc71] focus:bg-white
                     focus:shadow-[0_0_0_4px_rgba(46,204,113,0.1)] outline-none"
                />
            </div>

            <div className="text-left">
                <label htmlFor="raca" className="block mb-1 font-medium text-[#34495e]">
                    Raça
                </label>
                <input
                    id="raca"
                    name="raca"
                    placeholder="Raça do animal"
                    value={formData.raca}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e9ecef] rounded-[30px] text-[1rem]
                     bg-[#f8f9fa] transition focus:border-[#2ecc71] focus:bg-white
                     focus:shadow-[0_0_0_4px_rgba(46,204,113,0.1)] outline-none"
                />
            </div>

            <div className="text-left">
                <label htmlFor="sexo" className="block mb-1 font-medium text-[#34495e]">
                    Sexo
                </label>
                <select
                    id="sexo"
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e9ecef] rounded-[30px] text-[1rem]
                     bg-[#f8f9fa] transition focus:border-[#2ecc71] focus:bg-white
                     focus:shadow-[0_0_0_4px_rgba(46,204,113,0.1)] outline-none"
                >
                    <option value="">Selecione o sexo</option>
                    <option value="MACHO">Macho</option>
                    <option value="FEMEA">Fêmea</option>
                </select>
            </div>

            <div className="text-left">
                <label htmlFor="idade_aproximada" className="block mb-1 font-medium text-[#34495e]">
                    Idade
                </label>
                <input
                    id="idade_aproximada"
                    name="idade_aproximada"
                    type="number"
                    placeholder="Ex: 3"
                    value={String(formData.idade_aproximada ?? "")}
                    onChange={handleChange}
                    min={0}
                    className="w-full px-4 py-3 border border-[#e9ecef] rounded-[30px] text-[1rem]
                     bg-[#f8f9fa] transition focus:border-[#2ecc71] focus:bg-white
                     focus:shadow-[0_0_0_4px_rgba(46,204,113,0.1)] outline-none"
                />
            </div>

            <div className="text-left">
                <label htmlFor="tamanho" className="block mb-1 font-medium text-[#34495e]">
                    Tamanho
                </label>
                <select
                    id="tamanho"
                    name="tamanho"
                    value={formData.tamanho}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e9ecef] rounded-[30px] text-[1rem]
               bg-[#f8f9fa] transition
              outline-none ">
                    <option value="">Selecione um tamanho</option>
                    <option value="PEQUENO">Pequeno</option>
                    <option value="MEDIO">Médio</option>
                    <option value="GRANDE">Grande</option>
                </select>
            </div>

            <div className="text-left">
                <label htmlFor="imageUploader" className="block mb-1 font-medium text-[#34495e]">
                    URL da Foto
                </label>
                <ImageUploader onImageUpload={handleImageUpload}/>
            </div>

            <div className="flex justify-end gap-4 mt-4 max-[768px]:flex-col">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 h-[48px] px-6 rounded-[30px] font-medium text-[15px] transition
                    bg-[#e0e0e0] text-[#34495e] hover:bg-[#d5d5d5] max-[768px]:w-full">
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex-1 h-[48px] px-6 rounded-[30px] font-medium text-[15px] transition
                    bg-[#2ecc71] text-white hover:bg-[#27ae60] max-[768px]:w-full">
                    {isCreating ? "Criar" : "Atualizar"}
                </button>
            </div>
        </form>
    );
}