angular.module("conexo")
.controller("calificadorController",function ($scope,$routeParams,$timeout,DataBaseService,Session,$window) {
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
					$window.location.href = "/#/artists/"+data[0].id;
				})
			}
		})
	}
	$scope.delete_login = function () {
		Session.logout()
	}
})