<?php
//This PHP file will return map zoom info for the selected Province as a JSON.
include_once 'connect.php';

if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('EST');
}

if (isset($_POST["State"]))
{
	$state = $_POST["State"];
}	

$address = array();

$sql = "SELECT Zoom,CAST(Lat AS FLOAT) AS lat,CAST(Long AS FLOAT) AS lng FROM States WHERE Abbr LIKE ?";
$params = array("%".$state."%");
$stmt = sqlsrv_query( $conn, $sql , $params);
$name = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC); 


header('Content-Type: application/json');
echo json_encode($name);
sqlsrv_free_stmt( $stmt);	
?>

