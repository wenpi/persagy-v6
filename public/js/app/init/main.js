require.config({
  // baseUrl: "../../lib",
  paths: {
    angular: '../../lib/angular/angular',
    uiRouter: '../../lib/angular-ui-router/release/angular-ui-router',
    text: '../../lib/requirejs-text/text',
    jquery: '../../lib/jquery/dist/jquery',
    highcharts: '../../lib/highcharts.src.latest',
    sagyChart: '../../lib/sagyChart'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'uiRouter': {
      deps: ['angular']
    },
    'highcharts': {
      exports: 'Highcharts',
      deps: ['jquery']
    },
    sagyChart: {
      deps: ['highcharts']
    }
  }
  // priority: [
  //   "angular"
  // ]
});

