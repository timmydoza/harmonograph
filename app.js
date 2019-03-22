const app = new Vue({
  el: '.container',
  data: {
    settings: {
      type: 'rotary',
      phase: 'closed',
      rotaryType: 'concurrent',
      integerLock: false,
      xyLock: false,
      xFreq: 2,
      yFreq: 2,
      rotaryFreq: 3.02,
      invert: false,
      speed: 0.4,
      decay: 0,
      lineWidth: 0.8,
      size: 1
    },
    harmonograph: Harmonograph()
  },
  mounted: function() {
    this.harmonograph.init(this.settings);
    this.harmonograph.startAnimation();
  },
  watch: {
    'settings.integerLock': function(integerLock) {
      if (integerLock) {
        this.settings.xFreq = Math.round(this.settings.xFreq);
        this.settings.yFreq = Math.round(this.settings.yFreq);
        this.settings.rotaryFreq = Math.round(this.settings.rotaryFreq);
      }
    }
  },
  updated: function() {
    if (this.settings.xyLock) this.settings.yFreq = this.settings.xFreq;
    this.harmonograph.startAnimation();
  }
});
