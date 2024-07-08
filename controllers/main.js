// check username, Password in the post (login) request
// if exist create new JWT ( JSON web Token ) --- if not bounce back the req
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard 
const { BadRequestError } = require('../errors//index')
const jwt = require('jsonwebtoken')

const login = async(req, res) => {
    const { username, password } = req.body
    // the 3 way to check the user
    // 1. Mongo DB will defaultly do that 
    // 2. packgae name JOI
    // 3. check in the controller 
    if(!username || !password){
        throw new BadRequestError('Please provide email and password')
    }
    // just for the demo, nornally provided by DB
    const id = new Date().getDate()
    // try to keep the paload small, better experience for user
    // when ever you use the JWT SECRET in production use long, complex and unguessable string value
    const token = jwt.sign({
        id,
        username
    }, process.env.JWT_SECRET,
    {
        expiresIn:'30d'
    })

    res.status(200).json({msg: 'user created', token})
}

const dashboard = (req, res) => { 
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200)
    .json({
        msg: `Hello ,${req.user.username}, Your ID - ${req.user.id}`, 
        secret: `Here is your Authorized Data, Your Lucky Number ${luckyNumber}`
    })   
}
// const CustomAPIError = require('../errors/custom-error')
// const jwt = require('jsonwebtoken')

// const login = async(req, res) => {
//     const { username, password } = req.body
//     // the 3 way to check the user
//     // 1. Mongo DB will defaultly do that 
//     // 2. packgae name JOI
//     // 3. check in the controller 
//     if(!username || !password){
//         throw new CustomAPIError('Please provide email and password', 400)
//     }
//     // just for the demo, nornally provided by DB
//     const id = new Date().getDate()
//     // try to keep the paload small, better experience for user
//     // when ever you use the JWT SECRET in production use long, complex and unguessable string value
//     const token = jwt.sign({
//         id,
//         username
//     }, process.env.JWT_SECRET,
//     {
//         expiresIn:'30d'
//     })

//     res.status(200).json({msg: 'user created', token})
// }

// const dashboard = (req, res) => {
//     const authHeader = req.headers.authorization
//     // verifing if the token is send with the header
//     if(!authHeader || !authHeader.startsWith('Bearer ')){
//         throw new CustomAPIError('No Token Provided', 401)
//     }
//     // removing only the token from { Authorization } && verifing it
//     const token = authHeader.split(" ")[1]
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const luckyNumber = Math.floor(Math.random()*100)
//         res.status(200).json({msg: `Hello ,${decoded.username}`, secret: `Here is your Authorized Data, Your Lucky Number ${luckyNumber}`})
//     } catch (error) {
//         throw new CustomAPIError('Not Authorized to access this route', 401)
//     }
// }
module.exports = {
    login, 
    dashboard
}