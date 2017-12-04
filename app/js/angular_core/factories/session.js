angular.module("conexo")
.factory('Session', function SessionFactory($http, $cookieStore, $localStorage,$window) {
  return {
    login: function(data){
      return $http({method: 'POST', url: URL_Api + '/sections', data: data, headers: {'Proyecto': "2"}})
    },
    signUp: function(data){
      return $http({method: 'POST', url: URL_Api + '/users', data: data})
    },
    isAuth: function(){
      try{
        return $cookieStore.get('token') !== undefined ;
      }catch(err){
        this.logout();
        return false;
      }
    },
    setToken: function(token){
    	$cookieStore.put('token', undefined);
	    $localStorage.user = undefined;
        $cookieStore.put('token', token);
    },
    logout: function(){
    	$http({
    		method: 'DELETE',
    		url: URL_Api + '/sections',
    		headers: {
				'Authorization': $cookieStore.get('token')
			}
    	}).success(function(data){
    		$cookieStore.put('token', undefined);
		    $localStorage.user = undefined;
		    $window.location.href = "/cdc-v2/";
            $window.location.reload();
    	}).error(function(error){
    		$cookieStore.put('token', undefined);
            $localStorage.user = undefined;
            $window.location.href = "/cdc-v2/";
            $window.location.reload();
    	})
    },
    deleteAll: function () {
        $cookieStore.put('token', undefined);
        $localStorage.user = undefined;
    },
    setUser: function(user){
    	$localStorage.user=user
    },
    getUser: function(){
    	return $localStorage.user
    },
    getSession: function(){
    	return {
    		Authorization: $cookieStore.get('token')
    	}
    },
    getSeccionInfo: function(){
        return $http({
            method: 'GET',
            url: URL_Api + '/sections',
            headers: {
                'Authorization': $cookieStore.get('token')
            }
        });
    }
  }
})
