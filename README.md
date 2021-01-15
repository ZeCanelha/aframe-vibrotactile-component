## aframe-vibrotactile-component

[![Version](http://img.shields.io/npm/v/aframe-vibrotactile-component.svg?style=flat-square)](https://npmjs.org/package/aframe-vibrotactile-component)
[![License](http://img.shields.io/npm/l/aframe-vibrotactile-component.svg?style=flat-square)](https://npmjs.org/package/aframe-vibrotactile-component)

A-Frame component for vibrotactile feedback

For [A-Frame](https://aframe.io).

### vibrotactile {#vibrotactile}

When creating the **vibrotactile** component for A-Frame, we pass as an argument a file exported from [Vibrotactile Editor](https://github.com/ZeCanelha/VibrotactileEditor. Briefly, this editor allows to create and export a set of vibrotactile sensations, which we refer in this documentation as the vibration file.

<!-- Falar sobre a estrutra do ficheiro ? -->

| Property | Description                | Default Value |
| -------- | -------------------------- | ------------- |
| src      | Path to the vibration file | none          |
| event    | A-Frame event              | none          |

Basic usage example:

```html
<a-scene>
  <a-box vibrotactile="src: vibrations.json; event: mouseenter;"></a-box>
</a-scene>
```

See more examples in the [examples](examples/vibrating-boxes/vibrating-boxes-example.html) folder.

The vibrotactile component offers a set of preset functions that can be used programmatically by the user.
For simplicity the following table describes the common parameters between the **sin** and **ramp** functions.

### Common parameters {#common}

| Property          | Description                                     | Default Value   |
| ----------------- | ----------------------------------------------- | --------------- |
| samplingRate      | Sampling rate in milliseconds                   | `5`             |
| numberOfActuators | Number of actuators                             | `6`             |
| actuators         | The specific actuators to perform the vibration | `[0,1,2,3,4,5]` |
| startingTime      | Time in milliseconds to start the vibration     | `0 `            |
| duration          | Duration of the vibration in milliseconds       | `1000 `         |

### vibrotactile.sin(sin, options)

The sin function allows to create a **sinusoidal waveform** vibration.

| Property      | Description                                            | Default Value      |
| ------------- | ------------------------------------------------------ | ------------------ |
| sin           | A JavaScrip object containing the sine wave properties |                    |
| sin.amplitude | Sine amplitude value between [0,1]                     | `1 `               |
| sin.frequency | Sine frequency value                                   | `5`                |
| sin.phase     | Sine phase value                                       | `0`                |
| options       | Common parameters                                      | [options](#common) |

Example:

```html
<head>
  <title>Vibrotactile Component - Sin example</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-vibrotactile-component@1.0.0/dist/aframe-vibrotactile-component.min.js"></script>
  <script>
    AFRAME.registerComponent("vibrotactile-example", {
      init: function () {
        var sin = {
          amplitude: 0.8,
          frequency: 10,
        };
        var options = {
          samplingRate: 10,
          actuators: [0, 1],
          numberOfActuators: 6,
          startingTime: 0,
          duration: 1500,
        };
        var vibrotactile = this.el.components.vibrotactile;
        vibrotactile.sin(sin, options);
      },
    });
  </script>
</head>
<body>
  <a-scene>
    <a-entity vibrotactile vibrotactile-example></a-entity>
  </a-scene>
</body>
```

### vibrotactile.ramp(initialIntensity, finalIntensity, options )

The ramp function allows to create a single sawtooth wave, a **ramp waveform** vibration.

| Property              | Description                                             | Default Value      |
| --------------------- | ------------------------------------------------------- | ------------------ |
| ramp                  | A JavaScript object containing the ramp wave properties |                    |
| ramp.initialIntensity | Initial vibration intensity value [0,100]               | `0`                |
| ramp.finalIntensity   | Final vibration intensity value [0,100]                 | `100`              |
| options               | Common parameters                                       | [options](#common) |

The ramp function is similar to the sin. Example:

```html
<head>
  <title>Vibrotactile Component - Ramp example</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-vibrotactile-component@1.0.0/dist/aframe-vibrotactile-component.min.js"></script>
  <script>
    AFRAME.registerComponent("vibrotactile-example", {
      init: function () {
        var ramp = {
          initialIntensity: 25,
          finalIntensity: 10,
        };
        var options = {
          samplingRate: 5,
          actuators: [3, 4, 5, 6],
          numberOfActuators: 6,
          startingTime: 0,
          duration: 500,
        };
        var vibrotactile = this.el.components.vibrotactile;
        vibrotactile.ramp(ramp, options);
      },
    });
  </script>
</head>
<body>
  <a-scene>
    <a-entity vibrotactile vibrotactile-example></a-entity>
  </a-scene>
</body>
```

### vibrotactile.sendVibrations(vibrationFile)

The sendVibrations function allows the programmatic execution of a vibration file passed as a parameter. If no file is specified, the function will execute the file specified at [component initialization](#vibrotactile).

| Property      | Description                                                                                                         | Default Value                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| vibrationFile | Path to the vibration file exported from the [Vibrotactile Editor](https://github.com/ZeCanelha/VibrotactileEditor) | Vibration file specified at component initialization |

Example:

```html
<head>
  <title>Vibrotactile Component - Send vibrations example</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-vibrotactile-component@1.0.0/dist/aframe-vibrotactile-component.min.js"></script>
  <script>
    AFRAME.registerComponent("vibrotactile-example", {
      init: function () {
        var waveVibration = "path/to/waveVibrationFile.json";
        var vibrotactile = document.querySelector(#box).components.vibrotactile;

        // Sends the vibrations specified at the src property
        vibrotactile.sendVibrations();
        // Sends the wave vibration file
        vibrotactile.sendVibrations(waveVibration);
      },
    });
  </script>
</head>
<body>
  <a-scene>
    <a-box
      id="box"
      vibrotactile="src: path/to/vibrationFile.json; event:mouseenter"
    ></a-box>
  </a-scene>
</body>
```

### vibrotactile.customVibrations(vibrations, samplingRate, numberOfActuators)

The customVibrations function allows the construction of elaborated vibrations, close to the level achieved with the Editor, in a simple programmatic way.

| Property               | Description                                           | Default Value |
| ---------------------- | ----------------------------------------------------- | ------------- |
| vibrations             | JavaScript object containing the vibration properties |               |
| vibration.intensity    | Vibration intensity                                   | -             |
| vibration.actuators    | Array of `Number` indicating the actuators            | -             |
| vibration.startingTime | Vibration starting time in milliseconds               | -             |
| vibration.duration     | Vibration duration in milliseconds                    | -             |

Example:

```html
<head>
  <title>Vibrotactile Component - Custom vibration example</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-vibrotactile-component@1.0.0/dist/aframe-vibrotactile-component.min.js"></script>
  <script>
    AFRAME.registerComponent("vibrotactile-example", {
      init: function () {
        const samplingRate = 5;
        const numberOfActuators = 6;
        var vibrations = [];
        var vibrationObject = {
          actuators: [1, 2],
          intensity: 50,
          startingTime: 0,
          duration: 1000,
        };
        vibrations.push(vibrationObject);

        var vibrotactile = this.el.components.vibrotactile;
        vibrotactile.customVibrations(
          vibrations,
          samplingRate,
          numberOfActuators
        );
      },
    });
  </script>
</head>
<body>
  <a-scene>
    <a-entity vibrotactile vibrotactile-example></a-entity>
  </a-scene>
</body>
```

See more [examples](examples/walking/walking-example.js).

### Installation

#### Browser Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-vibrotactile-component@1.0.0/dist/aframe-vibrotactile-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity
      vibrotactile="src: vibrations.json; event: click;"
      geometry="primitive: box;"
    ></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-vibrotactile-component
```

Then require and use.

```js
require("aframe");
require("aframe-vibrotactile-component");
```
