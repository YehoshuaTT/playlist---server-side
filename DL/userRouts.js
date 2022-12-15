const express = require("express");
const userRouter = express.Router();
const User = require("./user.model");

userRouter.post("/register", async (req, res) => {
  console.log("someone tires to log");
  try {
    const data = req.body;
    console.log(data);
    const user = await User.create(data);
    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      res.status(401).send("No such user!!");
    } else {
      res.send({ token: user._id });
      console.log("user is logged in");
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

userRouter.get("/authRoute", async (req, res) => {
  const token = req.query.token;
  try {
    if (!token) {
      return res.status(401).send("hacker!");
    }
    const user = await User.findById(token);
    if (!user) {
      return res.status(401).send("hacker!");
    }
    res.send("Good, you're authenticated");
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = userRouter;
