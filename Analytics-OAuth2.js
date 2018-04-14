function myFunc() {
  var profileId = 'ga:__profile ID__'
  var formattedStartDate = '2015-09-29';
  var formattedEndDate = '2015-10-31';
  var confMetrics = 'ga:sessions,ga:bounces';
  var optArgs = {};
  optArgs['dimensions'] = 'ga:date,ga:userType';
  optArgs['max-results'] = '200';
  
  var optList = '';
  for (var i in optArgs) {
    optList += '&' + i + '=' + optArgs[i];
  }
  var analytics = getAnalyticsService();
  if (analytics.hasAccess()) {
    Logger.log(UrlFetchApp.fetch('https://www.googleapis.com/analytics/v3/data/ga?ids=' + profileId + '&start-date=' + formattedStartDate + '&end-date=' + formattedEndDate + '&metrics=' + confMetrics + optList, {
      headers: {
        Authorization: 'Bearer ' + analytics.getAccessToken()
      }
    }).getContentText());
  } else {
    var authUrl = analytics.getAuthorizationUrl();
    Logger.log('Please visit the following URL and then re-run the script: ' + authUrl);
  }
}

function authCallback(request) {
  var analytics = getAnalyticsService();
  var isAuthorized = analytics.handleCallback(request);
  if (isAuthorized) {
    return ContentService.createTextOutput('Success! You can close this page.');
  } else {
    return ContentService.createTextOutput('Denied. You can close this page');
  }
}

var CONSUMER_KEY = '__consumer key__.apps.googleusercontent.com';
var CONSUMER_SECRET = '__consumer secret__';

function getAnalyticsService() {
  var service = OAuth2.createService('analytics.readonly');
  service.setTokenUrl('https://accounts.google.com/o/oauth2/token')
  service.setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
  service.setClientId(CONSUMER_KEY);
  service.setClientSecret(CONSUMER_SECRET);
  service.setPropertyStore(PropertiesService.getScriptProperties());
  service.setCallbackFunction('authCallback');
  service.setScope('https://www.googleapis.com/auth/analytics.readonly');
  service.setParam('login_hint', Session.getActiveUser().getEmail());
  service.setParam('access_type', 'offline');
  return service;
}
