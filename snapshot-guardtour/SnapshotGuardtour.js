/*
The MIT License (MIT)

Copyright (c) 2015 Fredrik Sandberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/*

SnapshotGuardtour.js is a part of Camelopard-keeper, which is a
collection of small nodejs demo applications for the cmaelopard npm package.
The SnapshotGuardtour performs a custom guard tour between predefined PTZ presets,
and takes a snapshot from each position.

Install: 
    npm install camelopard
Run: 
    node snapshotguardtour/SnaphotGuardtour.js

*/

/*globals require */

var camelopard = require('camelopard');
var _ = require('lodash');

var presets = ['oversikt1', 'oversikt2', 'oversikt3', 'road'];
var cameraConfiguration = {
    name: 'MycamA',
    brand: 'Axis',
    ip: '192.168.1.68',
    username: 'root',
    password: 'grusberg'
};
var i = 0;

var gotoPresetPosition = function(presetPositionName, callback) {
    camelopard.ptz.gotoPresetPosition(presetPositionName, cameraConfiguration, function(err, res) {
        callback(err,res);
    })
};

var downloadImage = function(callback) {
    camelopard.image.download(cameraConfiguration, function (err, res) {
        callback(err, res);
    })
};

var presetLoop = function () {
    var delayPreset = 2000; // let the PTZ engines finish their task
    var delayImage = 2000; // let autofocus finish it task
    if (i === 0) {
        delayPTZEngines = 1;
    } 

    setTimeout(function () {
        console.log('preset:' + presets[i]);
        gotoPresetPosition(presets[i], function (err, res){});
        setTimeout(function () {
            downloadImage(function (err, res) {
                console.log('Image downloaded at preset:' + presets[i] + ', as ' + res);
            })
            
            i++;
            if (i < presets.length) {
                presetLoop();
            }
        }, delayImage)

    }, delayPreset)
};

//execute presetLoop 
presetLoop();