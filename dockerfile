# Node image with Alpine Linux
FROM node:20-alpine

# Varnish 
RUN apk add --no-cache varnish

# Workdir required for tailwind to compile
WORKDIR /app

# Copies varnish
COPY default.vcl /etc/varnish/default.vcl

# Copies package.json and package-lock.json
COPY package*.json ./

# Copies entrypoint
COPY entrypoint.sh ./entrypoint.sh

# Installs dependencies
RUN npm install

# Copies the rest of the UI source code
COPY . .

# Builds the application
RUN npm run build

# Exposes port 8080
EXPOSE 8080

# Starts the application
CMD ["/bin/sh", "/app/entrypoint.sh"]