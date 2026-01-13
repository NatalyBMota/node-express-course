const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // const search = 'ab'

    // i in the options below just means case insensitive
    /* const products = await Product.find({
        name: {$regex: search, $options: 'i'},
    }) */
   const products = await Product.find({}).sort('-name price')
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    // console.log(req.query)
    const { featured, company, name } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }

    // const products = await Product.find(req.query)
    console.log(queryObject)
    const products = await Product.find(queryObject)
    // res.status(200).json({msg: 'products route'})
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}