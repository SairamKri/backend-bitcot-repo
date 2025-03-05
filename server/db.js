const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createPool({
    host: 'bitcot-database.ck7yas6iqahb.us-east-1.rds.amazonaws.com',  // Local machine IP address or localhost
    user: 'admin',       // MySQL username (default: 'root')
    password: 'Srikanth@aws59',       // MySQL password (leave empty if default)
    database: 'Bitcot', // Replace with your actual database name
    port: 3306 ,         // Default MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;
