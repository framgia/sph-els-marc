FROM node:18.7.0-bullseye-slim
WORKDIR /frontend
RUN npm install -g npm@8.19.2
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
COPY . .
RUN npm run build
