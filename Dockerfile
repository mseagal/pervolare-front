#Primera Etapa
FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
EXPOSE 80