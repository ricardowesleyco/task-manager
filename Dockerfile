# Dockerfile

# Etapa de build
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./

RUN npm config set strict-ssl false
RUN yarn
RUN npm config set strict-ssl true

COPY . .
RUN yarn run build

# Etapa de produção
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN yarn install --only=production
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]