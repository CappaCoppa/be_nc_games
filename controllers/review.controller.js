
const {fetchReviews, updatedReview, fetchPostedComment} = require('../models/review.model.js');
const {validateUsername, checkReviewExists} = require("../models/util.model.js")


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

exports.postComment = (req, res, next) => {
    const body = req.body
    console.log(body)
    const id = req.params.review_id;
    checkReviewExists(id).then(() => {
        return fetchPostedComment(body ,id).then((comment) => {
            console.log(comment)
            res.status(201).send({comment});
        })
         }).catch(err => {
             console.log(err)
             next(err)
         })

        //  return Promise.all([validateUsername(username), checkReviewExists(id), fetchPostedComment(body, id, username)]).then(res => {
        //     res.status(201).send({comment : res[2]})})
        //  }else{
        // return Promise.reject({status:400 , msg : "body does not contain both mandatory keys"})
}

