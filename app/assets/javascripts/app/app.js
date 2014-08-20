'use strict';

angular.module('youtubingApp', [
    'ngRoute',
    'ngCookies',
    'youtubingApp.controllers',
    'youtubingApp.services',
    'youtubingApp.directives'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: '/templates/login.html'
      })
      .when('/movie/:movie_id', {
        controller: 'MovieController',
        templateUrl: '/templates/movie.html'
      })
      .when('/', {
        controller: 'MoviesController',
        templateUrl: '/templates/movies.html'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });