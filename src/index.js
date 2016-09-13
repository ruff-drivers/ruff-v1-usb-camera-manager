/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

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
    createDevice: function (devPath, options) {
        var devInfo = getAvailableCamera(devPath);
        if (devInfo) {
            var cameraOptions = {
                path: DEV_PATH + devInfo
            };
            if (options && options.resolution) {
                cameraOptions.resolution = options.resolution;
            }
            return new Camera(cameraOptions);
        }

        return null;
    }
};

module.exports = usbDevice(prototype);
