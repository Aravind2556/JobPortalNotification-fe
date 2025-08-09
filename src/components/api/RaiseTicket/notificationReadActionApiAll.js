import React from 'react'

export const notificationReadActionApiAll = (id, BeURL) => {
    fetch(`${BeURL}/ticket-read-status-all`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
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
