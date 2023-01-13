# 基础镜像
FROM 172.22.3.5:9000/library/nginx:latest

VOLUME /tmp

RUN rm -rf /usr/share/nginx/html/*

ADD . /usr/share/nginx/html

RUN chmod -R 777 /usr/share/nginx/html//mew/screen

EXPOSE 80

CMD ["nginx","-g","daemon off;"]