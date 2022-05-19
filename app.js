const { getCategories } = require('./controllers/categories.controller')
const {getReviews, updateReview, getAllReviews} = require('./controllers/review.controller.js')
const express = require("express");
const app = express();

app.use(express.json())

app.get('/api/categories', getCategories)
app.get('/api/reviews', getAllReviews)
app.get('/api/reviews/:review_id', getReviews)
app.patch('/api/reviews/:review_id', updateReview)


app.use((err , req, res, next) => {
    const { code, status, msg } = err;
    if(code === "22P02") res.status(400).send({msg : "something that is not a number as the id in the path"})
    else if(status === 400) res.status(status).send({msg});
    else next(err)
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
    console.log(err)
    res.status(500).send({msg : "Internal server error"})
})

app.all("*", (req ,res) => {
    res.status(404).send({msg :"not found"})
})

module.exports = app;
