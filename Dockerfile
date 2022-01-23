FROM node:16-slim AS build
ENV NODE_ENV production

WORKDIR /ril
COPY . /ril/

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  libssl-dev 

RUN yarn \
  && yarn workspaces foreach -ptR run build \
  && yarn workspace @ril/api run prisma generate

# ---

FROM node:16-slim AS production
WORKDIR /ril

COPY --from=build /ril .

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  libssl-dev 

ENTRYPOINT [ "yarn", "workspace", "@ril/api", "run", "start" ]
