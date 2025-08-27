// import React from 'react'

// export const uploadBlobImageApi = (BeURL,blob) => {
//     fetch(`${BeURL}/upload-blob-image`, {
//         method: "POST",
//         credentials: "include",
//         mode: "cors",
//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify({ image: blob })
//     })
//     .then(res => res.json())
//     .then(data => {
//         if (data.success) {
//             console.log("Blob Image uploaded successfully:", data);
//         } else {
//             console.error("Error uploading Blob image:", data.message);
//         }
//     })
//     .catch(err => {
//         console.error("Error in uploadBlobImageApi:", err);
//     });
// }






export const uploadBlobImageApi = (BeURL, blob) => {
    const formData = new FormData();
    formData.append("file", blob, "compressed.jpg"); // name, file, filename

    fetch(`${BeURL}/upload-blob-image`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: formData,  // <-- no headers needed, browser auto sets multipart
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log("Blob Image uploaded successfully:", data);
            } else {
                console.error("Error uploading Blob image:", data.message);
            }
        })
        .catch(err => {
            console.error("Error in uploadBlobImageApi:", err);
        });
};
