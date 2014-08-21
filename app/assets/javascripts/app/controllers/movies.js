'use strict';

angular.module('youtubingApp.controllers')
  .controller('MoviesController', function($scope, MoviesService, Favorite, UserService, $q) {

    MoviesService.movies().then(function(movies) {
      $scope.movies = movies;
    });

  });