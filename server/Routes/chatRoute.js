const express = require("express");
const {
  findUserChats,
  createChat,
  findChat,
} = require("../Controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:senderId/:receiverId", findChat);

module.exports = router;
