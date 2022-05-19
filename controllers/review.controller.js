
const {fetchReviews, updatedReview, fetchCommentsById} = require('../models/review.model.js');
const {checkReviewExists} = require("../models/util.model.js")

exports.getReviews = (req, res, next) => {
    const passedQuery = req.query.count;
    const id = parseInt(req.params.review_id);
    fetchReviews(id, passedQuery).then((reviews) => {
        if(!reviews.length){
            return  Promise.reject({status : 404, msg : 'Valid number but no reviews with that id'});
        }else {
            res.status(200).send({reviews});
        }
        
    }).catch((err) => {
        next(err);
    })

}



exports.updateReview = (req, res, next) => {
    const id = parseInt(req.params.review_id)
    updatedReview(id, req.body).then((updatedReview) => {
        res.status(200).send({updatedReview})
    }).catch(err => {
        next(err)
    })
}

exports.getCommentsById = (req, res, next) => {
    const id = parseInt(req.params.review_id);
    return Promise.all([checkReviewExists(id), fetchCommentsById(id)]).then(promises => {
        if(promises[1].length === 0){
            res.status(200).send({msg : "found review but no comments to show"})
        }else{
            res.status(200).send({comments : promises[1]})
        }
    }).catch(err => {
        next(err)
    })
}
