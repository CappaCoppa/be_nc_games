const db = require('../db/connection.js');


exports.fetchReview = (id, query) => {
    if(typeof id === "number"){
        let queryMsg = `
            SELECT reviews.*, COUNT(comments.review_id)::INT AS comments_count 
            FROM reviews 
            LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1 
            GROUP BY reviews.review_id`
   
        return db.query(queryMsg,[id]).then(({rows}) => {
            return rows
        })
    }

}

exports.updatedReview = (id, incObj) => {
    if(typeof id === "number"){
        return db.query("SELECT votes FROM reviews WHERE review_id = $1",[id]).then((votesObject) => {
            if(!votesObject.rows.length){
                return Promise.reject({status : 404 , msg : "valid id in path but doesn't match review"})
            }else{
                const votes = votesObject.rows[0].votes
                if(typeof incObj.inc_votes === "number"){
                    let incVote = votes + incObj.inc_votes;
                    if(incVote < 0) incVote = 0;
                    return db.query(`UPDATE reviews SET votes = ${incVote} WHERE review_id = $1 RETURNING *`, [id]).then(({rows}) => {
                        return rows;
                    })
                }else if(!Object.keys(incObj).length){
                    return Promise.reject({status : 400, msg : "No object was passed to the request"})
                }
                else{
                    return Promise.reject({status : 400 , msg : "user passed something that is not a number in inc_votes" })
                }
            }
        })
    }
}
exports.fetchAllReviews = ({sort_by = "created_at", order = "desc", category}) => {
    const validArr =[];
    let query = `
    SELECT reviews.*, COUNT(comments.review_id)::INT as comments_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id`
    if(category) {
        query += ` WHERE category= $1`
        validArr.push(category)
    }
    query += ` 
    GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order}
    `
    return db.query(query, validArr).then(({rows}) => {
        return rows
    })
}

exports.fetchPostedComment = (commentBody, id) => {
    const {username, body} = commentBody;
    return db.query(`INSERT INTO comments (body, review_id, author) VALUES ($1, $2, $3) RETURNING *`, [body, id, username]).then(({rows}) => {
        return rows[0]
    })
}




exports.fetchCommentsById = (id) => {
    if(typeof id === "number"){
        return db.query("SELECT * FROM comments WHERE review_id = $1", [id]).then(({rows}) =>{
                return rows            
        })
    }}



