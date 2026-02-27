#!/bin/bash
#DEST = /var/www/visor.geoperu.gob.pe
bash generateCem.sh
bash generatePresupuesto.sh
bash generateReporte.sh


#docker container run -w /app/ --rm -p 8082:8081 -v $(pwd)/Distribuciones:/app/ php:7.4-cli php -S 0.0.0.0:8081
#mv ./www-dir/cem /var/www/visor.geoperu.gob.pe/cem
#mv ./www-dir/presupuesto /var/www/visor.geoperu.gob.pe/presupuesto
#mv ./www-dir/reporte /var/www/visor.geoperu.gob.pe/reporte
