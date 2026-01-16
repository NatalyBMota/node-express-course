// check username/password in post(login) request
// if it exists, create a new JWT
// send back to front-end

/* setup authentication so that only the request with JWT can access the dashboard */

const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
    const {username, password} = req.body
    // mongoose validation
    // Joi
    // check in the controller

    /* if (!authHeader || authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401)
    } */

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    // just for demo, normally the id is provided by the DB
    const id = new Date().getDate()

    // Try to keep the payload small. Better experience for user.
    /* Just for demo. In production, use long, complex, and unguessable string value! */
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})

    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {    
    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
        msg: `Hello, ${req.user.username}`, 
        secret: `Here is your authorized data: your lucky number is ${luckyNumber}.`,
    })

}

module.exports = {
    login, dashboard
}