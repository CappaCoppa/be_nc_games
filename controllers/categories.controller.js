
const { fetchCategories, fetchDeletedComment } = require('../models/categories.model')


exports.getCategories = (req, res, next) => {
    fetchCategories().then((categories) => {
        res.status(200).send({categories});
    }).catch((err) => {
        next(err);
        
    }
    )
}

exports.deleteComment = (req, res, next) => {
    const id = req.params.comment_id
    fetchDeletedComment(id).then(() => {
            res.status(204).send()
    }).catch(err => {
        next(err)
    })
}