const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // throw new Error('testing async errors')
    const products = await Product.find({ 
        name: 'name',  
    })
    // res.status(200).json({msg: 'products testing route'})
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    res.status(200).json({msg: 'products route'})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}