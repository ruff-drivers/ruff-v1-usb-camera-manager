'use strict';

var kernelModule = require('kernel-module');
var usbDevice = require('usb-manager');
var fs = require('fs');
var Dir = require('_file').Dir;

var Camera = require('./camera');
var DEV_PATH = '/dev/';
var UVC_DRIVER_NAME = 'uvcvideo';

var CAMERA_CHECK_PATH = '/video4linux';
var cameraNameRegExp = /video[0-9]+/;

function checkAvailable(devPath) {
    var checkedPath = devPath + CAMERA_CHECK_PATH;
    try {
        fs.statSync(checkedPath);
        var dir = new Dir(checkedPath);
        var items = dir.listSync();
        for (var i = 0; i < items.length; i++) {
            if (cameraNameRegExp.exec(items[i].name) !== null) {
                return items[i].name;
            }
        }
    } catch (error) {
        return null;
    }
}

var prototype = {
    attach: function (callback) {
        try {
            kernelModule.install(UVC_DRIVER_NAME);
            callback && callback();
        } catch (error) {
            callback && callback(error);
        }
    },
    detach: function (callback) {
        try {
            kernelModule.remove(UVC_DRIVER_NAME);
            callback && callback();
        } catch (error) {
            callback && callback(error);
        }
    },
    createDevice: function (devPath) {
        var devInfo = checkAvailable(devPath);
        if (devInfo) {
            return new Camera({
                path: DEV_PATH + devInfo
            });
        }

        return null;
    }
};

module.exports = usbDevice(prototype);
