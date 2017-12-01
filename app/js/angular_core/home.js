angular.module("conexo")
.controller("homeController",function ($scope,$timeout) {
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
})