angular.module("conexo")
.controller("artistsController",function ($scope,$routeParams,$timeout,DataBaseService,$sce) {
	$scope.categories = [
		{id: 0, img: "http://orquestaacademicagranada.org/panel/wp-content/uploads/2012/02/musicos2.jpg", name: "Musicos", description: " descripción musicos"},
		{id: 1, img: "http://pila.gob.ar/wp-content/uploads/2017/11/Artesanos.jpg", name: "Artesanos", description: " descripción Artesanos"},
		{id: 2, img: "https://www.fondosypantallas.com/wp-content/uploads/2010/08/w078.jpg", name: "Bailarines", description: " descripción Bailarines"},
		{id: 3, img: "https://imagenes.educ.ar/repositorio/Imagen/ver?image_id=dac683c8-2c4f-4421-b907-4bda73c241a2", name: "Pintores", description: " descripción Pintores"},
		{id: 4, img: "https://marketingparafotografos.es/wp-content/uploads/2014/10/LEICA-2244x897.jpg", name: "Fotografos", description: " descripción Fotografos"},
		{id: 5, img: "http://via.placeholder.com/350x350", name: "Cualquiera", description: " descripción cualqueira"}]
	$scope.networks = [
		{img: "https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-256.png", name: "Linkedin", href: "#"},
		{img: "http://biz-techservices.com/wp-content/uploads/2016/08/biz_tech_email.jpg", name: "Correo", href: "#"},
		{img: "https://cdn.worldvectorlogo.com/logos/facebook-icon.svg", name: "Facebook", href: "#"},
		{img: "https://www.pi-expertises.com/wp-content/uploads/2016/10/twitter-bird-white-on-blue.png", name: "Twitter", href: "#"},
		{img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/YouTube_play_button_square_%282013-2017%29.svg/2000px-YouTube_play_button_square_%282013-2017%29.svg.png", name: "Youtube", href: "#"},
		{img: "https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png", name: "Instagram", href: "#"}]
	$scope.findCategory =  function (id) {
		return $scope.categories.find(function (category) {
			if (category.id == id)
				return category
		})
	}
	$scope.searchDB = function (id) {
		DataBaseService.getDB("/artist/"+id).success(function (data) {
			$scope.artist = data[0]
			$scope.artist.clasificacion = (Math.random() * 5).toFixed(1);
		})
		// var example = JSON.parse('{"id":"1","id_user":"4","nombre_artista":"Rancid ","foto_perfil":"https://i.ytimg.com/vi/x9B6--fvhXQ/maxresdefault.jpg","foto_portada":"URL_TO_PATH_port","categoria":"0","subcategoria":"0","facebook":"rancid","instagram":"rancid","youtube":"UCFSjnN55tV-mecyG0mYvhdQ","video":"9SCF1zbsBfU","perfil":"Cualquier texto","valor":"50000000","descuento":"10","descservicio":"Incluye- 10 temas -Equipo tecnico","estado":"1","vencimiento":null}')
		// example.id += $scope.results.length
		// example.nombre_artista += example.id
		// example.clasificacion = (Math.random() * 5).toFixed(1);
		// $scope.results.push(example)
	}
	$scope.searchDB($routeParams.artist_id)
	$scope.get_url_youtube = function () {
		if ($scope.artist)
			return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.artist.video)
		else
			return ''
	}
})