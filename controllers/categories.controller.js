
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
        if(!deletedComment.length){
            return Promise.reject({status: 404, msg : "comment_id in path but does not exist"})
        }else{
            res.status(204).send()
        }
    }).catch(err => {
        console.log(err)
        next(err)
    })
}