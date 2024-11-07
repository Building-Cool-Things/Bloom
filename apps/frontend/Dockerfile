# #use node.js base image

# FROM node:18-alpine AS base

# #set the working dir

# WORKDIR /app


# #copy root package.json and pnpm-lock.yml for dependency installation

# COPY package.json ./
# COPY pnpm-lock.yaml ./



# # Install pnpm globally and install dependencies for the frontend
# RUN npm install -g pnpm && \
#     pnpm install --filter frontend...




# # Copy the rest of the application code
# COPY . .



# # Build the frontend application for production
# RUN pnpm --filter frontend build



# # Expose the port your frontend runs on
# EXPOSE 5173



# # Command to run your application in production mode
# CMD ["pnpm", "--filter", "frontend", "serve"]






# ./apps/frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

# Copy root package.json and pnpm workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy frontend package.json
COPY apps/frontend/package.json ./apps/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/frontend ./apps/frontend
COPY apps/frontend/tsconfig.json ./apps/frontend

# Build frontend
RUN cd apps/frontend && pnpm build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]