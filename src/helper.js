'use strict';

var fs = require('fs');
var path = require('path');

var cameraNameRegExp = /video[0-9]+/;

function getAvailableCamera(devPath) {
    var checkedPath = path.join(devPath, 'video4linux');
    try {
        fs.statSync(checkedPath);
        var items = fs.readdirSync(checkedPath);
        for (var i = 0; i < items.length; i++) {
            if (cameraNameRegExp.exec(items[i]) !== null) {
                return items[i];
            }
        }
    } catch (error) {
        return null;
    }
}

exports.getAvailableCamera = getAvailableCamera;
