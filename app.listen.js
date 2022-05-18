const app = require('./app')

app.listen('8080', ()=> {
    console.log('listening on port 8080')
    .catch(err, () => {
        if(err) console.log(err)
    })
})