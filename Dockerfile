FROM node

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5000

ENV NODE_ENV production

CMD ["node", "dist/main.js"]
