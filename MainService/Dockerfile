FROM node

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]