#!/bin/bash
# Generate Production [ nuxt generate ]
# Reemplazar en
    #|- nuxt.config.js
    #|- const.js
    #|- pages/_id.vue
echo "Starting..."
echo "Carpeta /dist Eliminada"
echo "Carpeta /www-data/presupuesto Eliminada"
rm -R ./dist
rm -R ./www-data/presupuesto

echo "Creando espacio de trabajo 'www-data'"
mkdir -p ./www-data/presupuesto
################################
echo "Reporte Presupuesto ..."
echo "Estableciendo Configuración -> base [/presupuesto]"

DEFAULT_GENERATE="//generate: {},"
DEFAULT_BASE="//base: '',"
DEFAULT_STATIC="const STATIC_URL = '/'"

REPLACE_GENERATE="generate: {  subFolders: false, routes: function () { let r = []; let cod_dpto = [...new Set(data.default.Ubigeo.map(item => item.cod_dpto))]; let cod_prov = [...new Set(data.default.Ubigeo.map(item => item.cod_prov))]; let cod_dist = [...new Set(data.default.Ubigeo.map(item => item.cod_dist))]; cod_dpto.map((val) => { r.push('/' + val) }); cod_prov.map((val) => { r.push('/' + val) }); cod_dist.map((val) => { r.push('/' + val) }); return r; } },"
REPLACE_BASE="base: '/presupuesto',"
REPLACE_STATIC="const STATIC_URL = '/presupuesto/'"
# Note the double quotes

echo "Reemplazando en nuxt.config.js"
sed -i "s@${DEFAULT_GENERATE}@${REPLACE_GENERATE}@g" nuxt.config.js # con e para testeear la salida
sed -i "s@${DEFAULT_BASE}@${REPLACE_BASE}@g" nuxt.config.js # con e para testeear la salida
sed -i "s@${DEFAULT_STATIC}@${REPLACE_STATIC}@g" const.js # con e para testeear la salida
echo "Copiando reporte a index"

cp ./pages/presupuesto/_id.vue ./pages/_id.vue
cp ./pages/presupuesto/index.vue ./pages/index.vue

echo "Generando..."
nuxt generate

echo "Moviendo a espacio de trabajo www-data"
mv ./dist/* ./www-data/presupuesto

echo "Deshaciendo configuraciones"
sed -i "s@${REPLACE_STATIC}@${DEFAULT_STATIC}@g" const.js # con e para testeear la salida
cat ./default.nuxt.config.js > ./nuxt.config.js 
echo "" > ./pages/_id.vue
echo "Listo!!"