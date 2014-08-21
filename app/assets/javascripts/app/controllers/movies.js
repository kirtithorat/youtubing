'use strict';

angular.module('youtubingApp.controllers')
  .controller('MoviesController', function($scope, MoviesService) {

    $scope.$watch('chart', function(newValue, oldValue) {
      if (newValue) {
        MoviesService.movies(newValue).then(function(movies) {
          $scope.movies = movies;
        });
      }
    });

    $scope.chart = "most_popular";

  });