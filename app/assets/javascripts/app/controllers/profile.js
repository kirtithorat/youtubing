'use strict';

angular.module('youtubingApp.controllers')
  .controller('ProfileController', function($scope, $routeParams, User) {

    User.query({
        id: $routeParams.user_id
      })
      .then(function(users) {
        if (users.length > 0) {
          $scope.user = users[0];
          $scope.user.favoriteMovies()
            .then(function(movies) {
              $scope.favoriteMovies = movies;
          });
        }
      });

  });