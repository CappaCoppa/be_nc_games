const db = require('../db/connection.js')


const fetchCategories = () => {

    return db.query('SELECT * FROM categories').then((res) => {
        console.log(res)
        if(!res.rows.length){
            return Promise.reject({status: 404 , msg : "not found"})
        }else{
            return res.rows
        }
    })
    }

module.exports = {fetchCategories};