FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Stay as the root user for now.

# Install packages:
COPY package*.json ./
RUN npm ci             # not `npm install`
COPY . . 
USER node

EXPOSE 3000

CMD [ "node", "app.js" ]