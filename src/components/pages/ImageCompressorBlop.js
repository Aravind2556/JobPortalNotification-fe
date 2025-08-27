import React, { useContext, useState } from "react";
import { DContext } from "../../context/Datacontext";

export const ImageCompressorBlob = () => {
    const { handleBlobimage } = useContext(DContext);
    const [preview, setPreview] = useState(null);
    const [compressedBlob, setCompressedBlob] = useState(null);

    // File select → compress
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageBitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // simple resize
        canvas.width = imageBitmap.width / 2;
        canvas.height = imageBitmap.height / 2;
        ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

        // output Blob
        canvas.toBlob(
            (blob) => {
                if (!blob) return;
                setCompressedBlob(blob);
                setPreview(URL.createObjectURL(blob)); // preview
            },
            "image/jpeg",
            0.7
        );
    };

    const uploadToBackend = () => {
        if (!compressedBlob) return;
        handleBlobimage(compressedBlob); 
    };

    return (
        <div className="p-4">
            <h2 className="font-bold text-lg mb-2">Image Compressor (Blob)</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {preview && (
                <div className="mt-4">
                    <img
                        src={preview}
                        alt="Compressed Preview"
                        className="w-64 border rounded"
                    />
                </div>
            )}

            {compressedBlob && (
                <button
                    onClick={uploadToBackend}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                >
                    Upload to Backend
                </button>
            )}
        </div>
    );
};
