FROM node:20
WORKDIR /app
RUN apt-get update; \
 apt-get install -y locales git curl gnupg;
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
  locale-gen
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
COPY ./package.json /app/
RUN yarn
COPY . /app

EXPOSE 3001-3009

RUN yarn run build:api
CMD yarn run start:api-prod