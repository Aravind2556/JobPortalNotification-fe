import React from 'react'
export const raiseTicketApi = (raiseTicketFormData, BeURL) => {
  if (!raiseTicketFormData || !BeURL) {
    console.log("Missing required parameters");
    return;
  }
      fetch(`${BeURL}/ticket-raise`,{
        method : 'POST',
        credentials : 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(raiseTicketFormData)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data?.success === true){
          alert(data.message)
        }
        else{
          alert(data.message)
        }
      })
      .catch(err=>{
        console.log("Error while raising ticket:", err);
        alert("Unable to raise ticket. Please try again later.");
      })    
  }




