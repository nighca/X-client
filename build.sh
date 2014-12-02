#! /bin/sh

# browserify
browserify browser.js -o dist/X.js

# compress
uglifyjs dist/X.js -o dist/X.min.js

# add version info
version_info="
/**"`date`"**/"
echo "$version_info" >> dist/X.js
echo "$version_info" >> dist/X.min.js