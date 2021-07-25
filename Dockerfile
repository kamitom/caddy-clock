
# Base image
FROM caddy:latest
# AUTHOR
LABEL AUTHOR = "TOM" \
  EMAIL = "TOM@TEST.ME"
# Bundle app source
COPY . /usr/share/caddy/
