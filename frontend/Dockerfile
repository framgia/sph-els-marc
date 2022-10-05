FROM node:18.7.0-bullseye-slim
WORKDIR /frontend
COPY package.json package.json
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
COPY . .
RUN npm run build
