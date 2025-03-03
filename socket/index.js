const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New Connection", socket.id);

  socket.on("addNewUser", (userId) => {
    if (!userId) return;

    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);

    onlineUsers.push({
      userId,
      socketId: socket.id,
    });

    console.log("Online Users:", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  // Send messages
  socket.on("sendMessage", (message) => {
    console.log(`📩 New Message:`, message);

    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      console.log(
        `✅ Delivering message to User ID: ${message.recipientId}, Socket ID: ${user.socketId}`
      );
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    } else {
      console.log(
        `❌ User ${message.recipientId} is offline. Message not delivered.`
      );
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);

    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);
