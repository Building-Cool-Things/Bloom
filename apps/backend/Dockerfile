# # Use a NODE.js base image
# FROM node:18-alpine AS base

# # Set the working directory
# WORKDIR /app


# # Copy the root package.json and pnpm-lock.yaml first for better caching
# COPY package.json ./
# COPY pnpm-lock.yaml ./


# # Install pnpm globally and dependencies for the backend only
# RUN npm install -g pnpm && \
#     pnpm install --filter backend...



# # Copy the backend source code
# COPY . .

# # Build the TypeScript code
# RUN pnpm --filter backend build

# # Expose the port your API runs on
# EXPOSE 8080



# # Command to run your application
# CMD ["node", "apps/backend/dist/index.js"]





FROM node:18-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

# Copy root package.json and pnpm workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy backend package.json
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/backend ./apps/backend
COPY apps/backend/tsconfig.json ./apps/backend

# Build backend
RUN cd apps/backend && pnpm build

# Production stage
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm

# Copy built files and package.json
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./

# Install production dependencies only
RUN pnpm install --prod

EXPOSE 8080
CMD ["node", "dist/index.js"]