import { useState } from "react";

interface Props {
    onImageUpload: (imageUrl: string | null) => void;
}

const ImageUploader: React.FC<Props> = ({ onImageUpload }) => {
    const [image, setImage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type === "image/png") {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            onImageUpload(imageUrl);
        } else {
            setImage(null);
            alert("Por favor, selecione uma imagem no formato PNG.");
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        onImageUpload(null);
    };

    return (
        <div className="flex flex-col items-start">
            <input
                id="file-upload"
                type="file"
                accept=".png"
                onChange={handleFileChange}
                className="hidden"/>

            {!image && (
                <label
                    htmlFor="file-upload"
                    className="
                        h-[48px] px-6 rounded-[30px] font-medium text-[15px]
                        bg-[#2ecc71] text-white hover:bg-[#27ae60] transition cursor-pointer
                        flex items-center justify-center
                    ">
                    Adicionar Foto
                </label>
            )}

            {image && (
                <div className="flex flex-col items-start gap-4">
                    <div className="w-[300px] h-[200px] overflow-hidden rounded-lg shadow-md">
                        <img
                            src={image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        onClick={handleRemoveImage}
                        type="button"
                        className="
                            h-[48px] px-6 rounded-[30px] font-medium text-[15px]
                            bg-[#e0e0e0] text-[#34495e] hover:bg-[#d5d5d5] transition
                        ">
                        Remover Foto
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;