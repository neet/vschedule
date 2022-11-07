FROM node:16-slim AS build
ENV NODE_ENV production

WORKDIR /app
COPY . /app/

RUN apt-get update
RUN apt-get -y install libssl-dev 

RUN yarn workspaces focus @ril/api \
  && yarn workspaces foreach -vR --topological-dev --from @ril/api run build

# ---

FROM node:16-slim AS production
WORKDIR /app

RUN apt-get update
RUN apt-get -y install libssl-dev 

COPY --from=build /app .

EXPOSE ${PORT}

ENTRYPOINT [ "yarn", "workspace", "@ril/api", "run", "start" ]
