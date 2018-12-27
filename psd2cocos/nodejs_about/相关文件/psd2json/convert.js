#!/usr/bin/env node

var psd2json = require("./index.js");

function run(argv) {
    if (argv.length == 0) {
        console.info('Usage: psd2json psdFile [outputFile] [--nopack] [--ignore-font] [#buildId]');
        process.exit(0);
    }

    var psdFile = argv[0];
    var outputFile;
    var option = 0;
    var options = {};
    var buildId;
    for (var i = 1; i < argv.length; i++) {
        var arg = argv[i];
        if (arg.indexOf('--') == 0) {
            switch (arg.substr(2)) {
                case 'nopack':
                    option |= psd2json.constants.NO_PACK;
                    break;
                case 'ignore-font':
                    option |= psd2json.constants.IGNORE_FONT;
                    break;
                default:
                    console.error('unknown argument: ' + arg);
                    process.exit(1);
                    break;
            }
        }
        else if (arg.substr(0,1) == '#') {
            buildId = arg.substr(1);
        }
        else {
            if (!outputFile)
                outputFile = arg;
            else {
                console.error('unknown argument: ' + arg);
                process.exit(1);
            }
        }
    }

    psd2json.convert(psdFile, options)
        .then(function (buildId) {
            console.log('buildId: ' + buildId);
        }).catch(console.err);
}

run(process.argv.slice(2));