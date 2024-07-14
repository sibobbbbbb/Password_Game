FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm rebuild sqlite3 --build-from-source
EXPOSE 5000
CMD ["node", "src/server.js"]