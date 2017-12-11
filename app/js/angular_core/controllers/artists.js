angular.module("conexo")
.controller("artistsController",function ($scope,$routeParams,$timeout,DataBaseService,$sce,Session,$window) {
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
	$scope.get_url_youtube = function () {
		if ($scope.artist)
			return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.artist.video)
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
					$window.location.href = "/#/artists/"+data[0].id;
				})
			}
		})
	}
	$scope.goToProfile = function () {
		if ($scope.current_user.user.type == 2){
			$window.location.href = "/#/artists/" + $scope.current_user.user_p.id;
		}else{
			if ($scope.current_user.user.type == 3){
				$window.location.href = "/#/calificador/" + $scope.current_user.user_p.id;	
			}
		}
	}
})