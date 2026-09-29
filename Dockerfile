FROM node:23-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 8080

CMD ["npx", "@11ty/eleventy", "--serve", "--host=0.0.0.0"]
