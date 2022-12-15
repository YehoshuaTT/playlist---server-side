const express = require("express");
const playlistRouter = require("./DL/playlistRouts");
const userRouter = require("./DL/userRouts");
const PORT = process.env.PORT || 3001;
require("./DL/db.js").connect();

const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    exposedHeaders: "Authorization",
  })
);

app.use(express.json());

app.use("/playlist", playlistRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
