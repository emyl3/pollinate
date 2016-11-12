#!/bin/sh
mkdir -p public/vendors;

cp node_modules/angular/angular.min.js public/vendors;
cp node_modules/angular/angular.min.js.map public/vendors;

cp node_modules/angular-route/angular-route.min.js public/vendors;
cp node_modules/angular-route/angular-route.min.js.map public/vendors;

cp node_modules/bootstrap/dist/css/bootstrap.min.css public/vendors;
cp node_modules/bootstrap/dist/css/bootstrap.min.css.map public/vendors;

cp node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js public/vendors;
cp node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css public/vendors;
cp node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js public/vendors;

cp node_modules/angular-animate/angular-animate.min.js public/vendors;
cp node_modules/angular-animate/angular-animate.min.js.map public/vendors;

cp node_modules/angular-dragdrop/src/angular-dragdrop.min.js public/vendors;

cp node_modules/jquery/dist/jquery.min.js public/vendors;
cp node_modules/jquery/dist/jquery.min.map public/vendors;

cp node_modules/moment/min/moment.min.js public/vendors;
cp node_modules/moment/min/moment-with-locales.min.js public/vendors;

cp node_modules/angular-moment-picker/dist/angular-moment-picker.min.js public/vendors;
cp node_modules/angular-moment-picker/dist/angular-moment-picker.min.css public/vendors;
