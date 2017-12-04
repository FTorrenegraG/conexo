angular.module("conexo")
.factory('DataBaseService', ['$http','Session', function AuthorizationFactory($http,Session) {
	var URL_Api = 'http://localhost:9000/api'
	return {
		postDB : function (url,data) {
			return $http({
				method: 'POST',
                url: URL_Api+url,
                data: data
			})
		},
		getDB : function (url) {
			return $http({
				method: 'GET',
                url: URL_Api+url
			})
		},
		putDB : function (url,data) {
			return $http({
				method: 'PUT',
                url: URL_Api+url,
                data: data
			})
		},
		deleteDB : function (url) {
			return $http({
				method: 'Delete',
                url: URL_Api+url
			})
		}
	}
}])