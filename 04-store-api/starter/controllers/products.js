const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // const search = 'ab'

    // i in the options below just means case insensitive
    /* const products = await Product.find({
        name: {$regex: search, $options: 'i'},
    }) */
    // const products = await Product.find({}).sort('-name price')
    /* const products = await Product.find({})
        .sort('name')
        .select('name price')
        .limit(10)
        .skip(5) */

    const products = await Product.find({ price: { $gt: 30} })
        .sort('name')
        .select('name price')

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

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    /* At the moment we have 23 products. So, if I decide to limit my response to only 7 items, how many pages do I have? Well, 23 / 7 is over 3, so we will have 4 pages. 7 * 3 is 21, so the last page will only have 2 items. 
    If page is set to 1, we will skip 0 items. If page is set to 2 and limit is
    set to 10, we will skip 10 items. If page is set to 3 and limit is set to 7, we will skip 14 items. */

    const products = await result
    // res.status(200).json({msg: 'products route'})
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}