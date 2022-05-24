const db = require("../db/connection")

exports.checkReviewExists = (id) => {
    return db.query("SELECT * FROM reviews WHERE review_id =$1",[id]).
    then(({rows}) => {
        if(rows.length > 0){
            return true}
            else{
                return Promise.reject({status : 404, msg : "valid number in path but doesn't match id"})}}
)
}

exports.checkCategoryExists = (category) => {
    return db.query("SELECT * FROM categories WHERE slug = $1", [category]).then(({rows}) => {
        if(!category){
            return Promise.resolve()
        }else if(rows.length > 0){
                return Promise.resolve()
        }else{
            return Promise.reject({ status : 404 , msg : "user tries to enter a non existing category"})
        }
    })
}
