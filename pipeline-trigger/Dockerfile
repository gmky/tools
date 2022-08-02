FROM alpine:3.16

RUN apk --no-cache add git jq curl

COPY ./trigger /usr/local/bin

RUN chmod +x /usr/local/bin/trigger

WORKDIR /app

CMD [ "trigger" ]