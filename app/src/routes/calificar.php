<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Insert User
$app->post('/calificar/{id_artista}/{id_calificador}', function(Request $request, Response $response){
	$id_artista = $request->getAttribute('id_artista');
	$id_calificador = $request->getAttribute('id_calificador');
	$comentario = $request->getParam('comentario');
	$originalidad = $request->getParam('originalidad');
	$contenido = $request->getParam('contenido');
	$propuesta = $request->getParam('propuesta');
	$imagen = $request->getParam('imagen');
	$calidad = $request->getParam('calidad');
	// $fecha = date('d-m-Y', time());
	$fecha = "10/10/10";
	$estado = 1;
	
	$sql_disable = "UPDATE calificaciones SET estado = 0 WHERE id_artista = id_artista AND id_calificador = $id_calificador";

	$sql = "INSERT INTO calificaciones (id_artista, id_calificador, originalidad, contenido, propuesta, imagen, calidad, comentario, fecha, estado) VALUES (:id_artista, :id_calificador, :originalidad, :contenido, :propuesta, :imagen, :calidad, :comentario, :fecha, :estado)";

	try{
		// Get db Obj
		$db = new db();
		// Connect
		$db = $db->connect();

		$stmt_disable = $db->prepare($sql_disable);
		$stmt_disable->execute();

		$stmt = $db->prepare($sql);
		$stmt->bindParam(':id_artista',$id_artista);
		$stmt->bindParam(':id_calificador',$id_calificador);
		$stmt->bindParam(':originalidad',$originalidad);
		$stmt->bindParam(':contenido',$contenido);
		$stmt->bindParam(':propuesta',$propuesta);
		$stmt->bindParam(':imagen',$imagen);
		$stmt->bindParam(':calidad',$calidad);
		$stmt->bindParam(':comentario',$comentario);
		$stmt->bindParam(':fecha',$fecha);
		$stmt->bindParam(':estado',$estado);

		$stmt->execute();
		$db = null;

		$sql = "SELECT id_artista, avg(originalidad+contenido+propuesta+imagen+calidad)/5 as promedio FROM `calificaciones` WHERE id_artista = $id_artista and estado = 1";

		$db = new db();
		$db = $db->connect();

		$stmt = $db->query($sql);
		$calificaciones = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		$score = $calificaciones[0]->promedio;
		
		echo '{"notice":{"text":"Calification Added!"}, "status" : 200,"score":'.$score.'}';
	}catch(PDOException $e){
		echo '{"error2":{"text":'.$e->getMessage().'}}';
	}

});