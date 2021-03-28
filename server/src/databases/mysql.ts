import mysql from "mysql";

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "register_login_jwt"
})

connection.getConnection(err => {
    if (err) return console.log(err)

    console.log("MySQL Connected :)")
})

export default connection