# build stage
FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN yarn install-deps && \
    yarn build

# run stage
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/packages/server/dist ./dist
COPY --from=builder /app/packages/server/static ./static
COPY --from=builder /app/packages/server/package.json ./package.json
EXPOSE 9000
CMD [ "npm", "run", "start" ]