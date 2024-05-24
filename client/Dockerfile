# Stage 1: build the app
FROM node:20-alpine AS build

ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node

COPY --chown=node:node package*.json  ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .

RUN npm run build

# Stage 2: serve the app
FROM nginx:1.25 AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .

CMD ["nginx", "-g", "daemon off;"]