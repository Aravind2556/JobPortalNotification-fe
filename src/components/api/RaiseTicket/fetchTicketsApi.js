import React from 'react'

export const fetchTicketsApi = (setGetTickets, BeURL) => {

    fetch(`${BeURL}/fetch-tickets`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                setGetTickets(data?.ticket)
            }
            else {
                setGetTickets("No tikcets found")
            }
        })
        .catch(err => {
            console.log("Error while get tikcets:", err);
            alert("Unable to get tikcets. Please try again later.");
        })
}

