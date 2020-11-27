const SAND_GROUND = "sand";
const WOOD_GROUND = "wood";
const CONCRETE_GROUND = "concrete";

AFRAME.registerComponent("walking", {
  init: function () {
    // Do something when component first attached.
    this.sand = document.querySelector("#sandGround");
    this.wood = document.querySelector("#woodGround");
    this.concrete = document.querySelector("#concretGround");
    this.cam = document.querySelector("#cam");

    this.vibrotactile = this.el.components.vibrotactile;

    this.currentGround = "";

    this.onKeyDown = this.onKeyDown.bind(this);

    window.addEventListener("keydown", this.onKeyDown);
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
    window.removeEventListener("keydown", this.onKeyDown);
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
    var camPosition = this.cam.object3D.position;
    var woodPosition = this.wood.object3D.position;
    var sandPosition = this.sand.object3D.position;
    var concretePosition = this.concrete.object3D.position;

    var distanceToWood = camPosition.distanceTo(woodPosition);
    var distanceToSand = camPosition.distanceTo(sandPosition);
    var distanceToConcrete = camPosition.distanceTo(concretePosition);

    if (distanceToWood < 6) {
      this.currentGround = WOOD_GROUND;
    } else if (distanceToSand < 6) {
      this.currentGround = SAND_GROUND;
    } else if (distanceToConcrete < 6) {
      this.currentGround = CONCRETE_GROUND;
    }
  },

  onKeyDown: function (evt) {
    // If WASD PRESSED
    var keyPressed =
      evt.keyCode === 87 ||
      evt.keyCode === 65 ||
      evt.keyCode === 83 ||
      evt.keyCode === 68 ||
      evt.keyCode === 38 ||
      evt.keyCode === 37 ||
      evt.keyCode === 40 ||
      evt.keyCode === 39;

    if (!keyPressed) {
      return;
    }
    this.sendVibration();
  },

  sendVibration: function () {
    const commomParameters = {
      samplingRate: 10,
      actuators: [0, 1, 2],
    };
    switch (this.currentGround) {
      case WOOD_GROUND:
        const initialIntensity = 0;
        const finalIntensity = 100;
        this.vibrotactile.ramp(
          initialIntensity,
          finalIntensity,
          commomParameters
        );
        break;
      case SAND_GROUND:
        const sin = { frequency: 10 };
        this.vibrotactile.sin(sin, commomParameters);
        break;
      case CONCRETE_GROUND:
        let vibrations = [];
        const customVibration = {
          actuators: [1, 2],
          intensity: 50,
          startingTime: 0,
          duration: 1000,
        };
        vibrations.push(customVibration);
        this.vibrotactile.customVibrations(vibrations);
        break;
      default:
        break;
    }
  },
});
