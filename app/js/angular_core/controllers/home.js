angular.module("conexo")
.controller("homeController",function ($scope,$timeout,DataBaseService,Session) {
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
		{id: 0, img: "http://orquestaacademicagranada.org/panel/wp-content/uploads/2012/02/musicos2.jpg", name: "Musicos", description: " descripción musicos"},
		{id: 1, img: "http://pila.gob.ar/wp-content/uploads/2017/11/Artesanos.jpg", name: "Artesanos", description: " descripción Artesanos"},
		{id: 2, img: "https://www.fondosypantallas.com/wp-content/uploads/2010/08/w078.jpg", name: "Bailarines", description: " descripción Bailarines"},
		{id: 3, img: "https://imagenes.educ.ar/repositorio/Imagen/ver?image_id=dac683c8-2c4f-4421-b907-4bda73c241a2", name: "Pintores", description: " descripción Pintores"},
		{id: 4, img: "https://marketingparafotografos.es/wp-content/uploads/2014/10/LEICA-2244x897.jpg", name: "Fotografos", description: " descripción Fotografos"},
		{id: 5, img: "http://via.placeholder.com/350x350", name: "Cualquiera", description: " descripción cualqueira"}]
	$scope.slide_i = 0
	$scope.results = []
	$scope.propertyName = 'clasificacion'
	$scope.reverse = true
	$scope.t_order = 3
	$scope.findCategory =  function (id) {
		return $scope.categories.find(function (category) {
			if (category.id == id)
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
				data.forEach(function(data_i){
					data_i.clasificacion = (Math.random() * 5).toFixed(1);
				})
				$scope.results = data
			})
		}else{
			$scope.results = []
		}
		// var example = JSON.parse('{"id":"1","id_user":"4","nombre_artista":"Rancid ","foto_perfil":"https://i.ytimg.com/vi/x9B6--fvhXQ/maxresdefault.jpg","foto_portada":"URL_TO_PATH_port","categoria":"0","subcategoria":"0","facebook":"rancid","instagram":"rancid","youtube":"UCFSjnN55tV-mecyG0mYvhdQ","video":"9SCF1zbsBfU","perfil":"Cualquier texto","valor":"50000000","descuento":"10","descservicio":"Incluye- 10 temas -Equipo tecnico","estado":"1","vencimiento":null}')
		// // example.id += $scope.results.length
		// example.nombre_artista += example.id
		// example.clasificacion = (Math.random() * 5).toFixed(1);
		// $scope.results.push(example)
	}
	$scope.searchCategory = function (category) {
		$scope.searchDB(category.name)
		$scope.search = category.name
	}
	$scope.sent_login = function () {
		Session.login($scope.login).success(function(data){
			if (data.status != 400){
				var user = data.user_info[0];
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
})