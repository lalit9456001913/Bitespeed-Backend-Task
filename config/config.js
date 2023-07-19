require('dotenv').config()
console.log("user=======", process.env.USER_NAME)
module.exports = {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOSTNAME,
    dialect: "postgres"
}