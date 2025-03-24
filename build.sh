#!/bin/bash

set -euo pipefail

# Install deps
test -d www/assets/js/lib || mkdir www/assets/js/lib
cp node_modules/handlebars/dist/handlebars.min.js www/assets/js/lib
cp node_modules/split.js/dist/split.es.js www/assets/js/lib
