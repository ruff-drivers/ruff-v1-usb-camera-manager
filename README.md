# USB Camera Manager for Ruff

This module manager all of the cameras with USB interfae that is compatible with the protocol of UVC(USB Video Class).

## Supported Engines

* Ruff: >=1.4.0 <1.5.0

## Usage

Here is the basic usage of this driver.

```js
var CameraManager = require('ruff-v1-usb-camera-manager');
var cameraManager = new CameraManager();
usb.install(cameraManager);
cameraManager.on('mount', function (camera)) {
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

cameraManager.on('unmount', function (camera)) {
    // camera is unmounted
});
```

## Manager API References

### Methods

#### `attach([callback])`

#### `detach([callback])`

#### `createDevice(devPath)`

### Events

#### `mount`

#### `unmount`

## Camera API References

### Methods

#### `capture([resolution][, callback])`

### Events

#### `data`

#### `end`


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
