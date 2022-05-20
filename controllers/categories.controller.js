
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
    fetchDeletedComment(id).then((deletedComment) => {
        console.log(deletedComment)
        res.status(204).send()
    })
}