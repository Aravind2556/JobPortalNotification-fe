import React, { useContext, useState } from "react";
import { DContext } from "../../context/Datacontext";
import { ImageCompressorBlob } from "./ImageCompressorBlop";


export const ImageCompressure = () => {
    const { compressedBase64Image, allBase64Image } = useContext(DContext);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Image compress function
    const handleImageUpload = () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const maxWidth = 800;
                const maxHeight = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
                compressedBase64Image(compressedBase64);
            };
        };
    };

    return (
        <div className="p-4">
            <h2 className="font-bold text-lg mb-2">Image Compressor</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button
                onClick={handleImageUpload}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Upload
            </button>
            {
                
                
                    allBase64Image.map((img, index) => (
                        <div key={index} className="mt-2">
                            <p className="text-sm">Image ID: {img.id}</p>   
                            <img src={img.image64} alt={`From DB ${index}`} className="mt-1 w-64 border rounded" />                            
                        </div>
                    ))
                
                
            }

            
            <div>
                <ImageCompressorBlob/>
            </div>

        </div>
    );
};
