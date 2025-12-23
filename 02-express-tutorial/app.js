const express = require('express')
const app = express()
const { products, people } = require("./data")
const logger = require('./logger')

console.log('Express Tutorial')


// middleware
app.use(express.static('./methods-public'))
app.use(logger)
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse into a JavaScript object (json)
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Home Page")
    res.end()
})

app.get('/api/v1/people', (req, res) => {
    res.status(200).json({success: true, data:people})
})

app.get('/api/v1/people/:id', (req, res) => {
    const {id} = req.params
    const person = people.find((person) => person.id === Number(id))
    if (!person) {
        return res.status(404).json({success: false, msg: `no person with id ${id}`})
    } else {
        return res.status(200).json({success: true, data: person})
    }
})

app.put('/api/v1/people/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body
    // console.log(id, name)
    // res.send('hello world')
    const person = people.find((person) => person.id === Number(id))

    if (!person) {
        return res
            .status(404)
            .json({success: false, msg: `no person with id ${id}`})
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({success: true, data: newPeople})
})

app.delete('/api/v1/people/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
        return res
            .status(404)
            .json({success: false, msg: `no person with id ${req.params.id}`})
    }
    const newPeople = people.filter((person) => person.id !== Number(req.params.id))
    return res.status(200).json({success: true, data: newPeople})
})

app.post('/api/v1/people', (req, res) => {
    const name = req.body.name
    if (!name) {
        return res.status(400).json({success: false, msg: 'Please provide name'})
    }
    people.push({ id: people.length + 1, name: req.body.name })
    res.status(201).json({success: true, name: req.body.name, person: name})
    // return res.status(201).json({ success: true, person: name })
})

app.post('/login', (req, res) => {
    console.log(req.body)
    const {name} = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please Provide Credentials')
    res.end()
})

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" })
})

app.get('/api/v1/products', (req, res) => {
    res.json(products)
})

app.get('/api/v1/products/:productID', (req, res) => {
    console.log('User requested an endpoint within /api/v1/products/:productID')
    /* 
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind)
    */

    // return res.json(req.params)
    console.log(req)
    console.log(req.params)

    const {productID} = req.params

    const singleProduct = products.find((product) => product.id === Number(productID))
    
    if(!singleProduct) {
        return res.status(404).send({ message: "That product was not found."})
    }

    return res.json(singleProduct)

})

app.get('/api/v1/query', (req, res) => {
    console.log(req.query)
    const {search, priceLessThan, limit} = req.query
    let sortedProducts = [...products]

    function checkIfNameStartsWith(product) {
        return product.name.startsWith(search)
    }

    function checkIfPriceIsLessThan(product) {
        if (product.price <= Number(priceLessThan))
        return product.name
    }

    if (search) {
        sortedProducts = sortedProducts.filter((product) => checkIfNameStartsWith(product))
    }

    if (priceLessThan) {
        sortedProducts = sortedProducts.filter((product) => checkIfPriceIsLessThan(product))
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if(sortedProducts.length < 1) {
        // res.status(200).send('no product matched your search')
        return res.status(200).json({success: true, data: []})
    }
    return res.status(200).json(sortedProducts)
})

app.all('*', (req, res) => {
    console.log('page not found')
    res.status(404).send('page not found')    
})

app.listen(3000, (req, res) => {
    console.log('server is listening')
})
