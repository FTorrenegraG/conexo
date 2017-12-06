angular.module("conexo")
.controller("homeController",function ($scope,$timeout,DataBaseService,Session,$window) {
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
	$scope.slides = [
		{
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
		}
	]
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
			DataBaseService.getDB("/artist/search/"+text).success(function (data) {
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