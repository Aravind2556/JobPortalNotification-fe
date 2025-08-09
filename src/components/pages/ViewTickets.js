import React, { useContext, useEffect } from 'react';
import { DContext } from '../../context/Datacontext';
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";

export const ViewTickets = () => {
    const { handleTickets, handleResolve, handleViewTicketsId, getTicketsViewId, currentUser, getTickets } = useContext(DContext);

    useEffect(() => {
        handleTickets();
    }, []);

    const handleAction = (ticketId) => handleViewTicketsId(ticketId);
    const handleResolveAction = (ticketId) => handleResolve(ticketId);

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 md:p-10 lg:p-14 xl:p-20 max-w-[1600px] mx-auto">

            {/* Left Column */}
            <div className="flex flex-col gap-6 w-full lg:w-1/2 xl:w-2/5">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full">
                    <div className="p-4 text-primary-500 rounded-t-2xl capitalize">
                        <h2 className="font-bold text-lg md:text-xl">Profile</h2>
                    </div>
                    <div className='w-full h-[1px] bg-gray-100'></div>
                    <div className="p-4 space-y-4 text-sm md:text-base">
                        {['fullname', 'email', 'contact', 'role'].map((field, idx) => (
                            <div key={idx}>
                                <p className="font-semibold text-gray-700 capitalize">{field.replace('_', ' ')}</p>
                                <p className="text-gray-500">{getTicketsViewId?.user?.[field]}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ticket Info */}
                <div className="bg-white rounded-2xl shadow-lg w-full">
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between p-4 text-white rounded-t-2xl gap-3'>
                        <h2 className="font-bold text-lg text-primary-500">Ticket Information</h2>
                        <span
                            className={`inline-flex items-center justify-center gap-1 px-2 py-1 rounded-full font-semibold text-xs md:text-sm ${getTicketsViewId?.ticket?.status === 'raised'
                                    ? 'bg-yellow-700 text-white'
                                    : 'bg-green-500 text-white'
                                }`}
                        >
                            {getTicketsViewId?.ticket?.status === 'raised' ? (
                                <>Pending <IoCheckmark /></>
                            ) : (
                                <>Resolved <IoCheckmarkDone /></>
                            )}
                        </span>
                    </div>
                    <div className='w-full h-[1px] bg-gray-100'></div>
                    <div className="p-4 space-y-4 text-sm md:text-base">
                        <div>
                            <p className="font-semibold text-gray-700">Ticket ID</p>
                            <p className="text-gray-500">{getTicketsViewId?.ticket?.ticketId}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Subject</p>
                            <p className="text-gray-500">{getTicketsViewId?.ticket?.subject}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Message</p>
                            <p className="text-gray-500">{getTicketsViewId?.ticket?.message}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Created At</p>
                            <p className="text-gray-500">
                                {getTicketsViewId?.ticket?.createdAt &&
                                    new Date(getTicketsViewId?.ticket?.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {getTicketsViewId?.ticket?.status === 'raised' &&
                            ['admin'].includes(currentUser?.role) && (
                                <button
                                    type="button"
                                    onClick={() => handleResolveAction(getTicketsViewId?.ticket?.ticketId)}
                                    className="inline-flex items-center gap-1 px-5 py-3 rounded-lg font-bold text-sm 
                             bg-primary-500 hover:bg-primary-600 text-white w-full sm:w-auto"
                                >
                                    Resolve
                                </button>
                            )}
                    </div>
                </div>
            </div>

            {/* Right Column: Ticket List */}
            <div className="w-full lg:w-1/2 xl:w-3/5 bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
                {getTickets?.length > 0 ? (
                    <div className="min-w-full text-xs sm:text-sm md:text-base">
                        {/* Header */}
                        <div className="bg-white h-[64px] font-semibold flex items-center sticky top-0 z-10">
                            <p className="px-4 py-3 text-center flex-1">Sl.no</p>
                            <p className="px-4 py-3 text-center flex-1">Subject</p>
                            <p className="px-4 py-3 text-center flex-1">Status</p>
                        </div>

                        {/* Scrollable Tickets */}
                        <div className="max-h-[75vh] overflow-y-auto space-y-1">
                            {getTickets.map((ticket, index) => (
                                <div
                                    key={ticket.ticketId}
                                    onClick={() => handleAction(ticket?.ticketId)}
                                    className="bg-white text-gray-600 rounded-[3px] h-[64px] flex items-center cursor-pointer hover:bg-gray-50"
                                >
                                    <p className="px-4 py-3 text-center flex-1">{index + 1}</p>
                                    <p
                                        className=" px-4 py-3 text-center flex-1 truncate whitespace-nowrap overflow-hidden max-w-[150px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px]"
                                        title={ticket.subject} // Tooltip shows full text on hover (desktop)
                                    >
                                        {ticket.subject}
                                    </p>


                                    <div className="px-4 py-3 text-center flex-1">
                                        <span
                                            className={`inline-flex items-center justify-center gap-1 px-2 py-1 rounded-full font-semibold text-xs md:text-sm ${ticket?.status === 'raised'
                                                    ? 'bg-yellow-700 text-white'
                                                    : 'bg-green-500 text-white'
                                                }`}
                                        >
                                            {ticket?.status === 'raised' ? (
                                                <>Pending <IoCheckmark /></>
                                            ) : (
                                                <>Resolved <IoCheckmarkDone /></>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-center py-5 text-gray-500">No tickets found</p>
                )}
            </div>
        </div>
    );
};
