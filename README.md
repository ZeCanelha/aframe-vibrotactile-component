## aframe-vibrotactile-component

[![Version](http://img.shields.io/npm/v/aframe-vibrotactile-component.svg?style=flat-square)](https://npmjs.org/package/aframe-vibrotactile-component)
[![License](http://img.shields.io/npm/l/aframe-vibrotactile-component.svg?style=flat-square)](https://npmjs.org/package/aframe-vibrotactile-component)

A-Frame component for vibratactile feedback

For [A-Frame](https://aframe.io).

### vibrotactile

| Property     | Description                   | Default Value |
| ------------ | ----------------------------- | ------------- |
| src          | Path to vibration file        | none          |
| event        | A-Frame event                 | none          |
| samplingRate | Sampling rate in milliseconds | 5             |

Basic usage example:

```html
<a-scene>
  <a-box vibrotactile="src: vibrations.json; event: mouseenter;"></a-box>
</a-scene>
```

See more examples in the [examples](examples/vibrating-boxes/vibrating-boxes-example.html) folder.

The vibrotactile component also offers a set of preset functions that can be used programmatically by the user.
For simplicity and, to avoid reiteration of parameter descriptions, the following table describes the common parameters between the **sin** and **ramp** functions.

| Property          | Description                                     | Default Value |
| ----------------- | ----------------------------------------------- | ------------- |
| samplingRate      | Sampling rate in milliseconds                   | 5             |
| numberOfActuators | Number of actuators                             | 6             |
| actuators         | The specific actuators to perform the vibration | [0,1,2,3,4,5] |
| startingTime      | Time in milliseconds to start the vibration     | 0             |
| duration          | Duration of the vibration in milliconds         | 1000          |

### vibrotactile.sin(sin, options)

| Property      | Description                       | Default Value |
| ------------- | --------------------------------- | ------------- |
| sin           | Sin properties                    | {}            |
| sin.amplitude | Sin amplitude value between [0,1] | 1             |
| sin.frequency | Sin frequency value               | 5             |
| sin.phase     | Sin phase value                   | 0             |
| options       | Common parameters                 | {}            |

### vibrotactile.ramp(initialIntensity, finalIntensity, options )

| Property         | Description                               | Default Value |
| ---------------- | ----------------------------------------- | ------------- |
| initialIntensity | Initial vibration intensity value [0,100] | none          |
| finalIntensity   | Final vibration intensity value [0,100]   | none          |
| options          | Common parameters                         | -             |

### vibrotactile.customVibrations(vibrations, samplingRate, numberOfActuators)

| Property                | Description                                                             | Default Value |
| ----------------------- | ----------------------------------------------------------------------- | ------------- |
| vibrations              | Custom vibration intensity for a given actuator(s) during a time period | {}            |
| vibrations.intensity    | Vibration intensity                                                     | -             |
| vibrations.actuators    | Vibration actuators                                                     | -             |
| vibrations.startingTime | Vibration starting time in milliseconds                                 | -             |
| vibrations.duration     | Vibration duration in milliseconds                                      | -             |

Basic usage example:

```html
<head>
  <title>Vibrotactile Component- Examples</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-vibrotactile-component@1.0.0/dist/aframe-vibrotactile-component.min.js"></script>
  <script>
    AFRAME.registerComponent("vibrotactile-example", {
      init: function () {
        var sinArgs = { ... }
        var options = { ... }
        var vibrotactile = this.el.components.vibrotactile;
        vibrotactile.sin(sinArgs, options);
      },
    });
  </script>
</head>
<body>
  <a-scene>
    <a-entity vibrotactile vibrotactile-examples></a-entity>
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
