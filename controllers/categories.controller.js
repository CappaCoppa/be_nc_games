
const { fetchCategories } = require('../models/categories.model')


const getCategories = (req, res, next) => {
    fetchCategories().then((categories) => {
        res.status(200).send({categories});
        console.log(categories)
    }).catch((err) => {
        console.log(err)
        next(err);
        
    }
    )
}

module.exports = {getCategories}