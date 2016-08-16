angular.
  module('app').
  config(['$routeProvider', 'baseRoute',
    function config($routeProvider, baseRoute) {

      $routeProvider.
      	when('/home',{
      		templateUrl: baseRoute + "home/home-template.html",
      		controller: 'HomeController',
      		controllerAs: 'homeController'
      	}).
      	when('/home/user/:id', {
      		templateUrl: baseRoute + "user/user-home-template.html",
      		controller: 'UserHomeController',
      		controllerAs: 'userHomeController'
      	}).
      	when('/home/user/:id/itinerary', {
      		templateUrl: baseRoute + "itinerary/itinerary-template.html",
      		controller: 'ItineraryController',
      		controllerAs: 'itineraryController'
      	}).
      	when('/home/user/:id/itinerary/:itineraryId', {
      		templateUrl: baseRoute + "itinerary/detail/itinerary-detail-template.html",
      		controller: 'ItineraryDetailController',
      		controllerAs: 'itineraryDetailController'
      	}).
      	when('/map', {
          
          templateUrl: baseRoute + "map/template.html",
          controller: 'MapController',
          controllerAs: 'mapController'
          
        }).
        otherwise('/home');
    }
  ]);