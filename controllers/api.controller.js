const {fetchEndpoints} = require("../models/api.model.js")


exports.getEndpoints = (req, res, next) => {
    fetchEndpoints().then(endpointData => {
        res.status(200).send({endpointData})
    }).catch(err => {
        next(err)
    })
}