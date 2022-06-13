
const {getEndpoints} = require("./controllers/api.controller.js")
const { getCategories , deleteComment } = require('./controllers/categories.controller')
const {getReview, updateReview, getAllReviews, getCommentsById, postComment} = require('./controllers/review.controller.js')
const getUsers = require("./controllers/users.controller.js")
const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors(express.json()))

app.get('/api', getEndpoints)
app.get('/api/categories', getCategories)
app.get('/api/reviews/:review_id', getReview)
app.patch('/api/reviews/:review_id', updateReview)
app.get("/api/users", getUsers);
app.get('/api/reviews', getAllReviews)
app.get("/api/reviews/:review_id/comments", getCommentsById)
app.post("/api/reviews/:review_id/comments", postComment)
app.delete("/api/comments/:comment_id", deleteComment)

app.use((err , req, res, next) => {
    const { code, status, msg } = err;
    switch(code){
        case "22P02":
            res.status(400).send({msg : "something that is not a number as the id in the path"});
        break;
        case "23502":
            res.status(400).send({msg : "body does not contain both mandatory keys"})
        break;
        case "23503":
            res.status(404).send({msg : "user not in the database tries to post"})
        break;
        case "42703":
            res.status(400).send({msg : "user tries to enter a non-valid sort-by query"})
        break;
        case "42601":
            res.status(400).send({msg : "user tries to enter a non-valid order query"})
        break;
        case undefined:
            next(err)
        break;
    }
})

app.use((err, req, res, next) => {
    const {status, msg} = err
    if(status === 400) res.status(status).send({msg});
    else if(status == 404) res.status(status).send({msg});
    else next(err)
})


app.all("*", (req ,res) => {
    res.status(404).send({msg :"not found"})
})

module.exports = app
