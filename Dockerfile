# --- Stage 1: Build Stage ---
    FROM node:18 AS builder

    # Set working directory
    WORKDIR /usr/src/app
    
    # Copy package.json and package-lock.json for efficient caching
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install --only=production
    
    # Copy the entire application
    COPY . .
    
    # --- Stage 2: Runtime Stage ---
    FROM node:18-alpine AS runtime
    
    # Set working directory
    WORKDIR /usr/src/app
    
    # Copy only necessary files from the builder stage
    COPY --from=builder /usr/src/app/node_modules ./node_modules
    COPY --from=builder /usr/src/app ./
    
    # Expose the application port
    EXPOSE 5000
    
    # Start the GraphQL server
    CMD ["node", "server/graphql-server.js"]
    