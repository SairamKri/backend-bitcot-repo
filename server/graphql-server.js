const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const AWS = require('aws-sdk');
const mysql = require('mysql2');

const app = express();

// Enable CORS for all origins (you can restrict it later if needed)
app.use(cors());

// Set up the RDS client to connect to your database
const rds = new AWS.RDSDataService();

// MySQL Connection Pool
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

// Sample GraphQL Schema
const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    getItems: [Item]
  }
     type Mutation {
    addItem(name: String!, description: String!): Item
    updateItem(id: ID!, name: String!, description: String!): Item
    deleteItem(id: ID!): Boolean
  }
`;

// Sample Resolvers
const resolvers = {
  Query: {
    getItems: async () => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM items', (err, results) => {
          if (err) {
            console.error('Error fetching items from MySQL:', err);
            reject('Unable to fetch items');
          } else {
            resolve(
              results.map((record) => ({
                id: record.id,
                name: record.name,
                description: record.description,
              }))
            );
          }
        });
      });
    },
  },
  Mutation: {
    addItem: async (_, { name, description }) => {
      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
        connection.query(query, [name, description], (err, result) => {
          if (err) {
            console.error('Error adding item to MySQL:', err);
            reject('Unable to add item');
          } else {
            resolve({
              id: result.insertId,
              name,
              description,
            });
          }
        });
      });
    },
    updateItem: async (_, { id, name, description }) => {
      return new Promise((resolve, reject) => {
        const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
        connection.query(query, [name, description, id], (err, result) => {
          if (err) {
            console.error('Error updating item:', err);
            reject('Unable to update item');
          } else {
            resolve({
              id,
              name,
              description,
            });
          }
        });
      });
    },
    deleteItem: async (_, { id }) => {
      return new Promise((resolve, reject) => {
        const query = 'DELETE FROM items WHERE id = ?';
        connection.query(query, [id], (err, result) => {
          if (err) {
            console.error('Error deleting item:', err);
            reject('Unable to delete item');
          } else {
            resolve(true);
          }
        });
      });
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // Enable GraphQL playground for testing
  introspection: true, // Enable introspection in production (only for testing purposes)
});

// Start the server and apply middleware
async function startServer() {
    await server.start();   // Wait for the server to start
    server.applyMiddleware({ app, path: '/graphql'  });  // Apply middleware after the server starts
  
    // Start the Express server
    app.listen(5000, () => {
      console.log('Server running at http://localhost:5000/graphql');
    });
  }
  
  // Call the startServer function to initialize everything
  startServer();