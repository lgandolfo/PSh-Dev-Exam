const mysql = require('mysql');


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'game'
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Database connected');

});

module.exports = mysqlConnection;