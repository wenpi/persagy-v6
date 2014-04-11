/**
 * Module dependencies.
 */

var sign = require('./controllers/sign');
var site = require('./controllers/site');
var build = require('./controllers/build');
var alarm = require('./controllers/alarm');

module.exports = function(app) {
  // home page
  app.get('/', site.index);

  // sign up, login, logout

  app.get('/signout', sign.signout);
  app.get('/signin', sign.showSignin);
  app.post('/signin', sign.signin);
  app.get('/:sign', site.index);
  app.get('/app/:id', site.app_index);
  app.get('/report/:id', site.report_index);
  //绠?
  app.post('/GetCompanyDescription', build.GetCompanyDescription);
  //绠?
  app.post('/GetBuilding', build.GetBuildingByUser);
  app.post('/app/GetBuilding', build.GetBuildingByUser);
  app.post('/GetBuildingType', build.GetBuildingType);
  app.post('/GetAlarm', alarm.GetAlarm);
  app.post('/GetEnergySaving', build.GetEnergySaving);
  app.post('/GetPowerAmplit', build.GetPowerAmplit);
  app.post('/GetSavingResults', build.GetSavingResults);
  app.post('/GetEnergyHollowPieview', build.GetEnergyHollowPieview);
  app.post('/GetEnergyItem', build.GetEnergyItem);
  app.post('/GetEnergyCalendar', build.GetEnergyCalendar);
  app.post('/GetWorkEnergy', build.GetWorkEnergy);
  app.post('/GetRealMonitor', build.GetRealMonitor);
  app.post('/GetTransformer', build.GetTransformer);
  app.post('/GetVerticalBarview', build.GetVerticalBarview);
  app.post('/GetBuildingEnergy', build.GetBuildingEnergy);
  app.post('/GetEnergyTrend', build.GetEnergyTrend);
  app.post('/GetEnergyTimeType', build.GetEnergyTimeType);
  app.post('/GetReportList', build.GetReportList);
  app.post('/GetLastMonthIndicatorview', build.GetLastMonthIndicatorview);
  app.post('/GetBuildingHumiditytrendview', build.GetBuildingHumiditytrendview);
  app.post('/GetBuildingTemperaturetrendview', build.GetBuildingTemperaturetrendview);
};
