const app = new Vue({
  el: '.container',
  data: {
    settings: {
      xFreq: 2,
      yFreq: 2,
      xyLock: false,
      zFreq: 3.01,
      invert: false,
      type: 'rotary',
      speed: 0.2,
      decay: 0,
      rotaryType: 'concurrent'
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
    if (this.settings.xyLock) this.settings.yFreq = this.settings.xFreq
    this.harmonograph.updateSettings(this.settings);
    this.harmonograph.stopAnimation();
    this.harmonograph.startAnimation();
  }
});
