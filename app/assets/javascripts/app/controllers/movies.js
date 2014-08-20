'use strict';

angular.module('youtubingApp.controllers')
  .controller('MoviesController', function($scope, MoviesService) {

    MoviesService.movies().then(function (movies) {
    	$scope.movies = movies;
    });

    $scope.addFavorite = function(movie) {
      movie.isFavorite = true;
    };

    $scope.removeFavorite = function(movie) {
      movie.isFavorite = false;
    };

  });