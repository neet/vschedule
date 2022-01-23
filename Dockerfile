FROM node:16-slim AS build
ENV NODE_ENV production

WORKDIR /ril
COPY . /ril/

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  libssl-dev 

RUN yarn workspaces focus @ril/api \
  && yarn workspaces foreach -ptR --from @ril/api run build

# ---

FROM node:16-slim AS production
WORKDIR /ril

COPY --from=build /ril .

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  libssl-dev 

ENTRYPOINT [ "yarn", "workspace", "@ril/api", "run", "start" ]
