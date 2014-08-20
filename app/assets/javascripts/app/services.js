'use strict';

angular.module('youtubingApp.services', [])
  .service('MoviesService', function() {

    this.movies = function(name) {
      var movies = [{
        youtubeId: "8Eg6yIwP2vs",
        title: "The Royal Tenenbaums",
        released: "2001",
        rated: "R",
        runningTime: 92,
        isFavorite: true,
        posterUrl: "http://i.imgur.com/np5EP3N.jpg"
      }, {
        youtubeId: "lgo3Hb5vWLE",
        title: "Requiem for a Dream",
        released: "2000",
        rated: "R",
        runningTime: 102,
        isFavorite: false,
        posterUrl: "http://i.imgur.com/AYiim1H.jpg"
      }, {
        youtubeId: "hsdvhJTqLak",
        title: "The Graduate",
        released: "1967",
        rated: "R",
        runningTime: 106,
        isFavorite: true,
        posterUrl: "http://i.imgur.com/gMwiOAD.jpg"
      }, {
        youtubeId: "OtDQOF_pU8A",
        title: "8½",
        released: "1963",
        rated: "R",
        runningTime: 138,
        isFavorite: false,
        posterUrl: "http://i.imgur.com/QIPF827.jpg"
      }, {
        youtubeId: "r_GCRFRcWxA",
        title: "The Big Lebowski",
        released: "1998",
        rated: "R",
        runningTime: 117,
        isFavorite: true,
        posterUrl: "http://i.imgur.com/AThCwkm.jpg"
      }, {
        youtubeId: "KYz2wyBy3kc",
        title: "Toy Story",
        released: "1995",
        rated: "G",
        runningTime: 81,
        isFavorite: true,
        posterUrl: "http://i.imgur.com/NtnxM9p.jpg"
      }];
      return movies;
    };
    
  });