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