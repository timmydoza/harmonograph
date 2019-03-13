const app = new Vue({
  el: '.container',
  data: {
    settings: {
      xFreq: 3,
      yFreq: 2,
      zFreq: 3.01,
      invert: false,
      type: 'rotary',
      speed: 0.2,
      decay: 0
    },
    harmonograph: Harmonograph()
  },
  mounted: function() {
    this.harmonograph.init();
    this.harmonograph.updateSettings(this.settings);
    this.harmonograph.startAnimation();
  },
  updated: function() {
    console.log(this.settings);
    this.harmonograph.updateSettings(this.settings);
    this.harmonograph.stopAnimation();
    this.harmonograph.startAnimation();
  }
});
