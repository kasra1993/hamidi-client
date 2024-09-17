# Use an official Node.js image to build the app
FROM node:16 AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files into the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx to serve the build
FROM nginx:alpine

# Copy the React build files to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]