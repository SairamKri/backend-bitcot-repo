const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createPool({
    host: 'bitcot.ck7yas6iqahb.us-east-1.rds.amazonaws.com',  // Local machine IP address or localhost
    user: 'Genesis',       // MySQL username (default: 'root')
    password: 'Genesis123',       // MySQL password (leave empty if default)
    database: 'Bitcot', // Replace with your actual database name
    port: 3306 ,         // Default MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;
