'use strict';

angular.module('youtubingApp', ['ngRoute', 'youtubingApp.controllers'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'MoviesController',
        templateUrl: '/templates/movies.html'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });