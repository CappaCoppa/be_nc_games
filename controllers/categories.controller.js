
const { fetchCategories } = require('../models/categories.model')


const getCategories = (req, res, next) => {
    const endPoint = req.params.categories;
    fetchCategories(endPoint).then((categories) => {
        res.status(200).send(categories);
    }).catch((err) => {
        next(err);
    }
    )
}

module.exports = {getCategories}