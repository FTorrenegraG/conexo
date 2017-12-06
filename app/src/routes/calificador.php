<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


// Get All calificador
$app->get('/calificadores', function(Request $request, Response $response){
	$sql = "SELECT * FROM calificador";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->query($sql);
		$calificador = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($calificador); 
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Get Single calificador
$app->get('/calificador/{id}', function(Request $request, Response $response){
	$id = $request->getAttribute('id');
	$sql = "SELECT * FROM calificador WHERE id = $id";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->query($sql);
		$artist = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($artist); 
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});
	

// Get Single calificador logged
$app->get('/calificador/user/logged', function(Request $request, Response $response){
	if (isset($_SESSION["userInfo"])) {
		$json = json_decode($_SESSION["userInfo"]);
		$id = $json[0]->id;
		$sql = "SELECT * FROM calificador WHERE id_user = $id";

		try{
			// Get db Obj
			$db = new db();
			// Connect
			$db = $db->connect();

			$stmt = $db->query($sql);
			$artist = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;

			echo json_encode($artist); 
		}catch(PDOException $e){
			echo '{"error":{"text":'.$e->getMessage().'}}';
		}
	}else{
		echo '{"notice":{"text":"There is no session!"}, "status" : 400}';
	}
	
});

// Get Single calificador-user
$app->get('/calificador/user/{id}', function(Request $request, Response $response){
	$id_user = $request->getAttribute('id');
	$sql = "SELECT * FROM calificador WHERE id_user = $id_user";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->query($sql);
		$artist = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($artist); 
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Add Single calificador
$app->post('/calificador/add', function(Request $request, Response $response){
	$id_user = $request->getParam('id_user');
	$tipo_cal = $request->getParam('tipo_cal');
	$foto_perfil = $request->getParam('foto_perfil');
	$foto_portada = $request->getParam('foto_portada');
	$preferencias = $request->getParam('preferencias') ? $request->getParam('preferencias') : null;



	$sql = "INSERT INTO calificador (id_user, tipo_cal, foto_perfil, foto_portada, preferencias) VALUES (:id_user,:tipo_cal, :foto_perfil, :foto_portada, :preferencias)";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->prepare($sql);
		$stmt->bindParam(':id_user',$id_user);
		$stmt->bindParam(':tipo_cal',$tipo_cal);
		$stmt->bindParam(':foto_perfil',$foto_perfil);
		$stmt->bindParam(':foto_portada',$foto_portada);
		$stmt->bindParam(':preferencias',$preferencias);

		$stmt->execute();
		$db = null;

		$sql = "SELECT * FROM calificador WHERE id_user = $id_user";

		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->query($sql);
		$artist = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		$calificadorInfo = json_encode($artist);

		echo '{"notice":{"text":"Calificador Added!"}, "status" : 200, "calificadorInfo" : '.$calificadorInfo.'}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Update Single calificador
$app->put('/calificador/update/{id}', function(Request $request, Response $response){
	$id = $request->getAttribute('id');
	$foto_perfil = $request->getParam('foto_perfil');
	$foto_portada = $request->getParam('foto_portada');
	$preferencias = $request->getParam('preferencias');

	$update_string = '';

	if ($foto_perfil) $update_string = $update_string.'foto_perfil = :foto_perfil,';
	if ($foto_portada) $update_string = $update_string.'foto_portada = :foto_portada,';
	if ($preferencias) $update_string = $update_string.'preferencias = :preferencias,';

	$update_string = rtrim($update_string,',');

	$sql = "UPDATE calificador SET ".$update_string." WHERE id = $id" ;

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->prepare($sql);

		if ($foto_perfil) $stmt->bindParam(':foto_perfil',$foto_perfil);
		if ($foto_portada) $stmt->bindParam(':foto_portada',$foto_portada);
		if ($preferencias) $stmt->bindParam(':preferencias',$preferencias);
		
		$stmt->execute();
		$db = null;

		echo '{"notice":{"text":"Calificador Updated!"}, "status" : 200}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Delete artist
$app->delete('/calificador/delete/{id}', function(Request $request, Response $response){
	$id = $request->getAttribute('id');
	$sql = "DELETE FROM calificador where id = $id";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->prepare($sql);
		$stmt->execute();
		$db = null;

		echo '{"notice":{"text":"Calificador Deleted!"}, "status" : 200}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});