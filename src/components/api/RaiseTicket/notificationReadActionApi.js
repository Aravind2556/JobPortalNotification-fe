import React from 'react'

export const notificationReadActionApi = (id, BeURL) => {
    if (!id || !BeURL) {
        console.log("Missing required parameters");
        return;
    }  
    
    fetch(`${BeURL}/ticket-read-status`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    })
        .then(res => res.json())
        .then(data => {
            if (data?.success === true) {
                alert(data.message)
                window.location.reload()
            }
            else {
                alert(data.message)
            }
        })
        .catch(err => {
            console.log("Error while raising ticket:", err);
            alert("Unable to raise ticket. Please try again later.");
        })
}
