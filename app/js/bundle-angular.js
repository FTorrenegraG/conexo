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
angular.module("conexo")
.factory('DataBaseService', ['$http','Session', function AuthorizationFactory($http,Session) {
	var URL_Api = 'http://localhost:9000/api'
	return {
		postDB : function (url,data) {
			return $http({
				method: 'POST',
                url: URL_Api+url,
                data: data
			})
		},
		getDB : function (url) {
			return $http({
				method: 'GET',
                url: URL_Api+url
			})
		},
		putDB : function (url,data) {
			return $http({
				method: 'PUT',
                url: URL_Api+url,
                data: data
			})
		},
		deleteDB : function (url) {
			return $http({
				method: 'Delete',
                url: URL_Api+url
			})
		}
	}
}])
angular.module("conexo")
.factory('Session', function SessionFactory($http, $cookieStore, $localStorage,$window) {
  return {
    login: function(data){
      return $http({method: 'POST', url: URL_Api + '/sections', data: data, headers: {'Proyecto': "2"}})
    },
    signUp: function(data){
      return $http({method: 'POST', url: URL_Api + '/users', data: data})
    },
    isAuth: function(){
      try{
        return $cookieStore.get('token') !== undefined ;
      }catch(err){
        this.logout();
        return false;
      }
    },
    setToken: function(token){
    	$cookieStore.put('token', undefined);
	    $localStorage.user = undefined;
        $cookieStore.put('token', token);
    },
    logout: function(){
    	$http({
    		method: 'DELETE',
    		url: URL_Api + '/sections',
    		headers: {
				'Authorization': $cookieStore.get('token')
			}
    	}).success(function(data){
    		$cookieStore.put('token', undefined);
		    $localStorage.user = undefined;
		    $window.location.href = "/cdc-v2/";
            $window.location.reload();
    	}).error(function(error){
    		$cookieStore.put('token', undefined);
            $localStorage.user = undefined;
            $window.location.href = "/cdc-v2/";
            $window.location.reload();
    	})
    },
    deleteAll: function () {
        $cookieStore.put('token', undefined);
        $localStorage.user = undefined;
    },
    setUser: function(user){
    	$localStorage.user=user
    },
    getUser: function(){
    	return $localStorage.user
    },
    getSession: function(){
    	return {
    		Authorization: $cookieStore.get('token')
    	}
    },
    getSeccionInfo: function(){
        return $http({
            method: 'GET',
            url: URL_Api + '/sections',
            headers: {
                'Authorization': $cookieStore.get('token')
            }
        });
    }
  }
})

angular.module("conexo")
.controller("homeController",function ($scope,$timeout,DataBaseService) {
	$scope.slides = [{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car1.x79936.jpg",
		info: {name_a: "slide 1", ocupation: "ocupación 1"}
	},{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car2.x79936.jpg",
		info: {name_a: "slide 2", ocupation: "ocupación 2"}
	},{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car3.x79936.jpg",
		info: {name_a: "slide 3", ocupation: "ocupación 3"}
	},{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car4.x79936.jpg",
		info: {name_a: "slide 4", ocupation: "ocupación 4"}
	},{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car5.x79936.jpg",
		info: {name_a: "slide 5", ocupation: "ocupación 5"}
	},{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car6.x79936.jpg",
		info: {name_a: "slide 6", ocupation: "ocupación 6"}
	},{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car7.x79936.jpg",
		info: {name_a: "slide 7", ocupation: "ocupación 7"}
	},{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car8.x79936.jpg",
		info: {name_a: "slide 8", ocupation: "ocupación 8"}
	},{
		img: "https://colombiareports.com/wp-content/uploads/2017/02/car9.x79936.jpg",
		info: {name_a: "slide 9", ocupation: "ocupación 9"}
	}]
	$scope.categories = [
		{img: "http://orquestaacademicagranada.org/panel/wp-content/uploads/2012/02/musicos2.jpg", name: "Musicos", description: " descripción musicos"},
		{img: "http://pila.gob.ar/wp-content/uploads/2017/11/Artesanos.jpg", name: "Artesanos", description: " descripción Artesanos"},
		{img: "https://www.fondosypantallas.com/wp-content/uploads/2010/08/w078.jpg", name: "Bailarines", description: " descripción Bailarines"},
		{img: "https://imagenes.educ.ar/repositorio/Imagen/ver?image_id=dac683c8-2c4f-4421-b907-4bda73c241a2", name: "Pintores", description: " descripción Pintores"},
		{img: "https://marketingparafotografos.es/wp-content/uploads/2014/10/LEICA-2244x897.jpg", name: "Fotografos", description: " descripción Fotografos"},
		{img: "http://via.placeholder.com/350x350", name: "Cualquiera", description: " descripción cualqueira"}]
	$scope.slide_i = 0
	$scope.results = []
	$scope.changeSlide = function () {
		$timeout(function () {
			$scope.slide_i += 1
			if ($scope.slide_i >= 8){
				$scope.slide_i = 0
			}
			$scope.changeSlide()
		},4000)
	}
	$scope.changeSlide()
	$scope.searchDB = function (text) {
		if (text != ""){
			DataBaseService.getDB("/artists").success(function (data) {
				$scope.results = data
			})
		}else{
			$scope.results = []
		}
	}
})
angular.module("conexo")
.controller("indexController",function ($scope,$timeout) {
	$scope.networks = [
		{img: "https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-256.png", name: "Linkedin", href: "#"},
		{img: "http://biz-techservices.com/wp-content/uploads/2016/08/biz_tech_email.jpg", name: "Correo", href: "#"},
		{img: "https://cdn.worldvectorlogo.com/logos/facebook-icon.svg", name: "Facebook", href: "#"},
		{img: "https://www.pi-expertises.com/wp-content/uploads/2016/10/twitter-bird-white-on-blue.png", name: "Twitter", href: "#"},
		{img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/YouTube_play_button_square_%282013-2017%29.svg/2000px-YouTube_play_button_square_%282013-2017%29.svg.png", name: "Youtube", href: "#"},
		{img: "https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png", name: "Instagram", href: "#"}]
})