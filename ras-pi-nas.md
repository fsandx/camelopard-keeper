## Recipe 1: Raspberry PI + NAS + IP Camera
Recipe for running a script on a Raspberry pi that downloads images on a schedule from IP camera and saves them to NAS on a local ethernet.

### Install Nodejs on Raspberry PI
* 	sudo apt-get update -y && sudo apt-get upgrade -y
* 	wget http://node-arm.herokuapp.com/node_latest_armhf.deb
*  	sudo dpkg -i node_latest_armhf.deb
* 	node -v

### Mount NAS on Raspberry PI
* 	cd /home/pi
* 	mkdir myNAS
* 	cd myNAS
* 	mkdir myShare
* 	sudo nano /etc/fstab
* 	add line at the bottom: //myNAS/myShare /home/pi/myNAS/myShare cifs username=your_username,password=your_password,uid=pi,gid=pi 0 0
*	sudo reboot (or, sudo mount /home/pi/myNAS/myShare)

### Install camelopard on Raspberry PI
* 	mkdir camelopard-keeper 
* 	git clone https://github.com/fsandx/camelopard-keeper camelopard-keeper
* 	npm install camelopard
* 	npm install request
* 	npm install lodash
* 	npm install mkdirp

### Run scheduled image download on RaspBerry PI
* edit configuration in snapshot-simple/SnapshotSimple.js
* npm install node-schedule
* node snapshot-simple/SnapshotSimple.js


