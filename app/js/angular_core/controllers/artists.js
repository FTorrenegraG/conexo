angular.module("conexo")
.controller("artistsController",function ($scope,$routeParams,$timeout,DataBaseService,$sce,Session) {
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
	$scope.networks = [
		{img: "https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-256.png", name: "Linkedin", href: "#"},
		{img: "http://biz-techservices.com/wp-content/uploads/2016/08/biz_tech_email.jpg", name: "Correo", href: "#"},
		{img: "https://cdn.worldvectorlogo.com/logos/facebook-icon.svg", name: "Facebook", href: "#"},
		{img: "https://www.pi-expertises.com/wp-content/uploads/2016/10/twitter-bird-white-on-blue.png", name: "Twitter", href: "#"},
		{img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/YouTube_play_button_square_%282013-2017%29.svg/2000px-YouTube_play_button_square_%282013-2017%29.svg.png", name: "Youtube", href: "#"},
		{img: "https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png", name: "Instagram", href: "#"}]
	$scope.searchDB = function (id) {
		DataBaseService.getDB("/artist/"+id).success(function (data) {
			$scope.artist = data[0]
		})
	}
	$scope.searchDB($routeParams.artist_id)
	$scope.get_url_youtube = function () {
		if ($scope.artist)
			return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.artist.video)
		else
			return ''
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
})