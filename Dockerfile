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

# Set proper permissions on the build directory
RUN chmod -R 755 /app/dist

# Use Nginx to serve the build
FROM nginx:alpine

# Copy the React build files to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]