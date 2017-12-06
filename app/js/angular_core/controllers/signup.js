angular.module("conexo")
.controller("signupController",function ($scope,$routeParams,$timeout,DataBaseService,$sce,Session,$window) {
	if (Session.isAuth()){
		var user = Session.getUser()
		if (user){
			$scope.current_user = user;
			$timeout(function(){
				$window.location.href = "/#/home";
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
		$scope.slide += 1
		$scope.slide_artist = 1
		$scope.slide_calificador = 1
	}
	$scope.next_slide_artist = function (){
		$scope.slide_artist += 1	
	}
	$scope.next_slide_calificador = function (){
		$scope.slide_calificador += 1	
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
						$window.location.href = "/#/artists/"+data.user_profile[0].id;
					if (data.user_info[0].type == 3)
						$window.location.href = "/#/calificador/"+data.user_profile[0].id;
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
})