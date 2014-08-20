'use strict';

angular.module('youtubingApp.services', [])
  .service('MoviesService', function($q, $http) {

    this.movies = function(name) {
      var d = $q.defer();

      $http({
          method: 'GET',
          url: 'http://gdata.youtube.com/feeds/api/charts/movies/most_popular?v=2&max-results=12&paid-content=true&hl=en&region=us&alt=json'
        })
        .then(function(response) {
            var movies = _.map(response.data.feed.entry, function(movie) {
              return {
                youtubeId: movie['media$group']['yt$videoid']['$t'],
                title: movie['media$group']['media$title']['$t'],
                released: movie['yt$firstReleased']['$t'].match(/\d{4}/)[0],
                rated: movie['media$group']['media$rating'][0]['$t'],
                runningTime: Math.round(movie['media$group']['yt$duration']['seconds'] / 60),
                posterUrl: _.findWhere(movie['media$group']['media$thumbnail'], {
                  "yt$name": "poster"
                }).url,
                description: movie['media$group']['media$description']['$t']
              }
            });
            d.resolve(movies);
          },
          function(error) {
            d.reject(error);
          });
      return d.promise;
    };

  });