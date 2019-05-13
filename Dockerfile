FROM node:11.5.0

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn install --silent

COPY . /usr/src/app
RUN yarn build

CMD ["yarn","start"]

