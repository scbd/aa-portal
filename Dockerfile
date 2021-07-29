FROM node:14-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache yarn

WORKDIR /usr/src/app

COPY . ./
RUN chmod +rx /usr/src/app/docker-entry.sh

RUN yarn clean-reinstall

ENV NUXT_PORT=3000
ENV NUXT_HOST=0.0.0.0

ENV PORT 3000
EXPOSE 3000

RUN yarn build

ENTRYPOINT ["/usr/src/app/docker-entry.sh"]