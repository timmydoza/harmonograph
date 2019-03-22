const app = new Vue({
  el: '.container',
  data: {
    settings: {
      xFreq: 2,
      yFreq: 2,
      xyLock: false,
      zFreq: 3.01,
      integerLock: false,
      invert: false,
      type: 'rotary',
      speed: 0.2,
      decay: 0,
      rotaryType: 'concurrent',
      lineWidth: 0.8
    },
    harmonograph: Harmonograph()
  },
  mounted: function() {
    this.harmonograph.init();
    this.harmonograph.updateSettings(this.settings);
    this.harmonograph.startAnimation();
  },
  watch: {
    'settings.integerLock': function(integerLock) {
      if (integerLock) {
        this.settings.xFreq = Math.round(this.settings.xFreq);
        this.settings.yFreq = Math.round(this.settings.yFreq);
        this.settings.zFreq = Math.round(this.settings.zFreq);
      }
    }
  },
  updated: function() {
    if (this.settings.xyLock) this.settings.yFreq = this.settings.xFreq;
    this.harmonograph.updateSettings(this.settings);
    this.harmonograph.stopAnimation();
    this.harmonograph.startAnimation();
  }
});
