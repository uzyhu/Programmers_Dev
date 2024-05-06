const express = require('express')  //서버셋팅은 app.js가
const app = express()

app.listen(7777)

const userRouter = require('./routes/users') //user-demo 소환
const channelRouter = require('./routes/channels')// channel-demo 소환?

app.use("/", userRouter)
app.use("/channels", channelRouter) //공통 경로 빼놓기