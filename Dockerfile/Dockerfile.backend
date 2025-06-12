FROM node:20-alpine

WORKDIR /app
RUN npm install -g pnpm@latest typescript

ARG DATABASE_URL

# Set for prisma:generate during build
ENV DATABASE_URL=${DATABASE_URL}

# First copy workspace configuration
COPY package*.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy only the necessary packages
COPY ./packages ./packages

# Create a temporary structure for the backend app
RUN mkdir -p ./apps/backend

# Copy only backend files
COPY ./apps/backend/package.json ./apps/backend/
COPY ./apps/backend/tsconfig.json ./apps/backend/
COPY ./apps/backend/src ./apps/backend/src

# Install dependencies at workspace root (will link workspace packages)
RUN pnpm install
RUN pnpm run prisma:generate

# Build the backend
WORKDIR /app/apps/backend

# Run the backend
WORKDIR /app
CMD ["pnpm", "run", "start:backend"]