import { useContext, useEffect, useState } from "react";
import { chatContext } from "../context/chatContext";
import { baseUrl, getRequest } from "../utils/services";

const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(chatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    if (!chat?._id) return;

    const getMessage = async () => {
      try {
        const response = await getRequest(`${baseUrl}/messages/${chat._id}`);

        if (!response || response.error) {
          console.error("Error getting messages...");
          return;
        }

        const lastMessage = response[response.length - 1] || null;
        setLatestMessage(lastMessage);
      } catch (error) {
        console.error("Error fetching latest message:", error);
      }
    };

    getMessage();
  }, [chat?._id, newMessage, notifications]);

  return { latestMessage };
};

export default useFetchLatestMessage;
