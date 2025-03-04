const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createPool({
    host: 'localhost',  // Local machine IP address or localhost
    user: 'root',       // MySQL username (default: 'root')
    password: 'Cw5tyK4XOlnPtyn6',       // MySQL password (leave empty if default)
    database: 'local_database', // Replace with your actual database name
    port: 3306 ,         // Default MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;
