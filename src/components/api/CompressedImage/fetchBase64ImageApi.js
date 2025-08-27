import React from 'react'

export const fetchBase64ImageApi = (setAllBase64Image,BeURL) => {
    fetch(`${BeURL}/fetchbase64images`,{
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.success){
            setAllBase64Image(data.images)
            
        }
        else{
            console.log("Failed to fetch images:", data.message);
        }
    })
    .catch(err=>{
        console.log("Error in fetching images:", err);
    })
            
}
