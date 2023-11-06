const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./Schemas'); // Import your typeDefs and resolvers
const { authMiddleware } = require('./utils/auth'); // Import your authentication middleware

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs, // Use your type definitions
  resolvers, // Use your resolvers
  context: ({ req }) => ({ req }), // Include req in the context for authentication
});

// Apply Apollo Server as middleware to Express app
server.applyMiddleware({ app });

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
