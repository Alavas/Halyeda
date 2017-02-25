<?php
//This PHP file will return the address of the state capital from the selected State as a JSON.
include_once 'connectData.php';

if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('EST');
}

if (isset($_POST["Hours"]))
{
	$hours = $_POST["Hours"];
	$hoursP = $_POST["HoursP"];
}

$locationID = array();
$time = array();
$data = array();

$sql = "SELECT TimeStamp,CAST(Light AS INT) AS Light, CAST(Temp AS FLOAT) AS Temp FROM LightLog WHERE DATEDIFF(DAY,[TimeStamp],GETDATE()) < ? AND ( TimeStamp < ?) ORDER BY TimeStamp DESC;";
$params = array($hours, $hoursP);
$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
$stmt = sqlsrv_query( $conn, $sql , $params, $options );

while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC)){ 
	$data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
sqlsrv_free_stmt( $stmt);	
?>
