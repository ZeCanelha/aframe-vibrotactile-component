/* global AFRAME */

if (typeof AFRAME === "undefined") {
  throw new Error(
    "Component attempted to register before AFRAME was available."
  );
}

/**
 * Vibrotactile component for A-Frame.
 */

const BASE_URL = "http://localhost:3003/api";
const ENDPOINT = "/vibrate";
const DEFAULT_VIBRATION = 5;

AFRAME.registerComponent("vibrotactile", {
  schema: {
    src: { type: "string" },
    event: { type: "string" },
    samplingRate: { type: "number", default: DEFAULT_VIBRATION },
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    var self = this;
    this.vibrationHandler = function () {
      var vibrationPatternPath = self.data.src;
      self.loadVibrationsByURL(vibrationPatternPath).then((vibrations) => {
        self.sendVibrations(vibrations);
      });
    };
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    var data = this.data;
    var el = this.el;

    // "event updated": Remove the previous event listener if it exists
    if (oldData.event && data.event !== oldData.event) {
      el.removeEventListener(oldData.event, this.vibrationHandler);
    }

    if (data.event) {
      el.addEventListener(data.event, this.vibrationHandler);
    } else {
      console.log("No event associated");
    }
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {
    var data = this.data;
    var el = this.el;
    // Remove the event listener
    if (data.event) {
      el.removeEventListener(data.event, this.vibrationHandler);
    }
  },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () {},

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () {},

  /**
   * Event handlers that automatically get attached or detached based on scene state.
   */
  events: {
    // click: function (evt) { }
  },

  loadVibrationsByURL: async function (path) {
    try {
      let response = await fetch(path);
      return await response.json();
    } catch (error) {
      return error;
    }
  },

  sendVibrations: function (vibrations) {
    fetch(BASE_URL + ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(vibrations),
    })
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  /**
   *
   * @param {*} intensities Intensity values for each specified actuator
   * @param {*} actuators Actuators where the vibration will occur
   * @param {*} startingTime Time in milliseconds to start the vibration
   * @param {*} duration Duration of the vibration
   * @param {*} samplingRate Sampling rate
   * @param {*} numberOfActuators Number of total actuators
   */

  customVibration: function (
    intensities,
    startingTime,
    duration,
    samplingRate = 5,
    numberOfActuators = 6
  ) {
    let channel = [];
    console.log(intensities);
    intensities.forEach((element) => {
      let datapoints = [];
      let pattern = [];
      datapoints.push({ time: 0, intensity: element.intensity });
      datapoints.push({ time: duration, intensity: element.intensity });

      const patternData = {
        datapoints: datapoints,
        startingTime: startingTime,
        duration: duration,
      };

      pattern.push(patternData);
      channel.push({ patterns: pattern, actuators: element.actuators });
    });

    const body = {
      samplingRate: samplingRate,
      numberOfActuators: numberOfActuators,
      channels: channel,
    };

    this.sendVibrations(body);
  },

  /**
   *
   * @param {*} amplitude Sin amplitude value
   * @param {*} frequency Sin frequency value
   * @param {*} phase Sin phase value
   * @param {*} actuators Actuators where the vibration will occur
   * @param {*} startingTime Time in milliseconds to start the vibration
   * @param {*} duration Duration of the vibration
   * @param {*} samplingRate Sampling rate
   * @param {*} numberOfActuators Number of total actuators
   */

  sin: function (
    amplitude = 1,
    frequency,
    phase = 0,
    actuators,
    startingTime,
    duration,
    samplingRate = 5,
    numberOfActuators = 6
  ) {
    let channel = [];
    let pattern = [];

    const sinVibration = {
      frequency: frequency,
      amplitude: amplitude,
      phase: phase,
    };
    const patternData = {
      sin: sinVibration,
      startingTime: startingTime,
      duration: duration,
    };

    pattern.push(patternData);
    channel.push({ patterns: pattern, actuators: actuators });

    const body = {
      samplingRate: samplingRate,
      numberOfActuators: numberOfActuators,
      channels: channel,
    };

    this.sendVibrations(body);
  },

  /**
   *
   * @param {*} initialIntensity Initial vibration intensity value
   * @param {*} finalIntensity Final vibration intensity value
   * @param {*} actuators Actuators where the vibration will occur
   * @param {*} startingTime Time in milliseconds to start the vibration
   * @param {*} duration Duration of the vibration
   * @param {*} samplingRate Sampling Rate
   * @param {*} numberOfActuators Number of total actuators
   */

  ramp: function (
    initialIntensity,
    finalIntensity,
    actuators,
    startingTime,
    duration,
    samplingRate = 5,
    numberOfActuators = 6
  ) {
    let channel = [];
    let pattern = [];

    const rampVibrations = {
      initialIntensity: initialIntensity,
      finalIntensity: finalIntensity,
    };
    const patternData = {
      ramp: rampVibrations,
      startingTime: startingTime,
      duration: duration,
    };

    pattern.push(patternData);
    channel.push({ patterns: pattern, actuators: actuators });

    const body = {
      samplingRate: samplingRate,
      numberOfActuators: numberOfActuators,
      channels: channel,
    };

    this.sendVibrations(body);
  },
});
