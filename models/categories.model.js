const db = require('../db/connection.js')


const fetchCategories = (endPoint) => {
    if(endPoint === 'categories'){
        return db.query('SELECT * FROM categories').then(({rows}) => {
            return rows
        })
    }
    else if(!endPoint) {   
        return Promise.reject({status: 404 , msg : "not found"})
    }
    else{
        return Promise.reject({status: 404 , msg : "not found"})
    }

    }

module.exports = {fetchCategories};