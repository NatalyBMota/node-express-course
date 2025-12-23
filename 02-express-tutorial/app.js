const express = require('express')
const app = express()

const peopleRouter = require('./routes/people')
const auth = require('./routes/auth')
const products = require('./routes/products')
const query = require('./routes/query')
// const { products, people } = require("./data")

const logger = require('./logger')

// middleware
app.use(express.static('./methods-public'))
app.use(logger)
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse into a JavaScript object (json)
app.use(express.json());
// use our router
app.use('/api/v1/people', peopleRouter)
app.use('/login', auth)
app.use('/api/v1/products', products)
app.use('/api/v1/query', query)

app.get('/', (req, res) => {
    res.send("Home Page")
    res.end()
})

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" })
})

app.all('*', (req, res) => {
    console.log('page not found')
    res.status(404).send('page not found')    
})

app.listen(3000, (req, res) => {
    console.log('server is listening')
})
