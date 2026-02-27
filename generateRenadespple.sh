#!/bin/bash
# Generate Production [ nuxt generate ]
# Reemplazar en
    #|- nuxt.config.js
    #|- const.js
    #|- pages/_id.vue
echo "Starting..."
echo "Carpeta /dist Eliminada"
echo "Carpeta /www-data/renadespple Eliminada"
rm -R ./dist
rm -R ./www-data/renadespple

echo "Creando espacio de trabajo 'www-data'"
mkdir -p ./www-data/renadespple
################################
echo "Reporte Principal ..."
echo "Estableciendo Configuración -> base [/renadespple]"

DEFAULT_GENERATE="//generate: {},"
DEFAULT_BASE="//base: '',"
DEFAULT_STATIC="const STATIC_URL = '/'"

REPLACE_GENERATE="generate: {},"
REPLACE_BASE="base: '/renadespple',"
REPLACE_STATIC="const STATIC_URL = '/renadespple/'"
# Note the double quotes

echo "Reemplazando en nuxt.config.js"
sed -i "s@${DEFAULT_GENERATE}@${REPLACE_GENERATE}@g" nuxt.config.js # con e para testeear la salida
sed -i "s@${DEFAULT_BASE}@${REPLACE_BASE}@g" nuxt.config.js # con e para testeear la salida
sed -i "s@${DEFAULT_STATIC}@${REPLACE_STATIC}@g" const.js # con e para testeear la salida
echo "Copiando renadespple a index"

cp ./pages/renadespple/index.vue ./pages/index.vue

echo "Generando..."
nuxt generate

echo "Moviendo a espacio de trabajo www-data"
mv ./dist/* ./www-data/renadespple

echo "Deshaciendo configuraciones"
sed -i "s@${REPLACE_STATIC}@${DEFAULT_STATIC}@g" const.js # con e para testeear la salida
cat ./default.nuxt.config.js > ./nuxt.config.js 
echo "" > ./pages/_id.vue
echo "Listo!!"