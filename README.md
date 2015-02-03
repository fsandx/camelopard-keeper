# Camelopard-keeper

<img src="https://raw.githubusercontent.com/fsandx/camelopard/master/assets/camelopard.png">

This a collection of example scripts and recepies targeting the camelopard npm package and one or many Axis IP camera(s). The npm package can be found here: https://www.npmjs.com/package/camelopard.

## Scripts
All scripts are located in a subfolder of this repo, together with a more detailed README-file. Please be aware of required npm packages to install in the root of this repo.You can run a script by executing: ` node subfolder/script.js ` in the repo root.

* Parameters, list all: https://github.com/fsandx/camelopard-keeper/tree/master/params-list
* Parameter, modify: https://github.com/fsandx/camelopard-keeper/tree/master/params-modify
* Image - grap a snapshot from an ip camera on regular intervalls: https://github.com/fsandx/camelopard-keeper/tree/master/snapshot-simple
* Image - grap snapshots from many ip cameras at the same time: https://github.com/fsandx/camelopard-keeper/tree/master/snapshot-multi-cams
* Image, PTZ: Go on virtual guardtours and grap images on a regular basis from many PTZ-position: https://github.com/fsandx/camelopard-keeper/tree/master/snapshot-guardtour

## Recepies
* Run scheduled scripts on a Raspberry PI that downloads images to a Network Attached Storage (NAS): https://github.com/fsandx/camelopard-keeper/blob/master/ras-pi-nas.md
