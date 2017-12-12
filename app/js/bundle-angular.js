var hostname = window.location.hostname;
var URL_Api = 'http://10.90.28.9:9000/api'
if (hostname.indexOf('clickco.co') > -1) {
    URL_Api = 'http://www.clickco.co/conexo/api';
};
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
    .when("/artists/:artist_id", {
        templateUrl : "partial-views/artist.html",
        controller: "artistsController as artistsCtrl"
    })
    .when("/calificador/:calificador_id", {
        templateUrl : "partial-views/calificador.html",
        controller: "calificadorController as calificadorCtrl"
    })
    .when("/signup", {
        templateUrl : "partial-views/signup.html",
        controller: "signupController as signupCtrl"
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
      return $http({method: 'POST', url: URL_Api + '/login', data: data})
    },
    signUp: function(data){
      return $http({method: 'POST', url: URL_Api + '/users', data: data})
    },
    isAuth: function(){
      try{
        return $localStorage.user ;
      }catch(err){
        this.logout();
        return false;
      }
    },
    logout: function(){
    	$http({
    		method: 'DELETE',
    		url: URL_Api + '/logout'
    	}).success(function(data){
    		$localStorage.user = undefined;
		    $window.location.href = "/";
            $window.location.reload();
    	}).error(function(error){
    		$localStorage.user = undefined;
            $window.location.href = "/";
            $window.location.reload();
    	})
    },
    deleteAll: function () {
        $localStorage.user = undefined;
    },
    setUser: function(user){
    	$localStorage.user=user
    },
    getUser: function(){
    	return $localStorage.user
    }
  }
})

