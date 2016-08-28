# USB Camera Manager for Ruff

This package manager all of the cameras with USB interfae that is compatible with the protocol of UVC(USB Video Class).

This package has two parts: one is the camera manager and the other is the driver of camera.

The camera manager supplies the `mount` or `unomut` events when camera is pluged into or unpluged from the system.

The driver of camera supplies some specific functions.

## Supported Engines

* Ruff: >=1.4.0 <1.5.0

## Usage

Here is the basic usage of this driver.

```js
var CameraManager = require('ruff-v1-usb-camera-manager');
var cameraManager = new CameraManager();
$('#usb').install(cameraManager);
cameraManager.on('mount', function (camera) {
    // camera is mounted
    var resolution = {
        width: 800,
        height: 600
    };
    var picture = camera.capture(resolution);

    picture.on('data', function (data) {
        // ...
    });

    picture.on('end', function () {
        // ...
    });
});

cameraManager.on('unmount', function (camera) {
    // camera is unmounted
});
```

## Manager API References

### Methods

#### `attach([callback])`

This method is defined by the framework of usb device manager (ruff-v1-usb-manager).

It is invoked by usb to install the UVC driver used by camera driver.

- **callback:** No argument other than a possible error is given to the completion callback. It is optional.

#### `detach([callback])`

This method is defined by the framework of usb device manager (ruff-v1-usb-manager).

It is invoked by usb to uninstall the UVC driver used by camera driver.

- **callback:** No argument other than a possible error is given to the completion callback. It is optional.

#### `createDevice(devPath)`

This method is defined by the framework of usb device manager (ruff-v1-usb-manager).

It is invoked by usb when one usb device is pluged into the system.

If the `devPath` does not belong to usb cameras, this method returns `null`, otherwise returns the instance of camera.

- **devPath:** The mounted path of usb device in the system.

### Events

#### `mount`

The `mount` event informs that one usb camera is pluged into the system.

#### `unmount`

The `unmount` event informs that one usb camera is pluged from the system.

## Camera API References

### Methods

#### `capture([resolution][, callback])`

Capture a picture and return an object which emits `data` and `end` events.

- **resolution:** It is an object which contains `width` and `height` properties, i.e. the resolution is `width`x`height`.
Due to memory limitation, the `resolution` must be less than `1280x720`.
If you set some resolution that is not supported by the camera, this driver will change your setting to one supported resolution.

- **callback:** No argument other than a possible error is given to the completion callback. The callback will be invoked when the capture operation is finished.

Both `resolution` and `callback` are optional parameters. The default `resolution` is 320x240.

### Events

#### `data`

The `data` event supplies the data of captured picture with JPEG format.

#### `end`

The `end` event informs the data of captured picture is ended.

## Contributing

Contributions to this project are warmly welcome. But before you open a pull request, please make sure your changes are passing code linting and tests.

You will need the latest [Ruff SDK](https://ruff.io/) to install rap dependencies and then to run tests.

### Installing Dependencies

```sh
npm install
rap install
```

### Running Tests

```sh
npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Nanchao Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
