//Camelopard demo
// Find IP adress of camera through: 
// nmap -sP -PA21,22,25,3389 192.168.1.0/24
// or/and: arp -a -n

var camelopard  = require('camelopard'),
    _           = require('lodash');

var data = {
  "cameras": [
    {
      "name": "Default Camera",
      "brand": "Axis",
      "ip": "192.168.0.150", 
      "username": "root",
      "password": "pass",
      "snapshot": {
        "resolution": "1024x768",
        "compression": 30,
        "rotation": 0,
        "cameraNum": 1,
        "downloadFolder": "files\/snapshots"
      }
    },
    {
      "name": "Default Camera",
      "brand": "Axis",
      "ip": "192.168.0.200", 
      "username": "root",
      "password": "pass",
      "snapshot": {
        "resolution": "1024x768",
        "compression": 30,
        "rotation": 0,
        "cameraNum": 1,
        "downloadFolder": "files\/snapshots"
      }
    }
  ]
};
var cams = data.cameras;

_.forEach(cams, function (conf) {
  camelopard.image.download(conf, function (err, res) {
    if (!_.isUndefined(err)) {
      console.log('Error!' + err);
    } else {
      console.log('Image file downloaded as: ' + res);
    }
  });
});