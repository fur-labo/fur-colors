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
    furColors = require('../lib');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

var exampleImageDir = path.resolve(basedir, 'docs/examples/images');

apeTasking.runTasks([
    function renderSvg(callback) {
        var themes = Object.keys(furColors);
        var size = 256;
        var w = size * 2,
            h = size;
        async.eachSeries(themes, function (theme, callback) {
            var colors = furColors[theme]();
            var name = 'color-theme-' + theme;
            var filename = path.resolve(exampleImageDir, 'example-colors-' + theme + '.svg');
            writexml(filename, 'svg', {
                '@': {
                    id: name,
                    xmlns: "http://www.w3.org/2000/svg",
                    width: w,
                    height: h,
                    viewbox: [0, 0, w, h].join(' ')
                },
                rect: [
                    {
                        '@': {
                            x: 0,
                            y: 0,
                            width: size,
                            height: size,
                            fill: colors[1]
                        }
                    },
                    {
                        '@': {
                            x: size,
                            y: 0,
                            width: size,
                            height: size,
                            fill: colors[0]
                        }
                    }
                ],
                text: [
                    {
                        '@': {
                            fill: colors[0],
                            x: size / 2,
                            y: size / 2,
                            'dominant-baseline': "central",
                            'text-anchor': "middle",
                            'font-size': "64"
                        },
                        '#': "normal"
                    },
                    {
                        '@': {
                            fill: colors[1],
                            x: size + size / 2,
                            y: size / 2,
                            'dominant-baseline': "central",
                            'text-anchor': "middle",
                            'font-size': "64"
                        },
                        '#': "reversed"
                    }
                ]
            }, {
                mkdirp: true
            }, callback);
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