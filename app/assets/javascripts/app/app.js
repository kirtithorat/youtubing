'use strict';

angular.module('youtubingApp', ['ngRoute', 'youtubingApp.controllers', 'youtubingApp.services'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
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