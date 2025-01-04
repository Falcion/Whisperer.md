# Use an existing base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Add a non-root user and switch to that user
RUN useradd -m appuser
USER appuser

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY prepare.ts ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start your application
CMD ["npm", "run", "prepare:template"]

# Add a HEALTHCHECK to monitor the container
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1
