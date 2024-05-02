# Stage 1: build the app
FROM node:20-alpine AS build

ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: serve the app
FROM nginx:1.25 AS prod
WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .

CMD ["nginx", "-g", "daemon off;"]