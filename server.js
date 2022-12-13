const express = require("express")
const playlistRouter= require("./DL/playlistRouts")
const PORT = process.env.PORT || 3001
const Playlist = require("./DL/playlist.model")


require("./DL/db.js").connect()
const cors = require('cors')
const app = express()
const User = require("./DL/user.model")

app.use(cors({
    origin: '*',
    exposedHeaders: 'Authorization',
}))

app.use(express.json())

app.get("/ness", (req, res) => {
    console.log("someone made a request")
    res.send("Hello world")
})

app.post("/register", async (req, res) => {
    console.log("someone tires to log")
    try {
        const data = req.body
        console.log(data)
        const user = await User.create(data)
        res.send(user)
    } catch(e) {
        res.sendStatus(500)
    }
})

app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email, password: req.body.password})
        if(!user) {
            res.status(401).send("No such user!!")
        } else {
            res.send({token: user._id})
            console.log("user is logged in");
        }
    } catch(e) {
        res.sendStatus(500)
    }
})

//This is an authenticated route, only users that logged in, can see the content here
app.get("/authRoute", async (req, res) => {
    const token = req.query.token
    try {
        if(!token) {
        return  res.status(401).send("hacker!")
        }
        const user = await User.findById(token)
        if(!user) {
            return  res.status(401).send("hacker!")
        }
        //User is autheticated - now give him whatever u want
        res.send("Good, you're authenticated")
    } catch(e) {
        res.sendStatus(500)
    }
    })

// const playlistRouter =  require ("./DL/playlistRouts")
app.use("/playlist", playlistRouter)

app.listen(PORT, () => {
   console.log( `Server is running on port ${PORT}`)
})