'use strict';

angular.module('youtubingApp.directives', [])
  .directive('userPanel', function() {
    return {

      templateUrl: '/templates/user_panel.html',
      controller: function($scope, UserService) {

          $scope.$on('user:set', function(envt, currentUser) {
            $scope.currentUser = currentUser;
          });

          UserService.currentUser().then(function(user) {
            $scope.currentUSer = user;
          });

          $scope.logout = function() {
            UserService.logout().then(function() {
              $scope.currentUser = null;
            });
          };

        } // end of controller

    }; // end of return
  })
  .directive('userFavorite', function($q, UserService, Favorite) {
    return {
      restrict: 'A',
      scope: {
        ngMovie: '='
      },
      templateUrl: '/templates/user_favorite.html',
      link: function($scope) {

        $scope.$watch('ngMovie', function(newValue, oldValue) {
          if (newValue) {
            UserService.currentUser().then(function(user) {
              if (user) {
                $scope.currentUser = user;
                Favorite.isFavorite(user, $scope.ngMovie).then(
                  function(isFavorite) {
                    $scope.isFavorite = isFavorite;
                  });
              } else {
                $scope.isFavorite = false;
              }
            });
          }
        });

        $scope.$on('user:unset', function() {
          $scope.currentUser = null;
        });

        $scope.addFavorite = function(movie) {
          $scope.isFavorite = true;
          UserService.currentUser().then(function(user) {
            Favorite.createForUserAndMovie(user, movie);
          });
        };

        $scope.removeFavorite = function(movie) {
          $scope.isFavorite = false;
          UserService.currentUser().then(function(user) {
            Favorite.removeFavorite(user, movie);
          });
        };
      }
    };
  });