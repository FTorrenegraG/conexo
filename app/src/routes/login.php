<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


// Login User
$app->post('/login', function(Request $request, Response $response){
	$email = $request->getParam('email');
	$pass = md5($request->getParam('pass'));
	$sql = "SELECT id,first_name,last_name,email,cc_nit,type FROM users WHERE email = '$email' && pass = '$pass'";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->query($sql);
		$user = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		if (count($user) > 0) {
			$type = $user[0]->type;
			$id_user = $user[0]->id;
			if ($type == 2) {
				$sql = "SELECT * FROM artists WHERE id_user = $id_user";
			}
			if ($type == 3) {
				$sql = "SELECT * FROM calificador WHERE id_user = $id_user";
			}

			// Get db Obj
			$db = new db();
			// Connect
			$db = $db->connect();

			$stmt = $db->query($sql);
			$user_profile = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;

			$info = json_encode($user);
			$user_profile = json_encode($user_profile);
			$_SESSION["user"] = $email;
			$_SESSION["userInfo"] = $info;
			$_SESSION["userProfile"] = $user_profile;
			echo '{"notice":{"text":"User Logged In!"},"status":200,"user_info":'.$info.',"user_profile":'.$user_profile.'}';
		}else{
			echo '{"notice":{"text":"User Not Found"},"status":400}';
		}
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Login User
$app->post('/logout', function(Request $request, Response $response){
	// remove all session variables
	session_unset(); 
	// destroy the session 
	session_destroy(); 
	echo '{"notice":{"text":"User Logged Out!"},"status":200}';
});