# Stage 1: build
FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Stage 2: runtime
FROM node:20.14.0-alpine

WORKDIR /app

RUN apk add --no-cache ffmpeg

COPY --from=builder /app /app

RUN mkdir -p /app/uploads /app/converted

EXPOSE 8080

CMD npm run start
