'use strict';

angular.module('youtubingApp.controllers')
  .controller('MovieController', function($scope, MoviesService, $routeParams, $sce) {
    
    MoviesService.movies().then(function(movies) {
      $scope.movies = movies;
      $scope.movie = _.find($scope.movies, function(movie) {
        return movie.youtubeId === $routeParams.movie_id;
      });
      $scope.movie.youtubeUrl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.movie.youtubeId + "?rel=0");
    });

  });