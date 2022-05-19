const db = require("../db/connection.js")

const fetchUsers = () => {
    return db.query("SELECT * FROM users").then(({rows}) => {
        return rows
    })

}

module.exports = fetchUsers;