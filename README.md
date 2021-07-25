# for TEST

## 使用 docker

> docker build -t tom4dock/caddy-clock:1.1 .

> docker run -d --name caddy-app -p 8001:80 -v $PWD:/usr/share/caddy/ -v caddy_data:/data caddy

> docker run -d --name caddy-app -p 8001:80 tom4dock/caddy-clock:1.1 