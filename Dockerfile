# Use an official Node.js image to build the app
FROM node:18 AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files into the container
COPY . .

# Build the React app for production
RUN npm run build

# List the contents of the dist folder after the build
RUN ls -la /app/dist

# Use Nginx to serve the build
FROM nginx:alpine

# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build files to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Check what is in /usr/share/nginx/html after copying
RUN ls -la /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]