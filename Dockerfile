# Specifies where to get the base image (Node v12 in our case) and creates a new container for it
FROM node:14.18.1-alpine AS development
# Install distro dependencies
RUN apk add --no-cache git python3 make g++

ARG APP_BUILD_DIR=/app
ENV APP_BUILD_DIR=${APP_BUILD_DIR}

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR ${APP_BUILD_DIR}

# Install dependencies
COPY package*.json ./
RUN npm install && \
    npm install -g nuxt@2.15

ARG MAP_BASE_URL=https://visor.geoperu.gob.pe/print
ARG MAP_URL=https://visor.geoperu.gob.pe/print/printer/elevation/
ARG REPORTE_URL=https://visor.geoperu.gob.pe/api/a3/consulta_super/readA3.php
ARG REPORTE_CEM_URL=https://visor.geoperu.gob.pe/api/a3/consulta_cem/readA3.php
ARG APP_BUILD_DIR=/app

ENV MAP_BASE_URL=${MAP_BASE_URL}
ENV MAP_URL=${MAP_URL}
ENV REPORTE_URL=${REPORTE_URL}
ENV REPORTE_CEM_URL=${REPORTE_CEM_URL}


# Copy source files from host computer to the container
FROM development AS build
WORKDIR ${APP_BUILD_DIR}
COPY . .
# Construct production build (This generates a www-data folder)
RUN sh ./generateCem.sh && \
    sh ./generateCovid.sh && \
    sh ./generateFicha.sh && \
    sh ./generateSD.sh && \
    sh ./generatePresupuesto.sh && \
    sh ./generateReporte.sh && \
    sh ./generateRenadespple.sh

FROM nginx:1.23.3-alpine AS production

ARG APP_DIR=/usr/share/nginx/html
ENV APP_DIR=${APP_DIR}

WORKDIR ${APP_DIR}

COPY deployment/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/www-data .

EXPOSE 80
