# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React app for production
RUN npm run build

# Install `serve` to serve the static files
RUN npm install -g serve

# Use `serve` to serve the built files
CMD ["serve", "-s", "build"]

# Expose the port that the app will run on
EXPOSE 8000
