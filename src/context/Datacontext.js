import { createContext, useEffect, useState } from "react";
import { raiseTicketApi } from '../components/api/RaiseTicket/raiseTicketApi'
import { fetchNotificationApi } from '../components/api/RaiseTicket/fetchNotificationApi'
import { notificationReadActionApi } from '../components/api/RaiseTicket/notificationReadActionApi'
import { notificationReadActionApiAll } from '../components/api/RaiseTicket/notificationReadActionApiAll'
import { fetchTicketsApi } from '../components/api/RaiseTicket/fetchTicketsApi'
import { fetchViewTicketsIdApi } from '../components/api/RaiseTicket/fetchViewTicketsIdApi'
import { resolveApi } from '../components/api/RaiseTicket/resolveApi'


export const DContext = createContext()

const DataContext = ({children}) => {

    const BeURL = process.env.REACT_APP_BeURL
    const [isAuth, setIsAuth] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [getNotification, setGetNotification] = useState([]);
    const [getTickets, setGetTickets] = useState([]);
    const [getTicketsViewId,setGetTicketsViewId]=useState({})


    useEffect(()=>{
        fetch(`${BeURL}/checkauth`,{
            credentials: "include"
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setIsAuth(true)
                setCurrentUser(data.user)
            }
            else{
                setIsAuth(false)
                setCurrentUser({})
            }
        })
        .catch(err=>{
            setIsAuth(null)
            setCurrentUser(null)
            console.log("Erron in fetching User:",err)
            alert("Trouble in connecting to the Server, please try again later.")
        })
    },[])

    const RaiseTicket = (raiseTicketFormData) => {
        raiseTicketApi(raiseTicketFormData,BeURL)
    }

    const handleNotification = () => {
        fetchNotificationApi(setGetNotification, BeURL);
    };

    const notificationReadAction = (id) => {
        notificationReadActionApi(id ,BeURL)
    }

    const notificationReadActionAll = (id) => {
        notificationReadActionApiAll(id, BeURL)
    }

    const handleTickets = () => {
        fetchTicketsApi(setGetTickets, BeURL);
    };

    const handleViewTicketsId = (ticketId) => {
        fetchViewTicketsIdApi(setGetTicketsViewId, ticketId, BeURL)
    }

    const handleResolve = (ticketId) => {
        resolveApi(ticketId, BeURL)
    }


    const handleLogout = () => {
        fetch(`${BeURL}/logout`,{
            credentials: "include"
        })
        .then(res=>res.json())
        .then(data=>{
            alert(data.message)
            if(data.success){
                setIsAuth(false)
                setCurrentUser({})
            }
        })
        .catch(err=>{
            console.log("Erron in Logout:",err)
            alert("Trouble in connecting to the Server, please try again later.")
        })
    }

    const data = { isAuth, currentUser, setIsAuth, setCurrentUser, BeURL, handleLogout, RaiseTicket, handleNotification, getNotification, notificationReadAction, notificationReadActionAll, handleTickets, getTickets, handleViewTicketsId, getTicketsViewId, handleResolve }

    return (
        <DContext.Provider value={data}>
            {children}
        </DContext.Provider>
    )
}

export default DataContext