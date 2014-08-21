'use strict';

angular.module('youtubingApp.services', ["youtubingApp.resources"])
  .service('MoviesService', function($q, $http, $cacheFactory, Movie) {

    var getNested = function(data, path) {
      var i, len = path.length;
      for (i = 0; typeof data === 'object' && i < len; ++i) {
        data = data[path[i]];
      }
      return data;
    };

    var moviesCache = $cacheFactory('movies');

    this.movies = function(chart) {
      chart = typeof chart !== 'undefined' ? chart : "most_popular";
      var d = $q.defer();

      var cachedMovies = moviesCache.get(chart);
      if (cachedMovies) {
        d.resolve(cachedMovies);
      } else {

        $http({
            method: 'GET',
            url: 'http://gdata.youtube.com/feeds/api/charts/movies/' + chart + '?v=2&max-results=12&paid-content=true&hl=en&region=us&alt=json'
          })
          .success(function(data) {
            var movies = _.map(data.feed.entry, function(movie) {
              return {
                youtubeId: movie['media$group']['yt$videoid']['$t'],
                title: movie['media$group']['media$title']['$t'],
                released: movie['yt$firstReleased']['$t'].match(/\d{4}/)[0],
                rated: getNested(movie, ['media$group', 'media$rating', 0, '$t']),
                runningTime: Math.round(movie['media$group']['yt$duration']['seconds'] / 60),
                posterUrl: _.findWhere(movie['media$group']['media$thumbnail'], {
                  "yt$name": "poster"
                }).url,
                description: movie['media$group']['media$description']['$t']
              }
            });


            // Insert into Database when non-existing 
            var moviePromises = _.map(movies, function(movieData) {
              var youtubeId = movieData.youtubeId;
              return Movie.findOrCreateByYoutubeId(youtubeId, movieData)
            });

            $q.all(moviePromises).then(function(movieResources) {
              moviesCache.put(chart, movieResources);
              d.resolve(movieResources);
            });

          })
          .error(function(data) {
            d.reject(data);
          });
      }

      return d.promise;
    };

  }) // end of MoviesService
  .service('UserService', function($q, $cookieStore, $rootScope) {
    var service = this;
    this._user = null;

    this.setCurrentUser = function(user) {
      service._user = user;
      $cookieStore.put('user', user);
      $rootScope.$broadcast('user:set', user);
    };

    this.currentUser = function() {
      var d = $q.defer();
      if (service._user) {
        d.resolve(service._user);
      } else if ($cookieStore.get('user')) {
        service.setCurrentUser($cookieStore.get('user'));
      } else {
        d.resolve(null);
      }
      return d.promise;
    };

    this.signup = function(email) {
      var d = $q.defer();
      var user = {
        email: email,
        id: 1
      };

      service.setCurrentUser(user);
      d.resolve(user);
      return d.promise;
    };

    this.login = function(email) {
      var d = $q.defer();
      var user = {
        email: email,
        id: 1
      };

      service.setCurrentUser(user);
      d.resolve(user);
      return d.promise;
    };

    this.logout = function() {
      var d = $q.defer();
      service._user = null;
      $cookieStore.remove('user');
      $rootScope.$broadcast('user:unset');
      d.resolve();
      return d.promise;
    };

  }); // end of UserService