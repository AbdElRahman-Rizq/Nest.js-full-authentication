# Start from a base Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of your application
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start:dev"]
