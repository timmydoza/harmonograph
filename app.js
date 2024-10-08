const app = new Vue({
  el: '.container',
  data: {
    settings: {
      type: 'rotary',
      phase: 'open',
      rotaryType: 'concurrent',
      integerLock: false,
      xyLock: false,
      xFreq: 2,
      yFreq: 2,
      rotaryFreq: 3.02,
      rotaryAmp: 1,
      speed: 0.5,
      decay: 0,
      fade: 0,
      lineWidth: 0.8,
      size: 1,
      darkMode: false
    },
    preset: Math.floor(Math.random() * presets.length),
    harmonograph: Harmonograph()
  },
  mounted: function() {
    this.randomize();
    this.harmonograph.init(this.settings);
    this.harmonograph.startAnimation();
    window.addEventListener('resize', () => {
      this.harmonograph.init(this.settings);
      this.harmonograph.startAnimation();
    });
  },
  watch: {
    'settings.integerLock': function(integerLock) {
      if (integerLock) {
        this.settings.xFreq = Math.round(this.settings.xFreq);
        this.settings.yFreq = Math.round(this.settings.yFreq);
        this.settings.rotaryFreq = Math.round(this.settings.rotaryFreq);
        this.settings.rotaryAmp = Math.round(this.settings.rotaryAmp);
      }
    },
    'settings.darkMode': function(darkMode) {
      document.querySelector('body').classList[darkMode ? 'add' : 'remove']('dark');
    }
  },
  updated: function() {
    if (this.settings.xyLock) this.settings.yFreq = this.settings.xFreq;
    this.harmonograph.applySettings(this.settings);
    this.harmonograph.startAnimation();
  },
  methods: {
    randomize: function() {
      this.settings = {
        ...this.settings,
        ...presets[this.preset++ % presets.length],
        darkMode: !Math.round(Math.random())
      };
    }
  }
});
