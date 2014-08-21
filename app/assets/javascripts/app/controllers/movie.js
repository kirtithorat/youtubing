'use strict';

angular.module('youtubingApp.controllers')
  .controller('MovieController',
    function($scope, $routeParams, $sce, Movie) {
      Movie.query({
        youtube_id: $routeParams.movie_id
      }).then(function(movies) {
        if (movies.length > 0) {
          var movie = movies[0];
          movie.youtubeUrl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + movie.youtubeId + "?rel=0");
          $scope.movie = movie;
        }
      });
    });