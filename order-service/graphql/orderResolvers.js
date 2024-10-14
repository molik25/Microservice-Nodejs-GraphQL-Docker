const Order = require('../model');

const resolvers = {
    Query: {
        orders: async () => await Order.find(),
        order: async (_, { id }) => await Order.findById(id),
    },
    Mutation: {
        createOrder: async (_, { productId, quantity }) => {
            const newOrder = new Order({ productId, quantity });
            return await newOrder.save();
        },
    },
};

module.exports = { resolvers };
