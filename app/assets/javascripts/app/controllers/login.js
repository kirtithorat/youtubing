'use strict';

angular.module('youtubingApp.controllers')
  .controller('LoginController', function($scope, $location, UserService) {

    $scope.signup = {};
    $scope.login = {};

    UserService.currentUser().then(function(user) {
      $scope.user = user;
    });

    $scope.submitSignup = function() {
      UserService.signup($scope.signup)
        .then(function(user) {
            $location.path("/");
          },
          function(reason) {
            $scope.signup.errors = reason;
          });
    };

    $scope.submitLogin = function() {
      UserService.login($scope.login)
        .then(
          function(user) {
            $location.path("/");
          },
          function(reason) {
            $scope.login.errors = reason;
          });
    };
  });