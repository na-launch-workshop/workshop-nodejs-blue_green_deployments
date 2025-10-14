# Use official Node.js image suitable for production
FROM node:20-alpine AS base

# Create app directory
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy source files (excluding files listed in .dockerignore)
COPY src ./src
COPY data ./data

# Default port Knative routes to
EXPOSE 8080

ENV NODE_ENV=production

CMD ["node", "src/server.js"]
