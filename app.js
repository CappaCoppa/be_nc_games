const express = require('express');
const app = express();
const { getCategories } = require('./controllers/categories.controller')


app.use(express.json())

app.get('/api/:categories', getCategories)


app.use((err,req,res,next) => {
    const {status, msg} = err
    if(status == 404){
        res.status(status).send({msg})
    }
})

module.exports = app 