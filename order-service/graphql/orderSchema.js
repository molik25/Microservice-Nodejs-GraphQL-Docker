const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Order {
            id : ID!
            productId: String
            quantity : Int!
    }

    type Query {
        orders : [Order]
        order(id: ID!) : Order
    }

    type Mutation {
        createOrder(productId: String!, quantity:Int!) : Order
    }`;

    module.exports = { typeDefs };