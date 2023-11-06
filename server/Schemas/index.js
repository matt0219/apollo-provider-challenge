const { gql } = require('apollo-server-express'); // Import gql from apollo-server-express

// Import your typeDefs and resolvers from their respective files
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = {
  typeDefs,
  resolvers,
};
