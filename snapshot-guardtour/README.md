# Snapshot Guardtours

On a PTZ camera a position (pan, tilt, zoom) can be saved on the camera as a preset with a name.
With this example-script you can move between presets and take a snapshot from the positions.

## SnapshotGuardtour
The SnapshotGuardtour performs a custom guard tour between predefined PTZ presets,
and takes a snapshot from each position.

Install:

    npm install camelopard
    
Run: 

    node snapshotguardtour/SnaphotGuardtour.js
    

## ScheduledSnapshotGuardtour
The ScheduledSnaphotGuardtour performs scheduled guard tour between predefined PTZ presets,
and takes a snapshot from each position, everytime.

Install:

    npm install camelopard
    
Run: 

    node snapshotguardtour/ScheduledSnaphotGuardtour.js
    

Recommendation: Use forever npm package, https://www.npmjs.com/package/forever, to run script as a daemon.
