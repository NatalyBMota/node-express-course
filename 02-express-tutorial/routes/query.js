const express = require('express')
const router = express.Router()

const { products } = require("../data")

router.get('/', (req, res) => {
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

module.exports = router