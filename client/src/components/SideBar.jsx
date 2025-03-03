import React, { useContext, useState } from "react";
import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { chatContext } from "../context/chatContext";
import PotentialChats from "./PotentialCharts";
import ChatListItem from "./ChatListItem";
import Notification from "./Notification";

const SideBar = ({ user }) => {
  const { logoutUser } = useContext(AuthContext);
  const {
    userChats,
    isUserChatsLoading,
    potentialChats,
    createChat,
    updateCurrentChat,
    onlineUsers,
    notifications,
  } = useContext(chatContext);

  return (
    <div className="w-full bg-gray-900 text-white flex flex-col h-screen">
      <div className="p-6 text-2xl font-bold border-b border-gray-700 flex justify-between items-center">
        <div>WebChat</div>
        <div>
          <Notification />
        </div>
      </div>

      <PotentialChats
        potentialChats={potentialChats}
        createChat={createChat}
        user={user}
        onlineUsers={onlineUsers}
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-2 p-2">
          {isUserChatsLoading ? (
            <p className="text-white p-3">Loading chats...</p>
          ) : userChats?.length > 0 ? (
            userChats.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                user={user}
                updateCurrentChat={updateCurrentChat}
                onlineUsers={onlineUsers}
                notifications={notifications}
              />
            ))
          ) : (
            <p className="text-white p-3">No chats available.</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-800 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img
            src={user?.avatar || "/profile-pic.svg"}
            alt={user?.name}
            className="w-10 h-10 border-1 rounded-full mr-3"
          />
          <p className="font-medium">{user?.name}</p>
        </div>

        <button
          className="p-3 bg-red-500 rounded-full hover:bg-red-600"
          onClick={logoutUser}
        >
          <FaSignOutAlt className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
