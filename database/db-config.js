// database/db-config.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // or the server address if not local
    user: 'root',
    password: 'yourpassword', // Password for your MySQL database
    database: 'whatsapp_bot' // Your database name
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

module.exports = connection;
