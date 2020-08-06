/**
 * NodeJS script to minify js files using uglify-js
 *
 * @author Sai Kumar Manakan
 */
const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const scriptsFolder = '../../resources/js';
const buildFolder = '../../resources/build';

const minify = function(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        // Uglifyjs the script
        const result = UglifyJS.minify(data);

        let minifiedFileName = file.split('/').pop().split('.')[0] + '.min.js';
        fs.writeFile(path.join(buildFolder, minifiedFileName), result.code, (err) => {
            if (err) {
                throw err;
            }

            console.log('Minified ' + file);
        });
    });
};

const walk = function(dir) {
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            walk(file);
        } else {
            /* Is a file */
            minify(file);
        }
    });
};

walk(scriptsFolder);