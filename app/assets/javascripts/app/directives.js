'use strict';

angular.module('youtubingApp.directives', [])
  .directive('userPanel', function() {
    return {

      templateUrl: '/templates/user_panel.html',
      controller: function($scope, UserService) {

        $scope.$on('user:set', function (envt, currentUser) {
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
  });