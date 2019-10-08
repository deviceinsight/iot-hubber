FROM nginx:1.16.1-alpine

RUN apk add --update nodejs=10.16.3-r0 npm=10.16.3-r0 yarn=1.16.0-r0
COPY . /tmp/wip/

WORKDIR /tmp/wip
RUN yarn predocker --pure-lockfile
RUN mv client/build/* /usr/share/nginx/html
RUN mv nginx/default.conf /etc/nginx/conf.d/default.conf
RUN mv server /usr/share/server

WORKDIR /
CMD nohup node /usr/share/server > /usr/share/server/logs & nginx-debug -g 'daemon off;'
