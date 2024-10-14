const Product = require('../model');

const resolvers = {
    Query: {
        products: async () => await Product.find(),
        product: async (_, { id }) => await Product.findById(id),
        productPagination: async (_, { page = 1, limit = 10 }) => {
            const totalCount = await Product.countDocuments();
            const products = await Product.find()
                .skip((page - 1) * limit)
                .limit(limit);

            return {
                products,
                totalCount,
                hasNextPage: (page * limit) < totalCount
            };
        },
        productFiltering: async (_, { name, minPrice, maxPrice }) => {
            const query = {};
            if (name) {
                query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
            }
            if (minPrice) {
                query.price = { $gte: minPrice };
            }
            if (maxPrice) {
                query.price = { $lte: maxPrice };
            }

            return await Product.find(query);
        }
    },
    Mutation: {
        createProduct: async (_, { name, price, stock }) => {
            try {
                const newProduct = new Product({ name, price, stock });
                const savedProduct = await newProduct.save();

                // Return the saved product along with a success message
                return {
                    message: "Product created successfully!",
                    product: savedProduct
                };
            } catch (error) {
                // Handle the error and return a failure message
                throw new Error("Error creating product: " + error.message);
            }
        },
        updateProduct: async (_, { id, name, price, stock }) => {
            return await Product.findByIdAndUpdate(
                id,
                { name, price, stock },
                { new: true }
            );
        },
        deleteProduct: async (_, { id }) => {
            // Check if the product exists
            const product = await Product.findById(id);

            if (!product) {
                return {
                    message: "Product not found.",
                    products: null // or you can return an empty array if you prefer
                };
            }

            // Delete the product
            await Product.findByIdAndDelete(id);

            // Fetch the updated list of products
            const updatedProducts = await Product.find();

            // Return a success message along with the updated products
            return {
                message: "Product deleted successfully!",
                products: updatedProducts
            };

        }
    },
};

module.exports = { resolvers };
