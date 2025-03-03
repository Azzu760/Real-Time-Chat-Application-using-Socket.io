const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Chat API");
});

// MongoDB Connection
const port = process.env.PORT || 5000;
const mongodb_uri = process.env.MONGODB_URI;

mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error.message));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
