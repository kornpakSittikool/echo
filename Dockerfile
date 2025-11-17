# Development Dockerfile for Next.js (watch enabled)
FROM node:20-bookworm-slim

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source
COPY . .

# Environment for reliable file watching across Docker (esp. on Windows/Mac)
ENV WATCHPACK_POLLING=true \
    CHOKIDAR_USEPOLLING=true \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

# Expose dev server port
EXPOSE 3000

# Run Next.js in dev (watch) mode, binding to all interfaces
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "-p", "3000"]

