angular.module("conexo",['ngRoute','ngCookies', 'ngStorage','ngAnimate'])
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
        $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = "POST, GET, OPTIONS, DELETE";
        $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = "3600";
        $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = "x-requested-with";
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {
	$routeProvider
    .when("/home", {
        templateUrl : "partial-views/home.html",
        controller: "homeController as homeCtrl"
    })
    .otherwise({ redirectTo: '/home' })    
}])
.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= attrs.scroll) {
                 scope.boolChangeClass = true;
             } else {
                 scope.boolChangeClass = false;
             }
            scope.$apply();
        });
    };
});