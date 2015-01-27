/*
The MIT License (MIT)

Copyright (c) 2015 Fredrik Sandberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/*

SnapshotGuardtour.js is a part of Camelopard-keeper, which is a
collection of small nodejs demo applications for the camelopard npm package.
The SnapshotGuardtour performs a custom guard tour between predefined PTZ presets,
and takes a snapshot from each position.

Install:
    npm install camelopard
Run: 
    node snapshotguardtour/SnaphotGuardtour.js

*/

/*globals require */

var camelopard  = require('camelopard'),
    _           = require('lodash'),
    i           = 0;

var data = {
  'cameras': [
    {
      'name': 'Default Camera',
      'brand': 'Axis',
      'ip': '192.168.0.90', 
      'username': 'root',
      'password': 'pass',
      'guardTour': {
        'presets': [
          'building-a',
          'window2',
          'desks',
          'bridge'
        ],
        'delayBetweenPreset': 2000,
        'delayBeforeSnapshot': 2000
      },
      'snapshot': {
        'resolution': '1024x768',
        'compression': 30,
        'rotation': 0,
        'cameraNum': 1,
        'downloadFolder': 'files\/snapshots'
      }
    }
  ]
};
var cameraConfiguration = data.cameras[0];

var gotoPresetPosition = function (presetPositionName, callback) {
  camelopard.ptz.gotoPresetPosition(presetPositionName, cameraConfiguration, function (err, res) {
    callback(err, res);
  });
};

var downloadImage = function (callback) {
  camelopard.image.download(cameraConfiguration, function (err, res) {
    callback(err, res);
  });
};

var presetLoop = function () {
  var delayPreset = cameraConfiguration.guardTour.delayBetweenPreset;
  var delayImage = cameraConfiguration.guardTour.delayBeforeSnapshot;
  var preset;
  if (i === 0) {
    delayPreset = 1;
  }

  setTimeout(function () {
    preset = cameraConfiguration.guardTour.presets[i];
    console.log('preset:' + preset);
    gotoPresetPosition(preset, function (err, res) {});
    setTimeout(function () {
      downloadImage(function (err, res) {
        console.log('Image downloaded at preset:' + preset + ', as ' + res);
      });
      
      i++;
      if (i < cameraConfiguration.guardTour.presets.length) {
        presetLoop();
      }
    }, delayImage);

  }, delayPreset);
};

//execute presetLoop
presetLoop();