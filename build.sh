#! /bin/sh

# browserify
browserify src/X.js -o dist/X.js

# compress
uglifyjs dist/X.js -o dist/X.min.js