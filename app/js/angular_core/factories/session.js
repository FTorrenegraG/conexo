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
