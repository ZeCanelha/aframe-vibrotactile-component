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

eval("/* global AFRAME */\nif (typeof AFRAME === \"undefined\") {\n  throw new Error(\"Component attempted to register before AFRAME was available.\");\n}\n/**\n * Vibrotactile component for A-Frame.\n */\n\n\nconst BASE_URL = \"http://localhost:3003/api\";\nconst ENDPOINT = \"/vibrate\";\nconst DEFAULT_SAMPLING_RATE = 5;\nconst DEFAULT_NUMBER_OF_ACTUATORS = 6;\nconst DEFAULT_ACTUATORS = [0, 1, 2, 3, 4, 5];\nconst DEFAULT_STARTING_TIME = 0;\nconst DEFAULT_DURATION = 1000;\nconst DEFAULT_AMPLITUDE = 1;\nconst DEFAULT_FREQUENCY = 5;\nconst DEFAULT_PHASE = 0;\nconst DEFAULT_INITIAL_INTENSITY = 0;\nconst DEFAULT_FINAL_INTENSITY = 100;\nconst LOGGER = {\n  WARNING_FILE: \"Warning: No vibration file specified.\",\n  WARNING_EVENT: \"Warning: No event associated.\",\n  ERROR_LOADING: \"Error: Could not load the vibration file. Check your path for errors.\"\n};\nAFRAME.registerComponent(\"vibrotactile\", {\n  schema: {\n    src: {\n      type: \"string\"\n    },\n    event: {\n      type: \"string\"\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    var self = this;\n\n    if (this.data.src) {\n      this.vibrations = this.loadVibrationsByURL(this.data.src);\n    }\n\n    this.vibrationHandler = function () {\n      self.sendVibrations(self.vibrations);\n    };\n  },\n\n  /**\n   * Called when component is attached and when component data changes.\n   * Generally modifies the entity based on the data.\n   */\n  update: function (oldData) {\n    var data = this.data;\n    var el = this.el; // \"event updated\": Remove the previous event listener if it exists\n\n    if (oldData.event && data.event !== oldData.event) {\n      el.removeEventListener(oldData.event, this.vibrationHandler);\n    } // updated vibration file\n\n\n    if (oldData.src && data.src !== oldData.src) {\n      this.vibrations = this.loadVibrationsByURL(data.src).then(data => {\n        return data;\n      });\n    }\n\n    if (data.event) {\n      el.addEventListener(data.event, this.vibrationHandler);\n    } else {\n      console.log(LOGGER.WARNING_EVENT);\n    }\n\n    if (!data.src) {\n      console.log(LOGGER.WARNING_FILE);\n    }\n  },\n\n  /**\n   * Called when a component is removed (e.g., via removeAttribute).\n   * Generally undoes all modifications to the entity.\n   */\n  remove: function () {\n    var data = this.data;\n    var el = this.el; // Remove the event listener\n\n    if (data.event) {\n      el.removeEventListener(data.event, this.vibrationHandler);\n    }\n  },\n  loadVibrationsByURL: async function (path) {\n    const response = await fetch(path);\n\n    if (!response.ok) {\n      throw new Error(LOGGER.ERROR_LOADING);\n    } else {\n      console.log(\"Vibrations from \" + this.data.src + \" attached with success\");\n    }\n\n    const body = await response.json();\n    return body;\n  },\n  sendVibrations: function () {\n    vibrations = arguments[0] || this.vibrations;\n    fetch(BASE_URL + ENDPOINT, {\n      headers: {\n        \"Content-Type\": \"application/json\"\n      },\n      method: \"POST\",\n      body: JSON.stringify(vibrations)\n    }).then(data => {\n      if (data.status === 200) {\n        return data.json();\n      } else console.log(data);\n    }).catch(error => {\n      console.error(error);\n    });\n  },\n\n  /**\n   *\n   * @param {Object} vibrations Custom vibration intensity for a given actuator(s) during a time period\n   * @param {Number} samplingRate Sampling rate\n   * @param {Number} numberOfActuators Number of total actuators\n   */\n  customVibrations: function (vibrations, samplingRate = 5, numberOfActuators = 6) {\n    var channel = [];\n    vibrations.forEach(element => {\n      var datapoints = [];\n      var pattern = [];\n      datapoints.push({\n        time: 0,\n        intensity: element.intensity\n      });\n      datapoints.push({\n        time: element.duration,\n        intensity: element.intensity\n      });\n      const patternData = {\n        datapoints: datapoints,\n        startingTime: element.startingTime,\n        duration: element.duration\n      };\n      pattern.push(patternData);\n      channel.push({\n        patterns: pattern,\n        actuators: element.actuators\n      });\n    });\n    const body = {\n      samplingRate: samplingRate,\n      numberOfActuators: numberOfActuators,\n      channels: channel\n    };\n    this.sendVibrations(body);\n  },\n\n  /**\n   * @param {Object} sin  Sin properties\n   * @param {Number} sin.amplitude Sin amplitude value\n   * @param {Number} sin.frequency Sin frequency value\n   * @param {Number} sin.options Common parameters\n   */\n  sin: function (sin, options) {\n    var options = options || {};\n    var actuators = options.actuators || DEFAULT_ACTUATORS;\n    var startingTime = options.startingTime || DEFAULT_STARTING_TIME;\n    var duration = options.duration || DEFAULT_DURATION;\n    var samplingRate = options.samplingRate || DEFAULT_SAMPLING_RATE;\n    var numberOfActuators = options.numberOfActuators || DEFAULT_NUMBER_OF_ACTUATORS;\n    var sin = sin || {};\n    var amplitude = sin.amplitude || DEFAULT_AMPLITUDE;\n    var frequency = sin.frequency || DEFAULT_FREQUENCY;\n    var phase = sin.phase || DEFAULT_PHASE;\n    var channel = [];\n    var pattern = [];\n    const sinVibration = {\n      frequency: frequency,\n      amplitude: amplitude,\n      phase: phase\n    };\n    const patternData = {\n      sin: sinVibration,\n      startingTime: startingTime,\n      duration: duration\n    };\n    pattern.push(patternData);\n    channel.push({\n      patterns: pattern,\n      actuators: actuators\n    });\n    const body = {\n      samplingRate: samplingRate,\n      numberOfActuators: numberOfActuators,\n      channels: channel\n    };\n    this.sendVibrations(body);\n  },\n\n  /**\n   *\n   * @param {Object} ramp - Ramp function intensity values\n   * @param {Number} ramp.initialIntensity Initial vibration intensity value\n   * @param {Number} ramp.finalIntensity Final vibration intensity value\n   * @param {Object} options Common parameters\n   */\n  ramp: function (ramp, options) {\n    var options = options || {};\n    var ramp = ramp || {};\n    var actuators = options.actuators || DEFAULT_ACTUATORS;\n    var startingTime = options.startingTime || DEFAULT_STARTING_TIME;\n    var duration = options.duration || DEFAULT_DURATION;\n    var samplingRate = options.samplingRate || DEFAULT_SAMPLING_RATE;\n    var numberOfActuators = options.numberOfActuators || DEFAULT_NUMBER_OF_ACTUATORS;\n    var initialIntensity = ramp.initialIntensity || DEFAULT_INITIAL_INTENSITY;\n    var finalIntensity = ramp.finalIntensity || DEFAULT_FINAL_INTENSITY;\n    var channel = [];\n    var pattern = [];\n    const rampVibrations = {\n      initialIntensity: initialIntensity,\n      finalIntensity: finalIntensity\n    };\n    const patternData = {\n      ramp: rampVibrations,\n      startingTime: startingTime,\n      duration: duration\n    };\n    pattern.push(patternData);\n    channel.push({\n      patterns: pattern,\n      actuators: actuators\n    });\n    const body = {\n      samplingRate: samplingRate,\n      numberOfActuators: numberOfActuators,\n      channels: channel\n    };\n    this.sendVibrations(body);\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });
});