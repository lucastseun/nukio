# syntax=docker/dockerfile:1
FROM node:14-alpine
RUN apk add --no-cache python g++ make
WORKDIR /nukio
COPY . .
RUN yarn install --production
CMD ["node", "server.js"]