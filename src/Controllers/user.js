const { read, write } = require('../Utils/Fs')
const jwt = require('../Utils/Jwt')
const path = require('path')



const GET = (req, res ) => {
    try{
        let users = read('users')
        let { profileToken } = req.params
        if(profileToken) {
            let { userId } = jwt.verify(profileToken)
            res.status(200).json({status: 200, message: 'OK', data: users.find(user => user.userId == userId )})

        }else {
            res.status(200).json({status: 200, message: 'OK', data: users})
        }
    } catch (error) {
        // res.status(500).json({
        //     error: error.message
        // })
     }
}
     




const LOGIN = (req, res ) => {
    try {
        let users = read('users')
        let { username, password } = req.body

        let user = users.find(user => user.username == username && user.password == password )

        if(!user) {
            res.status(401).json({ status: 401, message: "username or password incorrect"})
        }

        res.status(200).json({
            status: 200,
            message: "successfully",
            data: user,
            token: jwt.sign({userId: user.userId})
        })

    } catch (error) {

    }
}

const REGISTER = (req, res ) => {
    try {
        let users = read('users')
        let { username, password, email } = req.body
        if(!req.files) {
            res.status(400).json({ status: 401, message: "incorrent file"})
        }
        
        let { avatar } = req.files


        let user = users.find(user => user.username == username)

        if(user) {
            res.status(401).json({ status: 401, message: "username incorrect"})
        }

        let fileName = avatar.name.replace(/\s/g, '')
        avatar.mv(path.join(process.cwd(), 'Uploads', fileName))

        let newUser = { userId: users.at(-1)?.userId + 1 || 1,
         username, password, email, avatar: fileName 
        }

        users.push(newUser) 
        write('users', users)
        console.log(newUser);

        res.status(201).json({
            status: 201,
            message: "you are registered",
            data: newUser,
            token: jwt.sign({userId: newUser.userId})
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { LOGIN, REGISTER, GET }
       
