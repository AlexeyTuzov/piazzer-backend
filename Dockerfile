FROM node

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000/tcp

ENV NODE_ENV production

CMD ["node", "dist/src/main.js"]
