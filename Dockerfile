# Step 1: Build the Angular app using Node.js 20
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Set the NODE_OPTIONS environment variable to use the legacy OpenSSL provider
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Angular application code
COPY . .

# Expose port 4200 for the Angular development server
EXPOSE 4200

# Start the Angular development server
CMD ["npm", "start"]