const express = require("express");
const router = express.Router();

const {
  subscribeEmail,
  getAllSubscribedEmails,
} = require("../controllers/SubscribeEmail.Controller");


router.post("/", subscribeEmail);


router.get("/", getAllSubscribedEmails);

module.exports = router;
