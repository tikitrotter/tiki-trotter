var app = angular.module("tikiTrotter", []);
var url_prefix = window.location.origin;

// USERS
app.controller("userController", function($scope, $http, $window) {
	
	$scope.login = {};
	$scope.capt = {};
	$scope.signup = {};

	// generate captcha
	$http.get(url_prefix + "/user/captcha")
	.success(function(response) {
		$scope.capt = response;
	});	


$scope.authenticate_fb_user = function() { 
	 $http.get(url_prefix + "/tiki-trotter/user/authenticate_fb_user").success(function (response) {

     if(response.code == 0){     	
     	window.location.href=response.data.authUrl;
     	}else{
     	
    console.log(response);
     		//window.location.href=url_prefix + "/tiki-trotter/dashboard"; 
     	

     	}
  });
}


	$scope.authenticateUser = function() {
		$("#div_busy").show();
		$http({
			method: 'POST',
			url: url_prefix + "/user/authenticate_user",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param($scope.login)
		}).success(function (data, response) {
			console.log(data);
			if(data.response.code === 0) { 
				$("#div_busy").hide();
				$("#alert-message").show();
			}
			else if(data.response.code === 1) { 
				$("#div_busy").hide();
				window.location.href=url_prefix + "/dashboard";
			}
		});
	}

	$scope.reCaptcha = function() {
		console.log()
		$http.get(url_prefix + "/user/captcha")
		.success(function(response) {
			$scope.capt = response;
		});    	
	}

	$scope.signUp = function() {
		console.log($scope.signup);
		$scope.signup.user_type = 1;
		$("#div_busy").show();
		$http({
			method: 'POST',
			url: url_prefix + "/user/save_user",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param($scope.signup)
		}).success(function (data, response) {
			console.log($scope.signup);
			$('#div_busy').hide();
		});    	
	}
});

app.controller("dashboardController", function($scope, $http, $window) {

});

