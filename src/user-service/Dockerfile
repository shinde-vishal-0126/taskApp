FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose app port
EXPOSE 8000

# Start the app
CMD ["npm", "start"]