const db = require("../db/connection")
exports.checkReviewExists = (id) => {    return db.query("SELECT * FROM reviews WHERE review_id =$1",[id]).then(({rows}) => {        if(rows.length > 0){            return true        }else{            return Promise.reject({status : 404, msg : "valid number in path but doesn't match id"})        }    })}
