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

ListAllParameters.js is a part of Camelopard-keeper, which is a
collection of small nodejs demo applications for the camelopard npm package.
The SnapshotGuardtour performs a custom guard tour between predefined PTZ presets,
and takes a snapshot from each position.

Install:
    npm install camelopard
Run: 
    node snapshotguardtour/SnaphotGuardtour.js

*/

var camelopard  = require('camelopard'),
    _           = require('lodash');
var data = {
  'cameras': [
    {
      'name': 'Default Camera',
      'brand': 'Axis',
      'ip': '192.168.0.150',
      'username': 'root',
      'password': 'pass'
    }
  ]
};

var params = [
  {
    'key': 'Network.SSH.Enabled',
    'value': 'yes'
  }
];

camelopard.param.modify(data.cameras[0], params, function (err, res, body) {
  console.log('Parameter modified: ' + body);
});