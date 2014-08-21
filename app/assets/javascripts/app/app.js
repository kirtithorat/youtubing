'use strict';

angular.module('youtubingApp', [
    'ngRoute',
    'ngCookies',
    'youtubingApp.controllers',
    'youtubingApp.services',
    'youtubingApp.directives',
    'youtubingApp.resources',
    'youtubingApp.interceptors'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/movie/:movie_id', {
        controller: 'MovieController',
        templateUrl: '/templates/movie.html'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: '/templates/login.html'
      })
      .when('/user/:user_id', {
        controller: 'ProfileController',
        templateUrl: '/templates/profile.html',
        resolve: {
          user: function($q, $route, $location, AuthService) {
            var d = $q.defer();

            AuthService.currentUser().then(function(user) {
              if (user && user.id == $route.current.params.user_id) {
                d.resolve();
              } else {
                $location.path('/');
              }
            });
            return d.promise;
          }
        }
      })
      .when('/', {
        controller: 'MoviesController',
        templateUrl: '/templates/movies.html'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('UserAuthInterceptor');
  });