import React from 'react'

export const fetchViewTicketsIdApi = (setGetTicketsViewId, ticketId, BeURL) => {
    fetch(`${BeURL}/fetch-tickets/${ticketId}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                setGetTicketsViewId({
                    ticket: data?.ticket,
                    user: data?.user
                });
                                
            }
            else {
                setGetTicketsViewId("No tikcets found")
            }
        })
        .catch(err => {
            console.log("Error while getting tickets:", err);
            alert("Unable to get tickets. Please try again later.");;
        }) 
}




