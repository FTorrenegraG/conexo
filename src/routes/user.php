<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


// Get All users
$app->get('/api/users', function(Request $request, Response $response){
	$sql = "SELECT * FROM users";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->query($sql);
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($users); 
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Get Single user Info
$app->get('/api/user', function(Request $request, Response $response){
	if (isset($_SESSION["user"])) {
		# code...
		$email = $_SESSION["user"];
		$sql = "SELECT first_name,last_name,email,cc_nit FROM users WHERE email = '$email'";
		try{
			// Get db Obj
			$db = new db();
			// Connect
			$db = $db->connect();

			$stmt = $db->query($sql);
			$user = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;

			echo json_encode($user); 
		}catch(PDOException $e){
			echo '{"error":{"text":'.$e->getMessage().'}}';
		}
	}else{
		echo '{"notice":{"text":"There is no session!"}, "status" : 400}';
	}
});


// Insert User
$app->post('/api/user/new', function(Request $request, Response $response){
	$cc_nit = $request->getParam('cc_nit');
	$first_name = $request->getParam('first_name');
	$last_name = $request->getParam('last_name');
	$email = $request->getParam('email');
	$pass = md5($request->getParam('pass'));
	$type = $request->getParam('type');

	// verify user first
	$verify_sql = "SELECT * FROM users WHERE email = '$email'";

	try {

		// Get db Obj
		$verify_db = new db();
		// Connect
		$verify_db = $verify_db->connect();

		$verify_stmt = $verify_db->query($verify_sql);
		$user = $verify_stmt->fetchAll(PDO::FETCH_OBJ);
		$verify_db = null;

		if (count($user) == 0) {
			# code...
			$sql = "INSERT INTO users (cc_nit, first_name, last_name, email, pass, type) VALUES (:cc_nit, :first_name, :last_name, :email, :pass, :type)";

			try{
				// Get db Obj
				$db = new db();
				// Connect
				$db = $db->connect();

				$stmt = $db->prepare($sql);
				$stmt->bindParam(':first_name',$first_name);
				$stmt->bindParam(':last_name',$last_name);
				$stmt->bindParam(':email',$email);
				$stmt->bindParam(':pass',$pass);
				$stmt->bindParam(':type',$type);
				$stmt->bindParam(':cc_nit',$cc_nit);

				$stmt->execute();
				$db = null;

				echo '{"notice":{"text":"User Added!"}, "status" : 200}';
			}catch(PDOException $e){
				echo '{"error2":{"text":'.$e->getMessage().'}}';
			}
		}else{
			echo '{"notice":{"text":"User already exsists!"}, "status" : 400}';
		}

		
	} catch (PDOException $e) {
		echo '{"error1":{"text":'.$e->getMessage().'}}';
	}


});

// Update Single user
$app->put('/api/user/update/{email}', function(Request $request, Response $response){
	$email = $request->getAttribute('email');
	$cc_nit = $request->getParam('cc_nit');
	$first_name = $request->getParam('first_name');
	$last_name = $request->getParam('last_name');
	$pass = $request->getParam('pass');
	

	$update_string = '';

	if ($first_name ) {
		$update_string = $update_string.'first_name = :first_name,';
	}
	if ($last_name ) {
		$update_string = $update_string.'last_name = :last_name,';
	}
	if ($cc_nit) {
		$update_string = $update_string.'cc_nit = :cc_nit';
	}
	if ($pass) {
		$update_string = $update_string.'pass = :pass';
	}

	$update_string = rtrim($update_string,',');

	$sql = "UPDATE users SET ".$update_string." WHERE email = '$email'" ;

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->prepare($sql);

		if ($first_name ) $stmt->bindParam(':first_name',$first_name);
		if ($last_name ) $stmt->bindParam(':last_name',$last_name);
		if ($cc_nit) $stmt->bindParam(':cc_nit',$cc_nit);
		if ($pass) $stmt->bindParam(':pass',$pass);
		
		$stmt->execute();
		$db = null;

		echo '{"notice":{"text":"User Updated!"},"status" : 200}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Delete user
$app->delete('/api/user/delete/{id}', function(Request $request, Response $response){
	$id = $request->getAttribute('id');
	$sql = "DELETE FROM users where id = $id";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->prepare($sql);
		$stmt->execute();

		$db = null;

		echo '{"notice":{"text":"User Deleted!"},"status" : 200}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});