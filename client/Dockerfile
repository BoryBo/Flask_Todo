FROM node:20-alpine
WORKDIR /app
COPY . .
# COPY public/ /app/public
# COPY src/ /app/src
# COPY package.json /app/
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]