const DBconfig = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "DoAn"
};

const mysql = require('mysql');

var connection = "mysql.createConnection(DBconfig);"
// var connection = mysql.createConnection(DBconfig);

// connection.connect(function(err){
//     if (err) throw err;
//     console.log("Connect to database successfully!")
// })


async function makeQuery (query) {
    connection.query(query, function(err, results) {
        if (err) throw err;
        return results;
    });
}

module.exports = {
    connection,
    makeQuery
}