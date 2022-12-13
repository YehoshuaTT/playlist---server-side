const express = require("express");
const playlistRouter = express.Router();
const Playlist = require("./playlist.model");

playlistRouter.post("/", async (req, res) => {
  console.log("a playlist is on the way");
  try {
    const data = req.body;
    console.log(data);
    const playlist = await Playlist.create(data);
    const userPlayilists = [];

    console.log(playlist);
    res.send(playlist);
  } catch (e) {
    res.sendStatus(500);
  }
});

playlistRouter.put("/", async (req, res) => {
  console.log("a playlist update is on the way");
  try {
    const data = req.body;
    let playlist = await Playlist.updateOne(
      { username: data.username, title: data.title },
      { playlist: data.playlist }
    );
    console.log(playlist);
    res.send(playlist);
  } catch (e) {
    res.sendStatus(500);
  }
});

playlistRouter.get("/", async (req, res) => {
  const token = req.query.token;
  console.log(token);
  try {
    if (!token) {
      return res.status(401).send("hacker!");
    } else {
      const playlist = await Playlist.find({ username: token });
      const data = [];
      playlist.forEach((v, i) => {
        data.push({
          title: playlist[i]._doc.title,
          playlist: playlist[i]._doc.playlist,
        });
      });
      res.send(data);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

playlistRouter.patch("/", async (req, res) => {
  const token = req.query.token;
  try {
    if (!token) {
      return res.status(401).send("hacker!");
    } else {
      console.log(req);
      const playlist = await Playlist.findOneAndDelete({
        username: token,
        title: req.body.title,
      });
      console.log(playlist);

      res.json({ redirect: "/myplaylist" });
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = playlistRouter;
