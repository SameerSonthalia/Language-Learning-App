const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "paathashala",
    port: 3306
})


con.connect((err)=>{
    if(err) throw err;
    else{
        console.log("DataBase cnnected");
    }
})

module.exports.con=con;