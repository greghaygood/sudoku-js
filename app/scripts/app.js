'use strict';

angular.module('sudokuJsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'sudokuJsApp.directives'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
