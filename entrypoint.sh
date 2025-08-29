#!/bin/sh

# Starts varnish
varnishd -a :8080 -f /etc/varnish/default.vcl -s malloc,1g &


echo "----------------------------------------------"
echo ""
echo "SERVING CACHED PROJECT ON http://localhost:8080."
echo ""
echo "----------------------------------------------"

# Starts Website
npm start
