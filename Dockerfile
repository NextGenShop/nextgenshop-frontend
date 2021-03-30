FROM node:15.6.0-alpine

WORKDIR /root

COPY package.json .
RUN npm install --force
