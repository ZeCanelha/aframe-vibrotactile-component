(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* global AFRAME */\nif (typeof AFRAME === \"undefined\") {\n  throw new Error(\"Component attempted to register before AFRAME was available.\");\n}\n/**\n * Vibrotactile component for A-Frame.\n */\n\n\nconst BASE_URL = \"http://localhost:3003/api\";\nconst ENDPOINT = \"/vibrate\";\nconst DEFAULT_VIBRATION = 5;\nAFRAME.registerComponent(\"vibrotactile\", {\n  schema: {\n    src: {\n      type: \"string\"\n    },\n    event: {\n      type: \"string\"\n    },\n    samplingRate: {\n      type: \"number\",\n      default: DEFAULT_VIBRATION\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    var self = this;\n\n    this.vibrationHandler = function () {\n      var vibrationPatternPath = self.data.src;\n      self.loadVibrationsByURL(vibrationPatternPath).then(vibrations => {\n        self.sendVibrations(vibrations);\n      });\n    };\n  },\n\n  /**\n   * Called when component is attached and when component data changes.\n   * Generally modifies the entity based on the data.\n   */\n  update: function (oldData) {\n    var data = this.data;\n    var el = this.el; // \"event updated\": Remove the previous event listener if it exists\n\n    if (oldData.event && data.event !== oldData.event) {\n      el.removeEventListener(oldData.event, this.vibrationHandler);\n    }\n\n    if (data.event) {\n      el.addEventListener(data.event, this.vibrationHandler);\n    } else {\n      console.log(\"No event associated\");\n    }\n  },\n\n  /**\n   * Called when a component is removed (e.g., via removeAttribute).\n   * Generally undoes all modifications to the entity.\n   */\n  remove: function () {\n    var data = this.data;\n    var el = this.el; // Remove the event listener\n\n    if (data.event) {\n      el.removeEventListener(data.event, this.vibrationHandler);\n    }\n  },\n\n  /**\n   * Called on each scene tick.\n   */\n  // tick: function (t) { },\n\n  /**\n   * Called when entity pauses.\n   * Use to stop or remove any dynamic or background behavior such as events.\n   */\n  pause: function () {},\n\n  /**\n   * Called when entity resumes.\n   * Use to continue or add any dynamic or background behavior such as events.\n   */\n  play: function () {},\n\n  /**\n   * Event handlers that automatically get attached or detached based on scene state.\n   */\n  events: {// click: function (evt) { }\n  },\n  loadVibrationsByURL: async function (path) {\n    try {\n      let response = await fetch(path);\n      return await response.json();\n    } catch (error) {\n      return error;\n    }\n  },\n  sendVibrations: function (vibrations) {\n    fetch(BASE_URL + ENDPOINT, {\n      headers: {\n        \"Content-Type\": \"application/json\"\n      },\n      method: \"POST\",\n      body: JSON.stringify(vibrations)\n    }).then(data => {\n      if (data.status === 200) {\n        return data.json();\n      } else console.log(data);\n    }).catch(error => {\n      console.error(error);\n    });\n  },\n\n  /**\n   *\n   * @param {*} intensities Intensity values for each specified actuator\n   * @param {*} actuators Actuators where the vibration will occur\n   * @param {*} startingTime Time in milliseconds to start the vibration\n   * @param {*} duration Duration of the vibration\n   * @param {*} samplingRate Sampling rate\n   * @param {*} numberOfActuators Number of total actuators\n   */\n  customVibration: function (intensities, startingTime, duration, samplingRate = 5, numberOfActuators = 6) {\n    let channel = [];\n    console.log(intensities);\n    intensities.forEach(element => {\n      let datapoints = [];\n      let pattern = [];\n      datapoints.push({\n        time: 0,\n        intensity: element.intensity\n      });\n      datapoints.push({\n        time: duration,\n        intensity: element.intensity\n      });\n      const patternData = {\n        datapoints: datapoints,\n        startingTime: startingTime,\n        duration: duration\n      };\n      pattern.push(patternData);\n      channel.push({\n        patterns: pattern,\n        actuators: element.actuators\n      });\n    });\n    const body = {\n      samplingRate: samplingRate,\n      numberOfActuators: numberOfActuators,\n      channels: channel\n    };\n    this.sendVibrations(body);\n  },\n\n  /**\n   *\n   * @param {*} amplitude Sin amplitude value\n   * @param {*} frequency Sin frequency value\n   * @param {*} phase Sin phase value\n   * @param {*} actuators Actuators where the vibration will occur\n   * @param {*} startingTime Time in milliseconds to start the vibration\n   * @param {*} duration Duration of the vibration\n   * @param {*} samplingRate Sampling rate\n   * @param {*} numberOfActuators Number of total actuators\n   */\n  sin: function (amplitude = 1, frequency, phase = 0, actuators, startingTime, duration, samplingRate = 5, numberOfActuators = 6) {\n    let channel = [];\n    let pattern = [];\n    const sinVibration = {\n      frequency: frequency,\n      amplitude: amplitude,\n      phase: phase\n    };\n    const patternData = {\n      sin: sinVibration,\n      startingTime: startingTime,\n      duration: duration\n    };\n    pattern.push(patternData);\n    channel.push({\n      patterns: pattern,\n      actuators: actuators\n    });\n    const body = {\n      samplingRate: samplingRate,\n      numberOfActuators: numberOfActuators,\n      channels: channel\n    };\n    this.sendVibrations(body);\n  },\n\n  /**\n   *\n   * @param {*} initialIntensity Initial vibration intensity value\n   * @param {*} finalIntensity Final vibration intensity value\n   * @param {*} actuators Actuators where the vibration will occur\n   * @param {*} startingTime Time in milliseconds to start the vibration\n   * @param {*} duration Duration of the vibration\n   * @param {*} samplingRate Sampling Rate\n   * @param {*} numberOfActuators Number of total actuators\n   */\n  ramp: function (initialIntensity, finalIntensity, actuators, startingTime, duration, samplingRate = 5, numberOfActuators = 6) {\n    let channel = [];\n    let pattern = [];\n    const rampVibrations = {\n      initialIntensity: initialIntensity,\n      finalIntensity: finalIntensity\n    };\n    const patternData = {\n      ramp: rampVibrations,\n      startingTime: startingTime,\n      duration: duration\n    };\n    pattern.push(patternData);\n    channel.push({\n      patterns: pattern,\n      actuators: actuators\n    });\n    const body = {\n      samplingRate: samplingRate,\n      numberOfActuators: numberOfActuators,\n      channels: channel\n    };\n    this.sendVibrations(body);\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });
});