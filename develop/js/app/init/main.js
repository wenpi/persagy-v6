require.config({
  // baseUrl: "../../lib",
  paths: {
    angular: '../../lib/angular/angular',
    uiRouter: '../../lib/angular-ui-router/release/angular-ui-router',
    text: '../../lib/requirejs-text/text',
    jquery: '../../lib/jquery/dist/jquery',
    highcharts: '../../lib/highcharts.src.latest',
    sagyChart: '../../lib/sagyChart.src',
    jqueryMobile: '../../lib/jquery.mobile.event',
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    jqueryMobile: {
      deps: ['jquery']
    },
    uiRouter: {
      deps: ['angular']
    },
    highcharts: {
      exports: 'Highcharts',
      deps: ['jquery']
    },
    sagyChart: {
      deps: ['highcharts']
    }
  }
  // deps: [
  //   './bootstrap'
  // ]
  // priority: [
  //   'jquery'
  // ]
});

require(['./bootstrap'], function() {
  console.log('bootstraped...');
});
