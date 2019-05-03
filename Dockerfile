FROM node:10.15.3-alpine AS build
ARG NODE_ENV=production
WORKDIR /refined-itsukara-link

RUN apk -U  upgrade && apk add \
  git \
  yarn \
  && rm -rf /var/cache/apk/*

COPY package.json yarn.lock /refined-itsukara-link/

RUN yarn \
  && yarn cache clean
COPY . /refined-itsukara-link
RUN yarn run build

FROM node:10.15.3-alpine AS production
ARG NODE_ENV=production
WORKDIR /refined-itsukara-link

COPY --from=build \
  /refined-itsukara-link/dist \
  /refined-itsukara-link/static \
  /refined-itsukara-link/public \
  /refined-itsukara-link/node_modules \
  /refined-itsukara-link/package.json \
  /refined-itsukara-link/dist/

EXPOSE ${APP_PORT}
CMD yarn start


