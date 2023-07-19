require('dotenv').config()
module.exports = {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOSTNAME,
    dialect: "postgres"
}