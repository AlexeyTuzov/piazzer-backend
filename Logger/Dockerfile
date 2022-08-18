FROM node

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]
