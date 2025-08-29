import { useEffect, useMemo, useState } from "react";
import type { Animal, AnimalFormData } from "../types/animal";
import { listAnimals, createAnimal, updateAnimal, deleteAnimal } from "../services/animalService";
import { filterAnimals } from "../utils/filterAnimals";
import { getPageSlice, getTotalPages } from "../utils/paginate";
import AnimalForm from "../components/AnimalForm";
import AnimalCard from "../components/AnimalCard";

export default function AnimalList() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const animalsPerPage = 8;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await listAnimals();
                setAnimals(data);
            } catch (err: any) {
                setError(err?.message ?? "Erro ao buscar dados da API");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredAnimals = useMemo(
        () => filterAnimals(animals, searchTerm),
        [animals, searchTerm]
    );

    const totalPages = useMemo(
        () => getTotalPages(filteredAnimals.length, animalsPerPage),
        [filteredAnimals.length]
    );

    const currentAnimals = useMemo(
        () => getPageSlice(filteredAnimals, currentPage, animalsPerPage),
        [filteredAnimals, currentPage]
    );

    const handleOpenCreateForm = () => {
        setIsCreating(true);
        setSelectedAnimal(null);
        setIsEditing(true);
    };

    const handleSelectAnimal = (animal: Animal) => {
        setSelectedAnimal(animal);
        setIsCreating(false);
        setIsEditing(false);
    };

    const handleCancelForm = () => {
        setSelectedAnimal(null);
        setIsCreating(false);
        setIsEditing(false);
    };

    const handleCreate = async (payload: AnimalFormData) => {
        try {
            const saved = await createAnimal(payload);
            setAnimals(prev => [...prev, saved]);
            setIsCreating(false);
            setSelectedAnimal(null);
        } catch {
            alert("Erro ao criar animal");
        }
    };

    const handleUpdate = async (payload: AnimalFormData) => {
        if (!selectedAnimal) return;
        try {
            const updated = await updateAnimal(selectedAnimal.id, payload);
            setAnimals(prev => prev.map(a => (a.id === updated.id ? updated : a)));
            setSelectedAnimal(null);
            setIsEditing(false);
        } catch {
            alert("Erro ao atualizar animal");
        }
    };

    const handleDelete = async (id: Animal["id"]) => {
        if (!confirm("Tem certeza que deseja excluir este animal?")) return;
        try {
            await deleteAnimal(id);
            setAnimals(prev => prev.filter(a => a.id !== id));
            setSelectedAnimal(null);
            setIsEditing(false);
            alert("Animal excluído com sucesso!");
        } catch (err: any) {
            alert(`Erro: ${err?.message ?? "Falha ao excluir"}`);
        }
    };

    if (loading) return <p className="p-6 text-[#495057]">Carregando...</p>;
    if (error) return <p className="p-6 text-red-600">Erro: {error}</p>;

    return (
        <div className="min-h-screen bg-[#f7f9fc] text-[#495057] flex justify-center">
            {/* fonte semelhante à Poppins, aplique globalmente se preferir */}
            <div className="w-full max-w-none p-5 m-0 font-[Poppins,sans-serif]">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="m-0 font-semibold text-[2.5em] text-[#34495e]">Cadastro de Animais Abandonados</h1>
                    <p className="mt-[5px] text-[1.1em] text-[#7f8c8d] font-normal">
                        Gerencie as informações dos animais encontrados e resgatados.
                    </p>
                </div>

                {/* Content container */}
                <div className="bg-white rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-[30px] w-[calc(100%-40px)] mx-auto">
                    {/* Controls row */}
                    <div className="flex justify-between items-center mb-[30px] gap-5 max-[768px]:flex-col max-[768px]:items-stretch">
                        <div className="relative grow max-w-full max-[768px]:mb-[15px]">
              <span className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2 text-[#adb5bd] text-[1.1rem]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </span>
                            <input
                                type="text"
                                placeholder="Pesquise por raça ou espécie"
                                value={searchTerm}
                                onChange={e => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full py-[14px] pr-5 pl-[50px] border border-[#e9ecef] rounded-[30px] text-[1rem] outline-none transition
                           bg-[#f8f9fa] box-border focus:border-[#ced4da] focus:bg-white focus:shadow-[0_0_0_4px_rgba(46,204,113,0.1)]"
                            />
                        </div>

                        <button
                            className="h-12 px-6 inline-flex items-center justify-center rounded-full font-medium text-base transition-colors duration-200 cursor-pointer flex-shrink-0 bg-green-500 text-white hover:bg-green-600"
                            onClick={handleOpenCreateForm}
                        >
                            + Novo Animal
                        </button>

                    </div>

                    {/* Cards grid */}
                    <div
                        className="grid grid-cols-3 gap-[30px]
                       max-[992px]:grid-cols-2
                       max-[768px]:grid-cols-1"
                    >
                        {currentAnimals.map(animal => (
                            <AnimalCard
                                key={animal.id}
                                animal={animal}
                                selected={selectedAnimal?.id === animal.id}
                                onClick={handleSelectAnimal}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-3 mt-10">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`rounded-[8px] px-4 py-[10px] border font-medium transition
                  ${currentPage === i + 1
                                    ? "bg-[#2ecc71] text-white border-[#2ecc71]"
                                    : "bg-[#f0f2f5] text-[#6c757d] border-[#ced4da] hover:bg-[#e9ecef]"}`
                                }
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {(isCreating || selectedAnimal) && (
                    <div className="fixed inset-0 z-[1000] bg-[rgba(0,0,0,0.5)] flex justify-center items-center p-4">
                        {/* animação fadeIn igual à original */}
                        <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>

                        <div
                            className="relative bg-white rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-[30px] w-[90%] max-w-[500px] text-center"
                            style={{ animation: "fadeIn 0.3s ease-out" }}
                        >
                            <button
                                className="absolute top-[15px] right-5 text-[2.5em] border-none bg-transparent cursor-pointer text-[#888] transition
                           hover:text-[#333]"
                                onClick={handleCancelForm}
                                aria-label="Fechar"
                            >
                                &times;
                            </button>

                            {isEditing || isCreating ? (
                                <>
                                    <h2 className="mb-[25px] text-[1.8em] font-semibold text-[#34495e]">
                                        {isCreating ? "Novo Animal" : "Editar Animal"}
                                    </h2>
                                    <AnimalForm
                                        initialData={selectedAnimal ?? undefined}
                                        onSubmit={isCreating ? handleCreate : handleUpdate}
                                        onCancel={handleCancelForm}
                                        isCreating={isCreating}
                                    />
                                </>
                            ) : (
                                <>
                                    <h2 className="mb-[25px] text-[1.8em] font-semibold text-[#34495e]">
                                        {selectedAnimal?.nome || "Detalhes do Animal"}
                                    </h2>

                                    <div className="mb-5">
                                        <img
                                            src={
                                                selectedAnimal?.urlImagem ||
                                                "https://placehold.co/150x150/ccc/white?text=Sem+Foto"
                                            }
                                            alt={selectedAnimal?.nome || "Novo Animal"}
                                            className="w-[150px] h-[150px] object-cover rounded-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] mx-auto"
                                        />
                                    </div>

                                    <div
                                        className="grid grid-cols-2 gap-5 mb-5
                               max-[768px]:grid-cols-1"
                                    >
                                        <div className="bg-[#f8f9fa] p-[15px] rounded-[12px] text-left">
                                            <span className="block text-[0.9em] text-[#7f8c8d] mb-[5px]">Espécie</span>
                                            <span className="block text-[1.1em] font-medium text-[#34495e]">
                        {selectedAnimal?.especie}
                      </span>
                                        </div>
                                        <div className="bg-[#f8f9fa] p-[15px] rounded-[12px] text-left">
                                            <span className="block text-[0.9em] text-[#7f8c8d] mb-[5px]">Raça</span>
                                            <span className="block text-[1.1em] font-medium text-[#34495e]">
                        {selectedAnimal?.raca}
                      </span>
                                        </div>
                                        <div className="bg-[#f8f9fa] p-[15px] rounded-[12px] text-left">
                                            <span className="block text-[0.9em] text-[#7f8c8d] mb-[5px]">Idade</span>
                                            <span className="block text-[1.1em] font-medium text-[#34495e]">
                        {selectedAnimal?.idade_aproximada}
                      </span>
                                        </div>
                                        <div className="bg-[#f8f9fa] p-[15px] rounded-[12px] text-left">
                                            <span className="block text-[0.9em] text-[#7f8c8d] mb-[5px]">Tamanho</span>
                                            <span className="block text-[1.1em] font-medium text-[#34495e]">
                        {selectedAnimal?.tamanho}
                      </span>
                                        </div>
                                    </div>

                                    <div className="mt-[25px] flex w-full justify-end gap-[15px] max-[768px]:flex-col-reverse">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="min-w-[120px] h-[48px] inline-flex items-center justify-center rounded-[30px] font-medium text-[15px]
                                 transition bg-[#2ecc71] text-white hover:bg-[#27ae60] flex-1 max-[768px]:w-full"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                 className="mr-2 w-4 h-4">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                                            </svg>
                                            Editar
                                        </button>

                                        {selectedAnimal && (
                                            <button
                                                type="button"
                                                className="min-w-[120px] h-[48px] inline-flex items-center justify-center rounded-[30px] font-medium text-[15px]
                                   transition bg-[#e74c3c] text-white hover:bg-[#c0392b] flex-1 max-[768px]:w-full"
                                                onClick={() => handleDelete(selectedAnimal.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                     className="mr-2 w-4 h-4">
                                                    <path d="M3 6h18"></path>
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                    <line x1="10" x2="10" y1="11" y2="17"></line>
                                                    <line x1="14" x2="14" y1="11" y2="17"></line>
                                                </svg>
                                                Excluir
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
