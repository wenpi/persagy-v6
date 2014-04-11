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
    jCal: '../../lib/jCal',
    config: '../../../config'
  },
  shim: {
    angular: {
      exports: 'angular',
      deps: ['jquery']
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
  },
  deps: [
    './bootstrap'
  ]
  // priority: [
  //   'jquery'
  // ]
});

// require(['./bootstrap'], function() {
//   console.log('bootstraping..');
// });

// require(['config', 'jquery'], function(config, $) {
//   var styles = '<style>.nav_option li:hover div.o_ico span{background:' +
//     config.theme_color +
//     ';}' +
//     '#head_Menu{background-color:' +
//     config.theme_color +
//     ';}' +
//     '</style>';
//   $('title').text(config.tab_title || '博锐尚格五代基本页');
//   $('#head_title span').text(config.title);
//   $('head').append(styles);


//   require(['./bootstrap'], function() {
//     console.log('bootstraping..');
//   });
// });
