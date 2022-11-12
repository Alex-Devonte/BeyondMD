#Select base image for Docker
FROM node:18.12.1-alpine3.15

#Sets work directory in image
WORKDIR /app

#Copy files from host to image
COPY package.json .

#Run instructions just like in a terminal
RUN npm install

COPY . .

#Opens port, 3000 is React deafult
EXPOSE 3000

#Run commands when container launches
CMD ["npm", "start"]