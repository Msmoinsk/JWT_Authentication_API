const { UnauthenticatedError } = require('../errors/index')
const jwt = require('jsonwebtoken')

const authenticationMiddleWare = async (req, res, next) => {
    const authHeader = req.headers.authorization
    // verifing if the token is send with the header
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token Provided')
    }
    // removing only the token from { Authorization } && verifing it
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        // Setting the username and ID to the req.user in order to fetch it in controller 
        req.user = { id, username }
        // Now we call the next() means the [ dashboard ] controller
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not Authorized to access this route')
    }
}

module.exports = authenticationMiddleWare