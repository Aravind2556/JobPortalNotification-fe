import React, { useContext, useEffect } from "react";
import { DContext } from "../../context/Datacontext";
import { FaClipboardList, FaInfoCircle, FaBullhorn } from "react-icons/fa";

export const Notification = () => {
    const { handleNotification, getNotification, currentUser, notificationReadAction, notificationReadActionAll } = useContext(DContext);

    useEffect(() => {
        handleNotification();
    }, []);

    const getIcon = (type, extraClass = "") => {
        switch (type) {
            case "Job Application":
                return <FaClipboardList className={`${extraClass} text-xl`} />;
            case "Assistance-alert":
                return <FaInfoCircle className={`${extraClass} text-xl`} />;
            case "System alert":
                return <FaBullhorn className={`${extraClass} text-xl`} />;
            default:
                return <FaInfoCircle className={`${extraClass} text-xl`} />;
        }
    };

    const handleAction = (id) => {
        notificationReadAction(id)
    };

    const handleReadAllAction = (id) => {
        notificationReadActionAll(id)
    }



    return (
        <div className="w-full mx-auto bg-gray-50 py-8 px-4 sm:px-8 md:px-20 lg:px-52">
            {/* Heading */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold">My Notifications</h2>
                    <p className="text-sm text-gray-500">
                        Track job applications, support updates, and platform alerts in real-time.
                    </p>
                </div>
                <button type="button" onClick={() => handleReadAllAction(currentUser?.id)}
                    onTouchStart={() => handleReadAllAction(currentUser?.id)}  className="text-primary-500 font-semibold text-sm hover:underline">
                    Mark all as read
                </button>
            </div>

            {/* Table */}
            {getNotification?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg sm:ml-16 md:ml-0 lg:ml-16">
                    <div className="min-w-full text-sm space-y-1">
                        {/* Header */}
                        <div className="bg-white rounded-[3px] h-[64px] flex items-center text-gray-600 sticky top-0 z-10">
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Notification Title</p>
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Message Preview</p>
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Type</p>
                            <p className="px-4 py-3 text-center font-medium w-1/4 truncate">Time</p>
                        </div>

                        {/* Rows */}
                        <div className={`overflow-y-auto space-y-1`} style={{ maxHeight: "70vh" }}>
                            {getNotification.map((notify, index) => {
                                if (['admin','job-seeker', 'employer'].includes(currentUser?.role)) {
                                    return (
                                        <div
                                            key={index}
                                            className={`bg-white ${notify?.isRead ? "text-gray-400" : "font-semibold"} rounded-[3px] h-[64px] flex items-center cursor-pointer`}
                                            onClick={() => handleAction(notify?._id)}
                                            onTouchStart={() => handleAction(notify?._id)}
                                        >
                                            <div className="px-4 py-3 flex text-center items-center gap-2 w-1/4 truncate">
                                                <span className="text-primary-300">{getIcon(notify?.type, "text-primary-300")}</span>
                                                <span>{notify?.title}</span>
                                            </div>
                                            <p className="px-4 py-3 text-center  w-1/4 truncate">
                                                {notify?.description}
                                            </p>
                                            <p className="px-4 py-3 text-center  w-1/4 truncate">
                                                {notify?.type}
                                            </p>
                                            <p className="px-4 py-3 text-center  w-1/4 truncate">
                                                {new Date(notify?.createdAt).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true
                                                })}
                                            </p>
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
