const express = require('express');
const app = express();
const { getCategories } = require('./controllers/categories.controller')
const {getReviews} = require('./controllers/review.constroller.js')


app.use(express.json())

app.get('/api/categories', getCategories)
app.get("/api/reviews/:review_id", getReviews)

app.all("*", (req ,res) => {
    res.status(404).send({msg :"not found"})
})


app.use((err, req, res, next) => {
    const {status, msg} = err
    if(status === 404){
        res.status(err.status).send({msg : err.msg})
    }else{
        next(err)
    }
})

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg : "something that is not a number passed as id"})
    }
})

module.exports = app 
