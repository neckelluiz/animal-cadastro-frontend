import type { Animal } from "../types/animal";

interface Props {
    animal: Animal;
    selected?: boolean;
    onClick?: (animal: Animal) => void;
}

export default function AnimalCard({ animal, selected, onClick }: Props) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onClick?.(animal)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.(animal)}
            className={[
                "group cursor-pointer bg-white rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
                "transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]",
                "border",
                selected
                    ? "border-[#2ecc71] ring-4 ring-[rgba(46,204,113,0.15)]"
                    : "border-[#eef1f4]"
            ].join(" ")}>

            <div className="overflow-hidden rounded-t-[16px]">
                <img
                    src={
                        animal.urlImagem ||
                        "https://placehold.co/600x400/f8f9fa/adb5bd?text=Sem+Foto"
                    }
                    alt={animal.nome || animal.especie}
                    className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
            </div>

            <div className="p-[16px]">
                <h3 className="m-0 text-[1.05rem] font-semibold text-[#34495e]">
                    {animal.nome || animal.especie}
                </h3>

                <p className="mt-[6px] mb-0 text-[0.95rem] text-[#7f8c8d]">
                    Raça: <span className="font-medium text-[#495057]">{animal.raca}</span>
                </p>

                <div className="mt-[10px] grid grid-cols-2 gap-2 text-[0.85rem]">
                    {animal.idade_aproximada !== undefined && (
                        <div className="rounded-[10px] bg-[#f8f9fa] px-2 py-[6px] text-[#34495e] flex flex-col">
                            <span className="text-[#7f8c8d] mb-1">Idade:</span>
                            <span className="font-medium text-[1.1em]">{animal.idade_aproximada}</span>
                        </div>
                    )}
                    {animal.tamanho && (
                        <div className="rounded-[10px] bg-[#f8f9fa] px-2 py-[6px] text-[#34495e]">
                            <span className="text-[#7f8c8d]">Tamanho: </span>
                            <span className="font-medium">{animal.tamanho}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
