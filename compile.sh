#!/bin/sh
YUI=`which yuicompressor`
JSFILES=`egrep -oh "assets.*js" _includes/javascript.html`
CSSFILES=`egrep -oh "assets.*css" _includes/stylesheet.html`

cat $CSSFILES > assets/css/style.css
cat $JSFILES > assets/js/app.js

$YUI -o assets/css/style.min.css assets/css/style.css
$YUI --disable-optimizations -o assets/js/app.min.js assets/js/app.js

rm assets/css/style.css assets/js/app.js