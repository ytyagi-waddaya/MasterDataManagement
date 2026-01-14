# --------------------
# 1. Base image
# --------------------
FROM node:20-alpine AS base
WORKDIR /app

# --------------------
# 2. Install deps
# --------------------
FROM base AS deps
COPY package*.json ./
RUN npm ci

# --------------------
# 3. Build step
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

# node modules
COPY --from=deps /app/node_modules ./node_modules

# compiled app
COPY --from=build /app/dist ./dist

# 🔥 COPY REAL PRISMA FOLDER
COPY --from=build /app/prisma ./prisma

# 🔥 COPY PRISMA CONFIG (THIS WAS MISSING)
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

# package.json
COPY --from=build /app/package.json ./package.json

EXPOSE 8000
CMD ["node", "dist/src/server.js"]
