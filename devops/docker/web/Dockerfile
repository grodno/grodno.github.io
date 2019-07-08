FROM alpine:latest
EXPOSE 80
ADD lighttpd.conf /etc/lighttpd/
RUN apk add --update --no-cache lighttpd || \
    (sed -i -e 's/dl-cdn/dl-4/g' /etc/apk/repositories && apk add --update --no-cache lighttpd) && \
    rm -rf /var/cache/apk/* && \
    cat /etc/lighttpd/lighttpd.conf && \
    lighttpd -t -f /etc/lighttpd/lighttpd.conf && \
    echo "Lighttpd is running..." > /var/www/index.html && \
    addgroup www && \
    adduser -D -H -s /sbin/nologin -G www www

ENTRYPOINT ["/usr/sbin/lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]