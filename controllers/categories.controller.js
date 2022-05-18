
const { fetchCategories } = require('../models/categories.model')


const getCategories = (req, res, next) => {
    fetchCategories().then((categories) => {
        res.status(200).send({categories});
    }).catch((err) => {
        next(err);
        
    }
    )
}

module.exports = {getCategories}