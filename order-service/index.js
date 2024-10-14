const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/orderSchema');
const { resolvers } = require('./graphql/orderResolvers');

const app = express();
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true, useUnifiedTopology: true });

const dbUri = "mongodb://mongo:27017/orders";  // Make sure this is used correctly

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// app.listen(4002, () => {
//     console.log('Apollo Server - Order Service running on port 4002');
// });

// Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
    await server.start();  // Wait for the server to start
    server.applyMiddleware({ app });  // Apply middleware after server has started
};

// Start the server
startServer()
    .then(() => {
        app.listen({ port: 4002 }, () => {
            console.log(`Order Service running on port 4002${server.graphqlPath}`);
        });
    })
    .catch(err => console.error('Error starting server:', err));
