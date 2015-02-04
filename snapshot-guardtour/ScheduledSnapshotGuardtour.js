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
ScheduledSnaphotGuardtour.js is a part of Camelopard-keeper, which is a
collection of small nodejs demo applications for the camelopard npm package.
The ScheduledSnaphotGuardtour performs scheduled guard toura between predefined PTZ presets,
and takes a snapshot from each position, everytime.

Install:
    npm install camelopard
Run: 
    node snapshotguardtour/ScheduledSnaphotGuardtour.js

Recommendation: Use forever npm package to run script as a daemon.

*/

/*globals require */

var   camelopard      = require('camelopard'),
      i                     = 0,
      data                  = require('./data.json'),
      cameraConfiguration   = data.cameras[0],
      baseFolder;

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

var gotoPresets = function () {
  var delayPreset = cameraConfiguration.guardTour.delayBetweenPreset;
  var delayImage = cameraConfiguration.guardTour.delayBeforeSnapshot;
  var preset;

  if (i === 0) {
    delayPreset = 1;
  }

  setTimeout(function () {
    preset = cameraConfiguration.guardTour.presets[i];
    cameraConfiguration.snapshot.fileNamePrefix = preset;
    cameraConfiguration.snapshot.downloadFolder = baseFolder + '\/' + preset; 
    console.log('preset:' + preset + ' :: ' + cameraConfiguration.snapshot.downloadFolder);
    gotoPresetPosition(preset, function (err, res) {});
    setTimeout(function () {
      downloadImage(function (err, res) {
        console.log('Image downloaded at preset:' + preset + ', as ' + res);
      });
      
      i++;
      if (i < cameraConfiguration.guardTour.presets.length) {
        gotoPresets();
      }
    }, delayImage);

  }, delayPreset);
};

var runScheduledGuardtour = function () {
  // every 30 mins
    var minutes = 30, 
        interval = minutes * 60 * 1000;

    setInterval(function() {
        console.log('\nNew Guardtour started!');
        i = 0;
        gotoPresets();
    }, interval);

};

// Run scheduled Guardtours
baseFolder = cameraConfiguration.snapshot.downloadFolder;
gotoPresets(); // do a guardtour immidiately
runScheduledGuardtour();  //do guardtours regularily
