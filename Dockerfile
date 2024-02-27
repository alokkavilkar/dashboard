FROM node:15-alpine


ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password

WORKDIR /app

COPY . /app/

run npm install

CMD ["node", "server.js"]

