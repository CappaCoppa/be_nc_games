const db = require('../db/connection.js')


const fetchReviews = (id) => {
    if(typeof id === "number"){
        return db.query("SELECT * FROM reviews WHERE review_id = $1 ",[id]).then(({rows}) => {
            return rows
        })
    }

}

module.exports = {fetchReviews}