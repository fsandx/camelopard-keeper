## Recipe 1: Raspberry PI + NAS + IP Camera
Recipe for running a script on a Raspberry pi that grabs snapshots on a daily basis from IP camera and saves them to NAS on a local ethernet.
All instructions below assumes you are using ssh for accessing the Raspberry PI.

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

### Run scheduled image download on Raspberry PI
* edit configuration (ip adress, username, password, downloadFolder) in snapshot-simple/SnapshotSimple.js
* npm install node-schedule
* nohup node snapshot-simple/SnapshotSimple.js &

The nohup command will take care of keeping the node application running even if the ssh shell is closed, all output of the node application will be captured in a file called nohup.output. 


