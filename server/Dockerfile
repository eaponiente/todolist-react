FROM node:14
# Create and set the working directory
# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 5000
# Start the application
CMD ["node", "server.js"]
