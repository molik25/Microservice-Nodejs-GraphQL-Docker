const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Product {
            id: ID!
                name: String!
                price: Float!
                stock: Int!
    }

     type ProductPage {
        products: [Product!]!
        totalCount: Int!
        hasNextPage: Boolean!
    }

    type Query {
        products : [Product]
        product(id: ID!) : Product
        productPagination(page: Int!, limit: Int!): ProductPage!
        productFiltering(name: String, minPrice: Float, maxPrice: Float): [Product!]!
    }


    type ProductResponse {
        message: String!
        products: [Product]
    }

    type Mutation {
        createProduct(name: String!, price: Float!, stock: Int!) : Product
        updateProduct(id: ID!, name: String, price: Float, stock: Int): Product
        deleteProduct(id: ID!): ProductResponse!
    }`;

    module.exports = { typeDefs };