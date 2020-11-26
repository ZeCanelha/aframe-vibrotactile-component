## aframe-vibrotactile-component

[![Version](http://img.shields.io/npm/v/aframe-vibrotactile-component.svg?style=flat-square)](https://npmjs.org/package/aframe-vibrotactile-component)
[![License](http://img.shields.io/npm/l/aframe-vibrotactile-component.svg?style=flat-square)](https://npmjs.org/package/aframe-vibrotactile-component)

A-Frame component for vibratactile feedback

For [A-Frame](https://aframe.io).

### vibrotactile

| Property     | Description                   | Default Value |
| ------------ | ----------------------------- | ------------- |
| src          | Path to vibration file        | none          |
| event        | A-Frame Event                 | none          |
| samplingRate | Sampling rate in milliseconds | 5             |

Common Parameters of the following available functions.

| Property          | Description                                     | Default Value |
| ----------------- | ----------------------------------------------- | ------------- |
| samplingRate      | Sampling rate in milliseconds                   | 5             |
| numberOfActuators | Number of actuators                             | 6             |
| actuators         | The specific actuators to perform the vibration | none          |
| startingTime      | Time in milliseconds to start the vibration     | 0             |
| duration          | Duration of the vibration in milliconds         | 1000          |

### vibrotactile.sin(amplitude, frequency, phase, actuators, startingTime, duration, samplingRate, numberOfActuators)

| Property  | Description                       | Default Value |
| --------- | --------------------------------- | ------------- |
| amplitude | Sin amplitude value between [0,1] | 1             |
| frequency | Sin frequency value               | 5             |
| phase     | Sin phase value                   | 0             |

### vibrotactile.ramp(initialIntensity, finalIntensity, actuators, startingTime, duration, samplingRate, numberOfActuators )

| Property         | Description                               | Default Value |
| ---------------- | ----------------------------------------- | ------------- |
| initialIntensity | Initial vibration intensity value [0,100] | none          |
| finalIntensity   | Final vibration intensity value [0,100]   | none          |

### vibrotactile.vibrations(vibrations, samplingRate, numberOfActuators)

| Property   | Description                                                                                | Type                | Example                                                            |
| ---------- | ------------------------------------------------------------------------------------------ | ------------------- | ------------------------------------------------------------------ |
| vibrations | Custom vibration intensity for a given actuator(s) during a time period ( in milliseconds) | Array of **Object** | { intensity: 50; actuators: [1,2]; startingTime: 0; duration: 500} |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

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
