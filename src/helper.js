/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var fs = require('fs');
var path = require('path');

var cameraNameRegExp = /video[0-9]+/;

function getAvailableCamera(devPath) {
    var checkedPath = path.join(devPath, 'video4linux');
    try {
        fs.statSync(checkedPath);
    } catch (error) {
        return null;
    }

    var items = fs.readdirSync(checkedPath);

    for (var i = 0; i < items.length; i++) {
        if (cameraNameRegExp.test(items[i])) {
            return items[i];
        }
    }

    return null;
}

exports.getAvailableCamera = getAvailableCamera;
