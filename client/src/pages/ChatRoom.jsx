import React, { useContext, useState } from "react";
import SideBar from "../components/SideBar";
import { AuthContext } from "../context/AuthContext";
import ChatWindow from "../components/ChatWindow";
import { chatContext } from "../context/chatContext";

const ChatRoom = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, setCurrentChat } = useContext(chatContext);

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`w-full md:w-1/4 bg-gray-900 md:block ${
          currentChat ? "hidden md:block" : "block"
        }`}
      >
        <SideBar user={user} onSelectUser={setCurrentChat} />
      </div>

      <div
        className={`w-full md:w-3/4 ${
          currentChat ? "block" : "hidden md:block"
        }`}
      >
        <ChatWindow user={user} selectedUser={currentChat} />
      </div>
    </div>
  );
};

export default ChatRoom;
