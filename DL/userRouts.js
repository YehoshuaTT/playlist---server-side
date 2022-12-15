const express = require("express");
const userRouter = express.Router();
const userLogic = require("./user.logic");

userRouter.post("/register", async (req, res) => {
  console.log("Someone is trying to register");
  try {
    const newUser = await userLogic.register(req.body);
    res.send(newUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const isAUser = await userLogic.login(req.body);
    console.log(isAUser);
    if (isAUser) {
      res.sendStatus(200);
      console.log("user is logged in");
    } else res.send({ message: "worng email or password" });
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = userRouter;
