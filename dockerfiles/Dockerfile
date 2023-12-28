ARG NODE_VERSION=20.3.1
FROM docker.hasti.co/node/node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as build
COPY ../ .
RUN pnpm install --frozen-lockfile &&\
    pnpm codegen &&\
    pnpm build

FROM base as final
COPY --from=build /usr/src/app .
ENV NODE_ENV production
ENV PORT 4003
EXPOSE $PORT

CMD pnpm start --port $PORT --hostname 0.0.0.0