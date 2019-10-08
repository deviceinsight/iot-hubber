FROM nginx:1.16.1-alpine

## Add Node
RUN apk add --update nodejs=10.16.3-r0

COPY client/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY server /usr/share/server

CMD nohup node /usr/share/server > usr/share/server/logs & nginx-debug -g 'daemon off;'
