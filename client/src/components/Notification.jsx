import React, { useContext, useState } from "react";
import { chatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";
import moment from "moment";

const Notification = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationAsRead,
    markNotificationAsRead,
  } = useContext(chatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);
    return { ...n, senderName: sender?.name };
  });

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleMarkAllRead = () => {
    markAllNotificationAsRead(notifications);
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transition-all duration-200">
          <div className="p-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Notifications
              </h3>
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-semibold bg-gray-700 p-2 rounded-md text-white hover:bg-gray-800"
              >
                Mark all as read
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {modifiedNotifications?.length ? (
                modifiedNotifications.map((n, index) => (
                  <div
                    key={index}
                    className={`p-2 mb-2 rounded-lg border text-[10px] text-left cursor-pointer ${
                      n.isRead
                        ? "bg-gray-100 border-gray-300 text-gray-600 font-medium"
                        : "bg-blue-100 border-blue-400 text-blue-900 font-medium"
                    }`}
                    onClick={() => {
                      markNotificationAsRead(n, userChats, user, notifications);
                      setIsExpanded(false);
                    }}
                  >
                    <span className="block">{`${n.senderName} sent you a new message`}</span>
                    <span className="text-gray-500">
                      {moment(n.date).calendar()}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-gray-500 text-sm">
                  No notifications yet.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div onClick={handleClick} className="relative cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>

        {unreadNotifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadNotifications.length > 99
              ? "99+"
              : unreadNotifications.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default Notification;
