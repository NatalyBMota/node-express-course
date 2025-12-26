const express = require('express')
const router = express.Router()

const { products } = require("../data")

router.get('/', (req, res) => {
    res.json(products)
})

router.get('/:productID', (req, res) => {
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

module.exports = router