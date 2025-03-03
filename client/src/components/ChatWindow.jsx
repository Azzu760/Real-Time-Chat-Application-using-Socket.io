import React, { useContext, useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaTelegramPlane,
  FaSmile,
  FaComments,
} from "react-icons/fa";
import { chatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    setCurrentChat,
    messages,
    isMessageLoading,
    messageError,
    sendTextMessage,
    onlineUsers,
  } = useContext(chatContext);

  const [textMessage, setTextMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scroll = useRef(null);

  const isOnline = onlineUsers?.some(
    (onlineUser) => onlineUser?.userId === currentChat?._id
  );

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleBack = () => setCurrentChat(null);

  const handleEmojiClick = (emojiObject) =>
    setTextMessage((prev) => prev + emojiObject.emoji);

  const handleSendMessage = () => {
    if (textMessage.trim()) {
      sendTextMessage(textMessage.trim(), user, currentChat?._id);
      setTextMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChat) {
    return (
      <div className="flex flex-1 h-full items-center justify-center flex-col text-gray-500 text-lg">
        <FaComments className="text-4xl mb-2" />
        <p>Select a chat to start a conversation.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-white h-screen">
      {/* Chat Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center space-x-3 shadow-md">
        <button
          className="md:hidden p-2 mr-2 rounded-full hover:bg-gray-900"
          onClick={handleBack}
        >
          <FaArrowLeft className="text-white text-xl" />
        </button>
        <img
          src={currentChat.avatar || "/profile-pic.svg"}
          alt={currentChat.name}
          className="w-10 h-10 border-1 rounded-full"
        />
        <div className="text-left">
          <p className="font-semibold">{currentChat.name}</p>
          <span
            className={`text-sm ${
              isOnline ? "text-green-500" : "text-gray-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {isMessageLoading ? (
          <p className="text-gray-500 text-center">Loading messages...</p>
        ) : messageError ? (
          <p className="text-red-500 text-center">{messageError}</p>
        ) : messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`flex flex-col ${
                  msg.senderId === user._id ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center">
                  {msg.senderId !== user._id && (
                    <img
                      src={currentChat.avatar || "/profile-pic.svg"}
                      alt="avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div
                    className={`p-3 rounded-xl shadow-md max-w-xs ${
                      msg.senderId === user._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.senderId === user._id && (
                    <img
                      src={user.avatar || "/profile-pic.svg"}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full ml-2"
                    />
                  )}
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  {moment(msg.createdAt).calendar()}
                </p>
              </div>
            ))}
            <div ref={scroll}></div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No messages found!</p>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 flex items-center relative">
        <button
          className="p-2 mr-2 text-gray-500 hover:text-gray-800"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FaSmile className="text-2xl" />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-14 left-4 z-10 shadow-lg bg-white rounded-lg">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <input
          type="text"
          placeholder="Type a message..."
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-3 border rounded-lg outline-none focus:ring focus:ring-blue-400"
        />
        <button
          className={`ml-3 px-4 py-2 rounded-lg ${
            textMessage.trim()
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          onClick={handleSendMessage}
          disabled={!textMessage.trim()}
        >
          <FaTelegramPlane className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