angular.module("conexo")
.controller("artistsController",function ($scope,$routeParams,$timeout,DataBaseService,$sce,Session,$window) {
	var prefix = '';
	if (hostname.indexOf('clickco.co') > -1) {
	    prefix = '/conexo';
	};
	if (Session.isAuth()){
		var user = Session.getUser()
		if (user){
			$scope.current_user = user;
		}else{
			Session.deleteAll();
			$scope.current_user = {
				email: ""
			}
		}
	}else{
		Session.deleteAll();
		$scope.current_user = {
			email: ""
		}
	}
	$scope.slide_b = 1
	$scope.changeSlide = function () {
		$timeout(function () {
			$scope.slide_b += 1
			if ($scope.slide_b >= 3){
				$scope.slide_b = 1
			}
			$scope.changeSlide()
		},4000)
	}
	$scope.changeSlide();
	$scope.detailed_score = {};
	$scope.searchDB = function (id) {
		DataBaseService.getDB("/artist/"+id).success(function (data) {
			$scope.artist = data[0]
			if (!$scope.artist.calificacion)
				$scope.artist.calificacion = 0.0
			$scope.networks = [
				{img: "https://cdn.worldvectorlogo.com/logos/facebook-icon.svg", href: data[0].facebook,name: "Facebook"},
				{img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/YouTube_play_button_square_%282013-2017%29.svg/2000px-YouTube_play_button_square_%282013-2017%29.svg.png", href: data[0].youtube,name: "Youtube"},
				{img: "https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png", href: data[0].instagram,name: "Instagram"}
			]
			$scope.getDetailedView($scope.artist.id);

		})
	}
	$scope.sent_calification = function  () {
		DataBaseService.postDB("/calificar/"+$scope.artist.id+"/"+$scope.current_user.user_p.id,$scope.calification).success(function  (data) {
			if (data.status != 400){
				$("#modalCalificar").modal("hide");
				$scope.searchDB($scope.artist.id);
			}
		})
	}
	$scope.searchDB($routeParams.artist_id)
	function get_ID_youtube(string) {
		if (string.indexOf("youtu.be") === -1){
			var video_id = string.split('v=')[1];
			var ampersandPosition = video_id.indexOf('&');
			if(ampersandPosition != -1) {
			  video_id = video_id.substring(0, ampersandPosition);
			}
			return video_id
		}else{
			var video_id = string.split('youtu.be/')[1];
			var questionPosition = video_id.indexOf('?');
			if(questionPosition != -1) {
			  video_id = video_id.substring(0, questionPosition);
			}
			return video_id
		}
	}
	$scope.get_url_youtube = function () {
		if ($scope.artist)
			return $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + get_ID_youtube($scope.artist.video))
		else
			return ''
	}
	
	$scope.getDetailedView = function(id){
		DataBaseService.getDB("/artist/detailedscore/"+id).success(function  (data) {
			if (data.status != 400){
				$scope.detailed_score = data.detailedScore[0];
			}
		})
	}
	$scope.sent_login = function () {
		Session.login($scope.login).success(function(data){
			if (data.status != 400){
				var user = {user: data.user_info[0], user_p: data.user_profile[0]};
				Session.setUser(user)
				$scope.current_user = user;
				$('#modalLogin').modal('hide');
			}else{
				alert(data.notice.text)
			}
				
		}).error(function(error){
			alert(error)
		});
	}
	$scope.delete_login = function () {
		Session.logout()
	}

	$("fieldset.rating").hover( function(){
		$(this).find('.tooltip-rating').fadeIn('fast');
	},function(){
		$(this).find('.tooltip-rating').fadeOut('fast');
	})

	$scope.siguienteArtista = function(id){
		DataBaseService.getDB("/artist/random/"+id).success(function  (data) {
			if (data.status != 400){
				$timeout(function  () {
					$window.location.href = prefix+"/#/artists/"+data[0].id;
				})
			}
		})
	}
	$scope.goToProfile = function () {
		if ($scope.current_user.user.type == 2){
			$window.location.href = prefix+"/#/artists/" + $scope.current_user.user_p.id;
		}else{
			if ($scope.current_user.user.type == 3){
				$window.location.href = prefix+"/#/calificador/" + $scope.current_user.user_p.id;	
			}
		}
	}
})
angular.module("conexo")
.controller("calificadorController",function ($scope,$routeParams,$timeout,DataBaseService,Session,$window) {
	var prefix = '';
	if (hostname.indexOf('clickco.co') > -1) {
	    prefix = '/conexo';
	};
	if (Session.isAuth()){
		var user = Session.getUser()
		if (user){
			$scope.current_user = user;
		}else{
			Session.deleteAll();
			$scope.current_user = {
				email: ""
			}
		}
	}else{
		Session.deleteAll();
		$scope.current_user = {
			email: ""
		}
	}
	$scope.slide_b = 1
	$scope.changeSlide = function () {
		$timeout(function () {
			$scope.slide_b += 1
			if ($scope.slide_b >= 3){
				$scope.slide_b = 1
			}
			$scope.changeSlide()
		},4000)
	}
	$scope.changeSlide();
	$scope.searchDB = function (id) {
		DataBaseService.getDB("/calificador/"+id).success(function (data) {
			$scope.calificador = data[0]
		})
	}
	$scope.searchDB($routeParams.calificador_id)
	$scope.goToCalificar = function  () {
		DataBaseService.getDB("/artist/random/"+$scope.calificador.id).success(function  (data) {
			if (data.status != 400){
				$timeout(function  () {
					$window.location.href = prefix+"/#/artists/"+data[0].id;
				})
			}
		})
	}
	$scope.delete_login = function () {
		Session.logout()
	}
	$scope.goToProfile = function () {
		if ($scope.current_user.user.type == 2){
			$window.location.href = prefix+"/#/artists/" + $scope.current_user.user_p.id;
		}else{
			if ($scope.current_user.user.type == 3){
				$window.location.href = prefix+"/#/calificador/" + $scope.current_user.user_p.id;	
			}
		}
	}
})
angular.module("conexo")
.controller("homeController",function ($scope,$timeout,DataBaseService,Session,$window) {
	var prefix = '';
	if (hostname.indexOf('clickco.co') > -1) {
	    prefix = '/conexo';
	};

	if (Session.isAuth()){
		var user = Session.getUser()
		if (user){
			$scope.current_user = user;
		}else{
			Session.deleteAll();
			$scope.current_user = {
				email: ""
			}
		}
	}else{
		Session.deleteAll();
		$scope.current_user = {
			email: ""
		}
	}
	$scope.categories = [
        {
        	"img": "https://i.ytimg.com/vi/oIpkUbu3ETg/maxresdefault.jpg",
        	"name" : "Dibujo"
        },
        {
        	"img": "https://imagenes.educ.ar/repositorio/Imagen/ver?image_id=dac683c8-2c4f-4421-b907-4bda73c241a2",
        	"name" : "Pintura"
        },
        {
        	"img": "http://pila.gob.ar/wp-content/uploads/2017/11/Artesanos.jpg",
        	"name" : "Escultura"
        },
        {
        	"img": "http://orquestaacademicagranada.org/panel/wp-content/uploads/2012/02/musicos2.jpg",
        	"name" : "Música",
            "subcategorias" : [
                  "Clásica",
                  "Blues",
                  "Jazz",
                  "R&B",
                  "Rock and Roll",
                  "Gospel",
                  "Soul",
                  "Rock",
                  "Metal",
                  "Punk",
                  "Country",
                  "Funk",
                  "Disco",
                  "House",
                  "Techno",
                  "Pop",
                  "Ska",
                  "Reggae",
                  "Hip Hop",
                  "Salsa",
                  "Urbano",
                  "Vallenato",
                  "Merengue",
                  "Ranchera",
                  "Electrónica",
                  "Folclor",
                  "Boleros",
                  "Rap"
            ]
        },
        {
        	"img": "https://www.fondosypantallas.com/wp-content/uploads/2010/08/w078.jpg",
        	"name" : "Danza",
        	"subcategorias" : [
				"Ballet",
				"Folclor",
				"Urbano",
				"Contemporaneo",
				"Tango",
				"Árabe",
				"Salsa",
				"Rock and Roll"
        	]
        },
        {
        	"img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Compañia_de_teatro_infantil_%22La_Colmenita_RD%22.jpg/1200px-Compañia_de_teatro_infantil_%22La_Colmenita_RD%22.jpg",
        	"name" : "Teatro"
        },
        {
        	"img": "https://educalengua.files.wordpress.com/2014/01/open_books.jpg",
        	"name" : "Literatura"
        },
        {
        	"img": "https://marketingparafotografos.es/wp-content/uploads/2014/10/LEICA-2244x897.jpg",
        	"name" : "Audiovisuales",
			"subcategorias" : [
				"Cine",
				"Fotografía",
				"Audio",
				"Video",
				"Producción",
				"Iluminación",
			]
        }
    ]
	$scope.results = []
	$scope.slide_i = 0
	$scope.slide_b = 1
	$scope.t_order = 3
	$scope.reverse = true
	$scope.propertyName = 'clasificacion'

	$scope.findCategory =  function (name) {
		return $scope.categories.find(function (category) {
			if (category.name == name)
				return category
		})
	}
	$scope.changeOrder = function (t_order) {
		$scope.t_order = t_order
		switch(t_order){
			case 1:
				$scope.propertyName = 'nombre_artista'; 
				$scope.reverse = false
				break;
			case 2:
				$scope.propertyName = 'categoria'; 
				$scope.reverse = false
				break;
			case 3:
				$scope.propertyName = 'clasificacion'; 
				$scope.reverse = true
				break;
		}
	}
	$scope.getArtist = function(){
		DataBaseService.getDB("/artists").success(function (data){
			if(data.status != 400){
				$scope.slides = data
				$scope.changeSlide()
			}
		})
	}
	$scope.changeSlide = function () {
		$timeout(function () {
			$scope.slide_i += 1
			$scope.slide_b += 1
			if ($scope.slide_i >= $scope.slides.length){
				$scope.slide_i = 0
			}
			if ($scope.slide_b >= 3){
				$scope.slide_b = 1
			}
			$scope.changeSlide()
		},4000)
	}
	$scope.searchDB = function (text) {
		if (text != ""){
			DataBaseService.getDB("/artist/search/"+text).success(function (data) {
				data.forEach(function(dta_i){
					if (!dta_i.calificacion)
						dta_i.calificacion = 0.0
				})
				$scope.results = data
			})
		}else{
			$scope.results = []
		}
	}
	$scope.searchCategory = function (category) {
		$scope.searchDB(category.name)
		$scope.search = category.name
	}

	$scope.getArtist();
	$scope.sent_login = function () {
		Session.login($scope.login).success(function(data){
			if (data.status != 400){
				var user = {user: data.user_info[0], user_p: data.user_profile[0]};
				Session.setUser(user)
				$scope.current_user = user;
				$('#modalLogin').modal('hide');
				$timeout(function(){
					if (data.user_info[0].type == 2)
						$window.location.href = prefix+"/#/artists/"+data.user_profile[0].id;
					if (data.user_info[0].type == 3)
						$window.location.href = prefix+"/#/calificador/"+data.user_profile[0].id;
            	},500)
			}else{
				alert(data.notice.text)
			}
				
		}).error(function(error){
			alert(error)
		});
	}
	$scope.delete_login = function () {
		Session.logout()
	}
	$scope.goToProfile = function () {
		if ($scope.current_user.user.type == 2){
			$window.location.href = prefix+"/#/artists/" + $scope.current_user.user_p.id;
		}else{
			if ($scope.current_user.user.type == 3){
				$window.location.href = prefix+"/#/calificador/" + $scope.current_user.user_p.id;	
			}
		}
	}
})
angular.module("conexo")
.controller("indexController",function ($scope,$timeout,$location,Session) {
	if (Session.isAuth()){
		var user = Session.getUser()
		if (user){
			$scope.current_user = user;
		}else{
			Session.deleteAll();
			$scope.current_user = {
				email: ""
			}
		}
	}else{
		Session.deleteAll();
		$scope.current_user = {
			email: ""
		}
	}
})
.controller("footerController",function ($scope,$timeout) {
	$scope.networks = [
		{img: "https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-256.png", name: "Linkedin", href: "#"},
		{img: "http://biz-techservices.com/wp-content/uploads/2016/08/biz_tech_email.jpg", name: "Correo", href: "#"},
		{img: "https://cdn.worldvectorlogo.com/logos/facebook-icon.svg", name: "Facebook", href: "#"},
		{img: "https://www.pi-expertises.com/wp-content/uploads/2016/10/twitter-bird-white-on-blue.png", name: "Twitter", href: "#"},
		{img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/YouTube_play_button_square_%282013-2017%29.svg/2000px-YouTube_play_button_square_%282013-2017%29.svg.png", name: "Youtube", href: "#"},
		{img: "https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png", name: "Instagram", href: "#"}]
	
})
angular.module("conexo")
.controller("signupController",function ($scope,$routeParams,$timeout,DataBaseService,$sce,Session,$window) {
	var prefix = '';
	if (hostname.indexOf('clickco.co') > -1) {
	    prefix = '/conexo';
	};
	if (Session.isAuth()){
		var user = Session.getUser()
		if (user){
			$scope.current_user = user;
			$timeout(function(){
				$window.location.href = prefix+"/#/home";
            },100)
		}else{
			Session.deleteAll();
			$scope.current_user = {
				email: ""
			}
		}
	}else{
		Session.deleteAll();
		$scope.current_user = {
			email: ""
		}
	}
	$scope.slide_b = 1
	$scope.changeSlide = function () {
		$timeout(function () {
			$scope.slide_b += 1
			if ($scope.slide_b >= 3){
				$scope.slide_b = 1
			}
			$scope.changeSlide()
		},4000)
	}
	$scope.changeSlide();
	$scope.type_users = [{id: 2, name: "Artista"},{id: 3, name: "Mercado Cultural"}]
	$scope.categories = [
        {
        	"img": "https://i.ytimg.com/vi/oIpkUbu3ETg/maxresdefault.jpg",
        	"name" : "Dibujo"
        },
        {
        	"img": "https://imagenes.educ.ar/repositorio/Imagen/ver?image_id=dac683c8-2c4f-4421-b907-4bda73c241a2",
        	"name" : "Pintura"
        },
        {
        	"img": "http://pila.gob.ar/wp-content/uploads/2017/11/Artesanos.jpg",
        	"name" : "Escultura"
        },
        {
        	"img": "http://orquestaacademicagranada.org/panel/wp-content/uploads/2012/02/musicos2.jpg",
        	"name" : "Música",
            "subcategorias" : [
                  "Clásica",
                  "Blues",
                  "Jazz",
                  "R&B",
                  "Rock and Roll",
                  "Gospel",
                  "Soul",
                  "Rock",
                  "Metal",
                  "Punk",
                  "Country",
                  "Funk",
                  "Disco",
                  "House",
                  "Techno",
                  "Pop",
                  "Ska",
                  "Reggae",
                  "Hip Hop",
                  "Salsa",
                  "Urbano",
                  "Vallenato",
                  "Merengue",
                  "Ranchera",
                  "Electrónica",
                  "Folclor",
                  "Boleros",
                  "Rap"
            ]
        },
        {
        	"img": "https://www.fondosypantallas.com/wp-content/uploads/2010/08/w078.jpg",
        	"name" : "Danza",
        	"subcategorias" : [
				"Ballet",
				"Folclor",
				"Urbano",
				"Contemporaneo",
				"Tango",
				"Árabe",
				"Salsa",
				"Rock and Roll"
        	]
        },
        {
        	"img": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Compañia_de_teatro_infantil_%22La_Colmenita_RD%22.jpg/1200px-Compañia_de_teatro_infantil_%22La_Colmenita_RD%22.jpg",
        	"name" : "Teatro"
        },
        {
        	"img": "https://educalengua.files.wordpress.com/2014/01/open_books.jpg",
        	"name" : "Literatura"
        },
        {
        	"img": "https://marketingparafotografos.es/wp-content/uploads/2014/10/LEICA-2244x897.jpg",
        	"name" : "Audiovisuales",
			"subcategorias" : [
				"Cine",
				"Fotografía",
				"Audio",
				"Video",
				"Producción",
				"Iluminación",
			]
        }
    ]
    $scope.category_has_sub = function(categoria){
    	category = $scope.categories.find(function(categoria_i){if (categoria_i.name == categoria) return categoria_i})
    	if (category){
	    	if (category.subcategorias){
	    		return true
	    	}else{
	    		return false
	    	}
	    }
    }
    $scope.reload = function (){
    	$window.location.reload();
    }
    $scope.change_subs = function(categoria){
    	$scope.user.categoria = categoria
    	category = $scope.categories.find(function(categoria_i){if (categoria_i.name == categoria) return categoria_i})
    	if (category){
	    	if (category.subcategorias){
	    		$scope.subcategorias = category.subcategorias	
	    	}
	    }
    }
	$scope.slide = 1
	$scope.setType = function(type_user){
		$scope.user = {type: type_user}
		$scope.slide = 2
		$scope.slide_artist = 1
		$scope.slide_calificador = 1
	}
	$scope.next_slide_artist = function (){
		$scope.slide_artist += 1	
	}
	$scope.back_artist = function(){
		$scope.slide_artist -= 1	
	}
	$scope.next_slide_calificador = function (){
		$scope.slide_calificador += 1	
	}
	$scope.back_calificador = function(){
		$scope.slide_calificador -= 1	
	}
	$scope.sent_signup_artist = function(){
		if($scope.user.categoria){
			if (!$scope.user.subcategoria)
				$scope.user.subcategoria = "N/A"
			DataBaseService.postDB("/user/new",$scope.user).success(function(data){
				if (data.status != 400){
					$scope.user.id_user = data.userInfo[0].id
					DataBaseService.postDB("/artist/add",$scope.user).success(function(data){
						if (data.status != 400){
							$scope.login = $scope.user
							$scope.sent_login()
						}else{
							alert(data.notice.text)
						}
					})
				}else{
					alert(data.notice.text)
				}
			})
		}
	}
	$scope.sent_signup_calificador = function(){
		$scope.user.tipo_cal = 'Empresa'
		DataBaseService.postDB("/user/new",$scope.user).success(function(data){
			if (data.status != 400){
				$scope.user.id_user = data.userInfo[0].id
				DataBaseService.postDB("/calificador/add",$scope.user).success(function(data){
					if (data.status != 400){
						$scope.login = $scope.user
						$scope.sent_login()
					}else{
						alert(data.notice.text)
					}
				})
			}else{
				alert(data.notice.text)
			}
		})
		
	}
	$scope.sent_login = function () {
		Session.login($scope.login).success(function(data){
			if (data.status != 400){
				var user = {user: data.user_info[0], user_p: data.user_profile[0]};
				Session.setUser(user)
				$scope.current_user = user;
				$('#modalLogin').modal('hide');
				$timeout(function(){
					if (data.user_info[0].type == 2)
						$window.location.href = prefix+"/#/artists/"+data.user_profile[0].id;
					if (data.user_info[0].type == 3)
						$window.location.href = prefix+"/#/calificador/"+data.user_profile[0].id;
            	},500)
			}else{
				alert(data.notice.text)
			}
				
		}).error(function(error){
			alert(error)
		});
	}
	$scope.delete_login = function () {
		Session.logout()
	}
	$scope.goToProfile = function () {
		if ($scope.current_user.user.type == 2){
			$window.location.href = prefix+"/#/artists/" + $scope.current_user.user_p.id;
		}else{
			if ($scope.current_user.user.type == 3){
				$window.location.href = prefix+"/#/calificador/" + $scope.current_user.user_p.id;	
			}
		}
	}
})