## aframe-vibrotactile-component

[![Version](http://img.shields.io/npm/v/aframe-vibrotactile-component.svg?style=flat-square)](https://npmjs.org/package/aframe-vibrotactile-component)
[![License](http://img.shields.io/npm/l/aframe-vibrotactile-component.svg?style=flat-square)](https://npmjs.org/package/aframe-vibrotactile-component)

A-Frame component for vibratactile feedback

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| src | Path to vibration file | none |
| event | A-Frame Event | none |
| samplingRate | Sampling rate in milliseconds | 5 |

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