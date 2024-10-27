# Use an official Ubuntu image as a base
FROM ubuntu:latest

# Install Node.js, npm, and networking tools
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    iproute2 \
    nmap \
    iputils-ping

# Set working directory and install app dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Expose the port Render will use
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]

