<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


// Login User
$app->post('/api/login', function(Request $request, Response $response){
	$email = $request->getParam('email');
	$pass = md5($request->getParam('pass'));

	$sql = "SELECT id,first_name,last_name,email,cc_nit FROM users WHERE email = '$email' && pass = '$pass'";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->query($sql);
		$user = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		if (count($user) > 0) {
			$info = json_encode($user);
			$_SESSION["user"] = $email;
			$_SESSION["userInfo"] = $info;
			echo '{"notice":{"text":"User Logged In!"},"status":200,"user_info":'.$info.'}';
		}else{
			echo '{"notice":{"text":"User Not Found"},"status":400}';
		}
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Login User
$app->post('/api/logout', function(Request $request, Response $response){
	// remove all session variables
	session_unset(); 
	// destroy the session 
	session_destroy(); 
	echo '{"notice":{"text":"User Logged Out!"},"status":200}';
});