import { createContext, useEffect, useState, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const chatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Add online users
  useEffect(() => {
    if (socket === null || !user?._id) return;

    socket.emit("addNewUser", user._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, user]);

  // Send messages
  useEffect(() => {
    if (!socket || !newMessage) return;

    const recipientId = currentChat._id !== user?._id ? currentChat._id : null;

    if (recipientId) {
      socket.emit("sendMessage", { ...newMessage, recipientId });
    } else {
      console.log("⚠️ No valid recipient found!");
    }
  }, [newMessage, socket, currentChat, user]);

  // Receive messages and notification
  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (res) => {
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      // Ensure consistency with recipientId logic
      const recipientId =
        currentChat?._id !== user?._id ? currentChat?._id : null;

      const isChatOpen = recipientId === res.senderId;

      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat, user]);

  // Fetch users for potential chats
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);
      if (!response || response.error)
        return console.log("Error fetching users", response);

      const pChats = response.filter((u) => {
        if (user?._id === u._id) return false;
        return !userChats.some((chat) => chat.members.includes(u._id));
      });

      setPotentialChats(pChats);
      setAllUsers(response);
    };

    getUsers();
  }, [userChats, user]);

  // Fetch user's chat list
  useEffect(() => {
    const getUserChats = async () => {
      if (!user?._id) return;

      setIsUserChatsLoading(true);
      setUserChatsError(null);

      const response = await getRequest(`${baseUrl}/chats/${user._id}`);

      if (response?.error) {
        setUserChatsError(response.error);
      } else {
        setUserChats(response);
      }

      setIsUserChatsLoading(false);
    };

    getUserChats();
  }, [user]);

  // Fetch messages for the current chat
  useEffect(() => {
    if (!currentChat?._id) return;

    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessageError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      if (response?.error) {
        setMessageError(response.error);
      } else {
        setMessages(response);
      }

      setIsMessageLoading(false);
    };

    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage = () => {}) => {
      if (!textMessage.trim()) {
        console.log("You must type something...");
        return;
      }

      const newMsg = {
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMsg]);

      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify(newMsg)
      );

      if (response.error) {
        console.error("Message send error:", response.error);
        return;
      }

      setNewMessage(response);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
    console.log(chat);
  }, []);

  const createChat = useCallback(async (senderId, receiverId) => {
    const newChat = {
      _id: `${senderId}-${receiverId}`,
      members: [senderId, receiverId],
    };

    setUserChats((prevChats) => [...prevChats, newChat]);
    setPotentialChats((prev) => prev.filter((u) => u._id !== receiverId));

    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ senderId, receiverId })
    );

    if (response.error) {
      console.error("Error creating chat:", response.error);
      return;
    }

    setUserChats((prevChats) =>
      prevChats.map((chat) => (chat._id === newChat._id ? response : chat))
    );
  }, []);

  const markAllNotificationAsRead = useCallback(() => {
    const mNotifications = notifications.map((n) => {
      return { ...n, isRead: true };
    });

    setNotifications(mNotifications);
  }, []);

  const markNotificationAsRead = useCallback(
    (n, userChats, user, notifications) => {
      const desiredChat = userChats.find(
        (chat) =>
          chat.members.includes(n.senderId) && chat.members.includes(user?._id)
      );

      if (!desiredChat) return;

      updateCurrentChat(desiredChat);

      setNotifications(
        notifications.map((el) =>
          el.senderId === n.senderId ? { ...el, isRead: true } : el
        )
      );
    },
    []
  );

  const markThisUserNotificationAsRead = useCallback(
    (thisUserNotifications, notifications) => {
      const mNotifications = notifications.map((el) => {
        let notification;

        thisUserNotifications.forEach((n) => {
          if (n.senderId === el.senderId) {
            notification = { ...n, isRead: true };
          } else {
            notification = el;
          }
        });

        return notification;
      });

      setNotifications(mNotifications);
    },
    []
  );

  return (
    <chatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        setCurrentChat,
        updateCurrentChat,
        messages,
        isMessageLoading,
        messageError,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationAsRead,
        markNotificationAsRead,
        markThisUserNotificationAsRead,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};
