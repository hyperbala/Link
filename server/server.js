const io = require("socket.io")(3000,{
    cors: {
        origin:"https://link-gules-six.vercel.app",
        methods: ["GET", "POST"]
    }})

    io.on('connection', (socket) => {
        console.log("server is connected")

        socket.on('join-room', (roomId, userId) => {
            console.log(`a new user ${userId} joined room ${roomId}`)
            socket.join(roomId)
            socket.broadcast.to(roomId).emit('user-connected', userId)
        })

        socket.on('user-toggle-audio', (userId, roomId) => {
            socket.join(roomId)
            socket.broadcast.to(roomId).emit('user-toggle-audio', userId)
        })

        socket.on('user-toggle-video', (userId, roomId) => {
            socket.join(roomId)
            socket.broadcast.to(roomId).emit('user-toggle-video', userId)
        })

        socket.on('user-leave', (userId, roomId) => {
            socket.join(roomId)
            socket.broadcast.to(roomId).emit('user-leave', userId)
        })

    })