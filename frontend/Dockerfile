# --------------------
# 1. Base
# --------------------
FROM node:20-alpine AS base
WORKDIR /app

# 👇 Build-time env (THIS IS THE FIX)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SOCKET_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL

# --------------------
# 2. Install dependencies
# --------------------
FROM base AS deps
COPY package*.json ./
RUN npm ci

# --------------------
# 3. Build Next.js app
# --------------------
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --------------------
# 4. Runtime image
# --------------------
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copy only what is needed at runtime
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
