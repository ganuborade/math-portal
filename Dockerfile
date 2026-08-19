# Multi-Stage Dockerfile for Mathur Giri Maharaj Math Sansthan Portal
# Lightweight, High-Performance & Low-Cost Alpine Base Image

FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies (ci for fast, deterministic builds)
RUN npm ci

# Copy application source
COPY . .

# Build production frontend bundle
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy package manifests and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled dist and server codebase from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/database ./database

EXPOSE 5000

# Run Express server
CMD ["node", "server/index.js"]
