import React from 'react'

export const resolveApi = (ticketId, BeURL) => {
    fetch(`${BeURL}/resolve-ticket`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ticketId })
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
            console.log("Error while resolve ticket:", err);
            alert("Unable to resolve ticket. Please try again later.");
        })
}
