const express = require('express');
const mongoose = require('mongoose');
// const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/productSchema');
const { resolvers } = require('./graphql/productResolvers');

const app = express();
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });

const dbUri = "mongodb://mongo:27017/products";  // Make sure this is used correctly

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// app.use('/api/products', routes);

// app.listen(4001, () => {
//     console.log('Product Service running on port 4001');
// });

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
    await server.start();  // Wait for the server to start
    server.applyMiddleware({ app });  // Apply middleware after server has started
};

// Start the server
startServer()
    .then(() => {
        app.listen({ port: 4001 }, () => {
            console.log(`Apollo Server - Product Service running on port 4001${server.graphqlPath}`);
        });
    })
    .catch(err => console.error('Error starting server:', err));
