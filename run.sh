#!/bin/sh

if [ $# -ne 1 ]; then
    PORT=4444
else
    if [ $1 -eq $1 2> /dev/null ]; then
        PORT=$1
    else
        echo "Yo dude, Port must be a number"
        exit 1
    fi
fi
BIN=`which jekyll || unavailable`
if [[ $BIN == "unavailable" ]]; then
    echo "Please install jekyll"
else
    $BIN --server $PORT --auto
fi