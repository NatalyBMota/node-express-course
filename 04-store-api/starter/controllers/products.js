const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // const search = 'ab'

    // i in the options below just means case insensitive
    /* const products = await Product.find({
        name: {$regex: search, $options: 'i'},
    }) */
    // const products = await Product.find({}).sort('-name price')
    const products = await Product.find({}).select('name price')
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    // console.log(req.query)
    const { featured, company, name, sort, fields } = req.query
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
    // console.log(queryObject)
    let result = Product.find(queryObject)

    //sort
    if (sort) {
        // console.log(sort)
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    //fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const products = await result
    // res.status(200).json({msg: 'products route'})
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}