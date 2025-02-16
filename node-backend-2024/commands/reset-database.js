// filepath: /node-backend-2024/node-backend-2024/commands/reset-database.js
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Function to reset the database
const resetDatabase = () => {
    const sql = 'DROP DATABASE IF EXISTS your_database_name; CREATE DATABASE your_database_name;';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error resetting the database:', err);
            return;
        }
        console.log('Database reset successfully:', results);
    });

    connection.end();
};

// Execute the reset function
resetDatabase();