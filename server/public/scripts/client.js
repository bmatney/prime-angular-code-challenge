var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: '/views/templates/home.html',
      })
    .when('/newHero', {
        templateUrl: '/views/templates/newHero.html',
        controller: 'newHeroController',
        controllerAs: 'nhc',
      })
    .when('/heroList', {
        templateUrl: '/views/templates/heroList.html',
        controller: 'heroListController',
        controllerAs: 'hlc',
      })
    .otherwise({
        redirectTo: 'home',
      });
  },
]);

app.controller("newHeroController", ["$http", function ($http) {
    console.log('running');

    var self = this;
    self.newHero = {};
    self.heroes = [];

    self.addHeroes = function () {
      console.log('new hero: ', self.newHero);
      $http.post('/heroes', self.newHero);
    };
  },
]);

app.controller("heroListController", ["$http", function ($http) {
    console.log('running');
    var self = this;
    self.heroes = [];

    getHeroes();

    function getHeroes() {
      $http.get('/heroes')
        .then(function (response) {
          console.log(response.data);
          self.heroes = response.data;
        });
    }

    self.deleteHeroes = function (heroObj) {
        console.log(heroObj);
        $http.delete('/heroes/' + heroObj.id)
          .then(function (response) {
            console.log('DELETE finished');
            getHeroes();
          });
      };
  },
]);
