# Start from a base Node.js image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json file
COPY package.json ./

# Install the dependencies (including the nest CLI)
RUN npm install
# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy the rest of your application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start:dev"]
