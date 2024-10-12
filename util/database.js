const mysql=require("mysql2")

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'F1@mysql'
})

module.exports=pool.promise()