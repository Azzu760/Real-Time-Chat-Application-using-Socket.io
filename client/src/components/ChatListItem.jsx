import React, { useContext } from "react";
import { useFetchRecipientUser } from "../hooks/useFetchRecipients";
import { chatContext } from "../context/chatContext";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";
import useFetchLatestMessage from "../hooks/useFetchLatestMessage";
import moment from "moment";

const defaultAvatar = "/profile-pic.svg";

const ChatListItem = ({ chat, user, updateCurrentChat, onlineUsers }) => {
  const { recipientUser: recipient } = useFetchRecipientUser(chat, user);

  const { latestMessage } = useFetchLatestMessage(chat);

  const { notifications, markThisUserNotificationAsRead } =
    useContext(chatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipient?._id
  );

  const isOnline = onlineUsers?.some(
    (onlineUser) => onlineUser?.userId === recipient?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }

    return shortText;
  };

  return (
    <div
      className="flex justify-between border-b items-center p-3 cursor-pointer hover:bg-gray-800"
      onClick={() => {
        updateCurrentChat(recipient);
        if (thisUserNotifications?.length != 0) {
          markThisUserNotificationAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="flex">
        <img
          src={recipient?.avatar || defaultAvatar}
          alt={recipient?.name || "User"}
          className="w-10 h-10 border-1 rounded-full mr-3"
        />
        <div className="flex-1 text-left">
          <p className="font-medium">{recipient?.name || "Unknown User"}</p>
          <span className="text-sm text-gray-400">
            {latestMessage?.text && (
              <span>Last Message: {truncateText(latestMessage.text, 50)}</span>
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-2 items-center">
        <p className="text-xs text-gray-500">
          {moment(latestMessage?.createdAt).calendar()}
        </p>
        <div className="flex items-center space-x-2">
          {thisUserNotifications?.length > 0 && (
            <span className="bg-red-500 w-6 h-6 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {thisUserNotifications.length}
            </span>
          )}

          <span
            className={`w-3 h-3 rounded-full border ${
              isOnline
                ? "bg-green-500 border-green-400"
                : "bg-gray-500 border-gray-400"
            }`}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
