const express = require('express')
const app = express()
const { products } = require("./data")
console.log('Express Tutorial')


//middleware
app.use(express.static('./public'))

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
