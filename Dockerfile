# 基础 image
FROM node:16.13.1
VOLUME /app
WORKDIR /app
COPY . /app
RUN npm install -g serve
CMD ["serve","-s","/app/dist","-p","8081"]
EXPOSE 8081

