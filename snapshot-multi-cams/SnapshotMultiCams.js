//Camelopard demo
// Find IP adress of camera through: 
// nmap -sP -PA21,22,25,3389 192.168.1.0/24
// or/and: arp -a -n

var camelopard = require('camelopard');
var _ = require('lodash');

camelopard.addCameraConfiguration({name: 'MycamA', brand: 'Axis', ip: '192.168.0.200', username: 'root', password: 'pass'});
camelopard.addCameraConfiguration({name: 'MycamB', brand: 'Axis', ip: '192.168.0.150', username: 'root', password: 'pass'});
camelopard.addCameraConfiguration({name: 'MycamV', brand: 'Axis', ip: '192.168.0.120', username: 'root', password: 'pass'});
var cams = camelopard.getCameraConfigurations();

_.forEach(cams, function (conf) {
    camelopard.image.download(conf, function (err, res) {
      if (err !== undefined) {
        console.log('Error!' + err)
      } else {
        console.log('Image file downloaded as: ' + res);
      }
  })
})