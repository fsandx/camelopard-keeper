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

/*globals require */

var camelopard  = require('camelopard'),
    _           = require('lodash'),
    schedule    = require('node-schedule');

var data = {
  'cameras': [
    {
      'name': 'Default Camera',
      'brand': 'Axis',
      'ip': '192.168.0.90',
      'username': 'root',
      'password': 'pass',
      'snapshot': {
        'resolution': '1024x768',
        'compression': 30,
        'rotation': 0,
        'cameraNum': 1,
        'downloadFolder': 'home\/pi\/myServer\/myShare'
      }
    }
  ]
};
var cameraConfiguration = data.cameras[0];


var runScheduledDownload = function () {
  //Every day at 13
  //var s = '0 13 * * * * *';
  //Every fem minutes
  //var s = '05 * * * * *';
  //Every minute
  var s = '01 * * * * *';
  console.log('\n********************');
  console.log('Scheduled image download started!');
  schedule.scheduleJob(s, function () {
    camelopard.image.download(cameraConfiguration, function (err, res) {
      if (!_.isUndefined(err)) {
        console.log('Error:' + err);
      } else {
        console.log('Downloaded to: ' + res);
      }
    });
  });
};

// Run a scheduled Guardtour
runScheduledDownload();  