
const { getCategories } = require('./controllers/categories.controller')
const {getReview, updateReview, getAllReviews, getCommentsById, postComment} = require('./controllers/review.controller.js')
const getUsers = require("./controllers/users.controller.js")
const express = require("express");
const app = express();

app.use(express.json())

app.get('/api/categories', getCategories)
app.get('/api/reviews/:review_id', getReview)
app.patch('/api/reviews/:review_id', updateReview)
app.get("/api/users", getUsers);
app.get('/api/reviews', getAllReviews)
app.get("/api/reviews/:review_id/comments", getCommentsById)
app.post("/api/reviews/:review_id/comments", postComment)


app.use((err , req, res, next) => {
    const { code, status, msg } = err;
    if(code === "22P02") res.status(400).send({msg : "something that is not a number as the id in the path"})
    else if(code === "23502") res.status(400).send({msg : "body does not contain both mandatory keys"})
    else if(code === "23503") res.status(404).send({msg : "user not in the database tries to post"})
    else if(status === 400) res.status(status).send({msg});
    else next(err)
})

app.use((err, req, res, next) => {
    const {status, msg} = err
    if(status === 404){
        res.status(err.status).send({msg})
    }else{
        next(err)
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({msg : "Internal server error"})
})

app.all("*", (req ,res) => {
    res.status(404).send({msg :"not found"})
})

module.exports = app
