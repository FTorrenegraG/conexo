<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


// Get All artists
$app->get('/artists', function(Request $request, Response $response){
	$sql = "SELECT * FROM artists";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($artists); 
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Get Single artists
$app->get('/artist/{id}', function(Request $request, Response $response){
	$id = $request->getAttribute('id');
	$sql = "SELECT * FROM artists WHERE id = $id";

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

// Get Single artists score
$app->get('/artist/score/{id}', function(Request $request, Response $response){
	$id = $request->getAttribute('id');
	$sql = "SELECT id_artista, avg(originalidad+contenido+propuesta+imagen+calidad)/5 as promedio FROM `calificaciones` WHERE id_artista = $id and estado = 1";

	try{
		$db = new db();
		$db = $db->connect();

		$stmt = $db->query($sql);
		$calificaciones = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		$score = $calificaciones[0]->promedio;

		echo '{"score":'.$score.', "status" : 200}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Search artists
$app->get('/artist/search/{search}', function(Request $request, Response $response){
	$search = urldecode($request->getAttribute('search'));
	$sql = "SELECT * FROM artists WHERE Concat(nombre_artista, '', categoria, '', subcategoria, '', perfil, '', valor, '', descservicio) like '%$search%'";

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

// Get Single artists logged
$app->get('/artist/user/logged', function(Request $request, Response $response){
	if (isset($_SESSION["userInfo"])) {
		$json = json_decode($_SESSION["userInfo"]);
		$id = $json[0]->id;
		$sql = "SELECT * FROM artists WHERE id_user = $id";

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

// Get Single artists-user
$app->get('/artist/user/{id}', function(Request $request, Response $response){
	$id_user = $request->getAttribute('id');
	$sql = "SELECT * FROM artists WHERE id_user = $id_user";

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

// Add Single artists
$app->post('/artist/add', function(Request $request, Response $response){
	$id_user = $request->getParam('id_user');
	$nombre_artista = $request->getParam('nombre_artista');
	$foto_perfil = $request->getParam('foto_perfil');
	$foto_portada = $request->getParam('foto_portada');
	$categoria = $request->getParam('categoria');
	$subcategoria = $request->getParam('subcategoria');
	$facebook = $request->getParam('facebook');
	$instagram = $request->getParam('instagram');
	$youtube = $request->getParam('youtube');
	$video = $request->getParam('video');
	$perfil = $request->getParam('perfil');
	$valor = $request->getParam('valor');
	$descuento = $request->getParam('descuento');
	$descservicio = $request->getParam('descservicio');
	$estado = 1;


	$sql = "INSERT INTO artists (id_user, nombre_artista, foto_perfil, foto_portada, categoria, subcategoria, facebook, instagram, youtube, video, perfil, valor, descuento, descservicio, estado) VALUES (:id_user,:nombre_artista, :foto_perfil, :foto_portada, :categoria,:subcategoria, :facebook, :instagram, :youtube, :video, :perfil, :valor, :descuento, :descservicio, :estado)";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->prepare($sql);
		$stmt->bindParam(':id_user',$id_user);
		$stmt->bindParam(':nombre_artista',$nombre_artista);
		$stmt->bindParam(':foto_perfil',$foto_perfil);
		$stmt->bindParam(':foto_portada',$foto_portada);
		$stmt->bindParam(':categoria',$categoria);
		$stmt->bindParam(':subcategoria',$subcategoria);
		$stmt->bindParam(':facebook',$facebook);
		$stmt->bindParam(':instagram',$instagram);
		$stmt->bindParam(':youtube',$youtube);
		$stmt->bindParam(':video',$video);
		$stmt->bindParam(':perfil',$perfil);
		$stmt->bindParam(':valor',$valor);
		$stmt->bindParam(':descuento',$descuento);
		$stmt->bindParam(':descservicio',$descservicio);
		$stmt->bindParam(':estado',$estado);

		$stmt->execute();
		$db = null;

		echo '{"notice":{"text":"Artist Added!"}, "status" : 200}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Update Single artists
$app->put('/artist/update/{id}', function(Request $request, Response $response){
	$id = $request->getAttribute('id');
	$nombre_artista = $request->getParam('nombre_artista');
	$foto_perfil = $request->getParam('foto_perfil');
	$foto_portada = $request->getParam('foto_portada');
	$categoria = $request->getParam('categoria');
	$subcategoria = $request->getParam('subcategoria');
	$facebook = $request->getParam('facebook');
	$instagram = $request->getParam('instagram');
	$youtube = $request->getParam('youtube');
	$video = $request->getParam('video');
	$perfil = $request->getParam('perfil');
	$valor = $request->getParam('valor');
	$descuento = $request->getParam('descuento');
	$descservicio = $request->getParam('descservicio');

	$update_string = '';

	if ($nombre_artista) $update_string = $update_string.'nombre_artista = :nombre_artista,';
	if ($foto_perfil) $update_string = $update_string.'foto_perfil = :foto_perfil,';
	if ($foto_portada) $update_string = $update_string.'foto_portada = :foto_portada,';
	if ($categoria) $update_string = $update_string.'categoria = :categoria,';
	if ($subcategoria) $update_string = $update_string.'subcategoria = :subcategoria,';
	if ($facebook) $update_string = $update_string.'facebook = :facebook,';
	if ($instagram) $update_string = $update_string.'instagram = :instagram,';
	if ($youtube) $update_string = $update_string.'youtube = :youtube,';
	if ($video) $update_string = $update_string.'video = :video,';
	if ($perfil) $update_string = $update_string.'perfil = :perfil,';
	if ($valor) $update_string = $update_string.'valor = :valor,';
	if ($descuento) $update_string = $update_string.'descuento = :descuento,';
	if ($descservicio) $update_string = $update_string.'descservicio = :descservicio,';

	$update_string = rtrim($update_string,',');

	$sql = "UPDATE artists SET ".$update_string." WHERE id = $id" ;

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->prepare($sql);

		if ($nombre_artista) $stmt->bindParam(':nombre_artista',$nombre_artista);
		if ($foto_perfil) $stmt->bindParam(':foto_perfil',$foto_perfil);
		if ($foto_portada) $stmt->bindParam(':foto_portada',$foto_portada);
		if ($categoria) $stmt->bindParam(':categoria',$categoria);
		if ($subcategoria) $stmt->bindParam(':subcategoria',$subcategoria);
		if ($facebook) $stmt->bindParam(':facebook',$facebook);
		if ($instagram) $stmt->bindParam(':instagram',$instagram);
		if ($youtube) $stmt->bindParam(':youtube',$youtube);
		if ($video) $stmt->bindParam(':video',$video);
		if ($perfil) $stmt->bindParam(':perfil',$perfil);
		if ($valor) $stmt->bindParam(':valor',$valor);
		if ($descuento) $stmt->bindParam(':descuento',$descuento);
		if ($descservicio) $stmt->bindParam(':descservicio',$descservicio);
		
		$stmt->execute();
		$db = null;

		echo '{"notice":{"text":"Artist Updated!"}, "status" : 200}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});

// Delete artist
$app->delete('/artist/delete/{id}', function(Request $request, Response $response){
	$id = $request->getAttribute('id');
	$sql = "DELETE FROM artists where id = $id";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt = $db->prepare($sql);
		$stmt->execute();
		$db = null;

		echo '{"notice":{"text":"Artist Deleted!"}, "status" : 200}';
	}catch(PDOException $e){
		echo '{"error":{"text":'.$e->getMessage().'}}';
	}
});