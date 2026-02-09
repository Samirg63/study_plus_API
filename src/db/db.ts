import dotenv from 'dotenv'
import mysql from 'mysql'
dotenv.config()



var db:mysql.Connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
})

db.connect()



export default db;


