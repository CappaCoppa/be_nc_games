const db = require("../db/connection")

exports.checkReviewExists = (id) => {
    return db.query("SELECT * FROM reviews WHERE review_id =$1",[id]).then(({rows}) => {
        if(rows.length > 0){
            return true
        }else{
            return Promise.reject({status : 404, msg : "valid number in path but doesn't match id"})
        }
    })
}

exports.validateUsername = (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username]).then(({rows}) => {
        if(rows.length > 0){
            return Promise.resolve()
            
        }else{
            return Promise.reject({status : 404, msg : "user not in the database tries to post"}) 
        }
    })
}