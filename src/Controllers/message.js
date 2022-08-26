const { read, write } = require('../Utils/Fs.js')



const GET = (req,res) => {
    try {
        let messages = read('messages')
        let users = read('users')
        
        let data = messages.map(message => {
            message.user = users.find(user => user.userId == message.userId)
            return message
        })
        res.status(200).json({status: 200, message: "ok", data: data})
    } catch (error) {
        res.status(500).json({
        error: error.message
        
    })
        
    }
}

module.exports = { GET }