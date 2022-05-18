
const {fetchReviews} = require('../models/review.model.js')

const getReviews = (req, res, next) => {
    const id = parseInt(req.params.review_id);
    fetchReviews(id).then((reviews) => {
        if(!reviews.length){
            return  Promise.reject({status : 404, msg : 'Valid number but no reviews with that id'});
        }else {
            res.status(200).send({reviews});
        }
        
    }).catch((err) => {
        next(err);
    })

}


module.exports = {getReviews};