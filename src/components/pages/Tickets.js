import React, { useContext, useEffect } from "react";
import { DContext } from "../../context/Datacontext";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Tickets = () => {
    const { handleTickets, getTickets, currentUser, handleViewTicketsId } = useContext(DContext);
    const navigate = useNavigate()

    useEffect(() => {
        handleTickets();
    }, []);

    const handleAction = (ticketId) => {
        handleViewTicketsId(ticketId)  
        navigate('/viewtickets')      
    }

    return (
        <div className="w-full mx-auto bg-gray-50 py-8 px-4 sm:px-8 md:px-20 lg:px-52">
            {/* Heading */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold">Manage Tickets</h2>
                    <p className="text-sm text-gray-500">
                        Track ticket progress and resolve issues efficiently.
                    </p>
                </div>
                {['job-seeker', 'employer'].includes(currentUser?.role) && (
                    <button
                        type="button"
                        onClick={() => window.location.href ='/raise-ticket'}
                        className="bg-primary-500 text-white px-3 py-1 rounded-md font-semibold text-sm hover:bg-primary-600 transition-colors"
                    >
                        + Create Ticket
                    </button>
                )}
            </div>
            {/* Table */}
            {getTickets?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg sm:ml-16 md:ml-0 lg:ml-16">
                    <div className="min-w-full text-sm space-y-1">
                        {/* Header */}
                        <div className="bg-white rounded-[3px] h-[64px] flex items-center text-gray-600 sticky top-0 z-10">
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Sl.no</p>
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Subject</p>
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Message</p>                  
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Time</p>
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Action</p>
                        </div>

                        {/* Rows */}
                        <div className={`overflow-y-auto space-y-1`} style={{ maxHeight: "70vh" }}>
                            {getTickets.map((ticket, index) => {
                                if (['admin','job-seeker', 'employer'].includes(currentUser?.role)) {
                                    return (
                                        <div
                                            key={index}
                                            className={`bg-white text-gray-600 rounded-[3px] h-[64px] flex items-center cursor-pointer`}
                                            onClick={() => handleAction(ticket?.ticketId)}
                                            onTouchStart={() => handleAction(ticket?.ticketId)}
                                        >
                                            <p className="px-4 py-3 text-center  w-1/4 truncate">{index + 1}</p>
                                            <p className="px-4 py-3 text-center  w-1/4 truncate">{ticket?.subject}</p>
                                            <p className="px-4 py-3 text-center  w-1/4 truncate">{ticket?.message}</p>
                                            <p className="px-4 py-3 text-center  w-1/4 truncate">
                                                {new Date(ticket?.createdAt).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true
                                                })}
                                            </p>
                                            <div className="px-4 py-3 text-center w-1/4 truncate">
                                                <span
                                                    className={`inline-flex items-center justify-center gap-1 px-2 py-1 rounded-full font-semibold text-xs ${ticket?.status === 'raised'
                                                            ? 'bg-yellow-700 text-white'
                                                            : 'bg-green-500 text-white'
                                                        }`}
                                                >
                                                    {ticket?.status === 'raised' ? (
                                                        <>
                                                            Pending
                                                            <IoCheckmark />
                                                        </>
                                                    ) : (
                                                        <>
                                                            Resolved
                                                            <IoCheckmarkDone />
                                                        </>
                                                    )}
                                                </span>
                                            </div>

                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No notifications found</p>
            )}
        </div>
    );
};