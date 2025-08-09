import React from 'react'

export const fetchNotificationApi = (setGetNotification, BeURL) => {

    fetch(`${BeURL}/fetch-notification`,{
        method : 'GET',
        credentials : 'include'
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.success === true){
            setGetNotification(data?.notifications) 
        }
        else{
            setGetNotification("No notifications found")
        }
    })
    .catch(err=>{
        console.log("Error while get notification:", err);
        alert("Unable to get notifiation. Please try again later.");
    })
 
}

