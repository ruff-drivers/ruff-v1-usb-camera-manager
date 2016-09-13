/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

require('t');

var getAvailableCamera = require('../src/helper.js').getAvailableCamera;
describe('Test for `getAvailableCamera` method', function () {
    var dirs1 = ['foo', 'video4linux', 'video10'];
    var dirs2 = ['bar', 'video', 'video0'];

    before(function () {
        var dir1 = '';
        for (var i = 0; i < dirs1.length; i++) {
            dir1 = path.join(dir1, dirs1[i]);
            fs.mkdirSync(path.join(__dirname, dir1));
        }
        var dir2 = '';
        for (var i = 0; i < dirs2.length; i++) {
            dir2 = path.join(dir2, dirs2[i]);
            fs.mkdirSync(path.join(__dirname, dir2));
        }
    });

    after(function (done) {
        var rm = spawn('rm', ['-rf', dirs1[0], dirs2[0]], {
            cwd: __dirname,
            env: []
        });
        rm.on('exit', function (code) {
            if (code) {
                done(new Error('remove folders failed'));
                return;
            }
            done();
        });
    });

    it('should return `videoX` when matched folders existed', function (done) {
        var camera = getAvailableCamera(path.join(__dirname, 'foo'));
        assert.equal(camera, dirs1[2]);
        done();
    });

    it('should return null when no matched fold existed', function (done) {
        var camera = getAvailableCamera(path.join(__dirname, 'bar'));
        assert.equal(camera, null);
        done();
    });
});
