FROM node:14
ENV TZ=Asia/Jakarta
RUN apt-get update && apt-get install -y tzdata
RUN ln -fs /usr/share/zoneinfo/$TZ /etc/localtime && dpkg-reconfigure -f noninteractive tzdata
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm rebuild sqlite3 --build-from-source
EXPOSE 5000
CMD ["node", "src/server.js"]