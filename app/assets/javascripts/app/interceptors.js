'use strict';

angular.module('youtubingApp.interceptors', [])
  .factory('UserAuthInterceptor',
    function($rootScope, $q, AuthService) {
      return {
        'request': function(req) {
          var d = $q.defer();
          AuthService.currentUser().then(function(user) {
            if (user) {
              req.params = req.params || {};
              req.params['auth_token'] = req.params['auth_token'] || user.auth_token;
              req.params['auth_user_id'] = req.params['auth_user_id'] || user.id;
              d.resolve(req);
            } else {
              d.resolve(req);
            }
          });
          return d.promise;
        },
        'requestError': function(reqErr) {
          return reqErr;
        }
      };
    });