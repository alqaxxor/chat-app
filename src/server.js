const express = require('express')
const http = require('http')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const socketIo = require('socket.io')
const path = require('path')
const jwt = require('./Utils/jwt.js')
const { read, write } = require('./Utils/Fs.js')

const { PORT, localhost } = require('./config.js')

const userRouter = require('./Routers/user.js')
const messageRouter = require('./Routers/message.js')

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(express.static(path.join(process.cwd(), 'Uploads')))


app.use(userRouter)
app.use(messageRouter)

const server = http.createServer(app)

const io = socketIo(server)



io.on('connection', (client) => {
    client.on('new message', ({ token, message }) => {
        let { userId } = jwt.verify(token)
        let messages = read('messages')
        let users = read('users')
        let newMessage = {
            id: messages.at(-1)?.id + 1 || 1,
            message: message,
            userId: userId,
            created_at: new Date()
        }
        messages.push(newMessage)
        write('messages', messages)
        newMessage.user = users.find(user => user.userId == userId)
        client.broadcast.emit('send message', newMessage)
    })
})





server.listen(PORT, () => console.log(`:) ${localhost}: ${PORT}`))