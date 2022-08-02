FROM alpine:3.16

RUN apk add git curl jq

COPY ./gitgr /usr/local/bin

RUN chmod +x /usr/local/bin/gitgr

WORKDIR /app

CMD [ "gitgr" ]