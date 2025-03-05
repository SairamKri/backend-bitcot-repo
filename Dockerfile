# Use the official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application port (Change this if needed)
EXPOSE 4000

# Start the GraphQL server
CMD ["node", "server/graphql-server.js"]