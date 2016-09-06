'use strict';

var kernelModule = require('kernel-module');
var usbDevice = require('usb-manager');
var getAvailableCamera = require('./helper').getAvailableCamera;

var Camera = require('./camera');
var DEV_PATH = '/dev/';
var UVC_DRIVER_NAME = 'uvcvideo';

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
        var devInfo = getAvailableCamera(devPath);
        if (devInfo) {
            return new Camera({
                path: DEV_PATH + devInfo
            });
        }

        return null;
    }
};

module.exports = usbDevice(prototype);
