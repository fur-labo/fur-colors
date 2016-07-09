#!/usr/bin/env node

/**
 * Render images.
 */

"use strict";

var path = require('path'),
    async = require('async'),
    fs = require('fs'),
    apeTasking = require('ape-tasking'),
    expandglob = require('expandglob'),
    writexml = require('writexml'),
    svgpng = require('svgpng'),
    furShapes = require('../lib');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

var exampleImageDir = path.resolve(basedir, 'docs/examples/images');

apeTasking.runTasks([
    function renderSvg(callback) {
        var themes = require('../lib/.themes.json');
        async.eachSeries(themes, function (theme, callback) {
            var svg = furShapes[theme](512, 256, '#38E', '#FFF');
            var filename = path.resolve(exampleImageDir, 'example-shape-' + theme + '.svg');
            writexml(filename, 'svg', svg, callback);
        }, callback);
    },
    function renderPng(callback) {
        async.waterfall([
            function (callback) {
                expandglob('*.svg', {cwd: exampleImageDir}, callback);
            },
            function (filenames, callback) {
                var config = filenames.map(function (filename) {
                    var name = path.basename(filename, '.svg');
                    return {
                        src: path.resolve(exampleImageDir, name + '.svg'),
                        dest: path.resolve(exampleImageDir, name + '.png'),
                        size: {width: 512, height: 256}
                    }
                });
                svgpng.byConf(config, callback);
            }
        ], callback);
    }
], true);