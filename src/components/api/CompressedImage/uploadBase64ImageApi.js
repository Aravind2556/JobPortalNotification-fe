import React from 'react'

export const uploadBase64ImageApi = (compressedBase64, BeURL) => {
    fetch(`${BeURL}/upload-base64-image`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ image: compressedBase64 })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log("Image uploaded successfully:", data);
        } else {
            console.error("Error uploading image:", data.message);
        }
    })
    .catch(err => {
        console.error("Error in uploadBase64ImageApi:", err);
    });
}
