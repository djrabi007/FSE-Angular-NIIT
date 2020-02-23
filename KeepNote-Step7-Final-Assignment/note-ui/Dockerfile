FROM node:8.10.0 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY server.js /usr/src/app
COPY dist /usr/src/app/dist
COPY container-package.json /usr/src/app
RUN mv container-package.json package.json
RUN npm install http-proxy
RUN npm i --save lodash
RUN npm install express --save
expose 4200
CMD ["node", "server.js"]
