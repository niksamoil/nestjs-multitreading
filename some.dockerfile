FROM node:20 as build
WORKDIR /app
RUN apt-get update; \
 apt-get install -y git;
COPY package.json /app/
RUN yarn
COPY . /app

RUN yarn run build:some-service
CMD yarn run start:some-service-prod

