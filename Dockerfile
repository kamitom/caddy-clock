
# Base image
FROM caddy:2.4.3
# AUTHOR
LABEL AUTHOR = "kamitom" \
  EMAIL = "lokilaufeeson@gmail.com"
# Bundle app source
COPY . /usr/share/caddy/
