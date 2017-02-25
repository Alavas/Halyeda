<?php
//This PHP file will return the address of the state capital from the selected State as a JSON.
include_once 'connect.php';

if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('EST');
}

if (isset($_GET["State"]))
{
	$state = $_GET["State"];
}
if ($state == "All") {
	$state = "";
} 


$locationID = array();
$address = array();

$sql = "SELECT CapitolID FROM Capitols WHERE State LIKE ?";
$params = array("%".$state."%");
$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
$stmt = sqlsrv_query( $conn, $sql , $params, $options );

while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_NUMERIC)){ 
	$locationID[] = $row;
}
	
foreach($locationID as $row){
	$sql = "SELECT c.City,s.Name AS State,CAST(c.Pop AS VARCHAR) AS Pop,CAST(c.Lat AS FLOAT) AS lat,CAST(c.Long AS FLOAT) AS lng FROM Capitols AS c INNER JOIN States AS s ON c.State = s.Abbr WHERE c.CapitolID = (?)";
	//$sql = "SELECT CAST(Pop AS VARCHAR) AS Population,CAST(Lat AS FLOAT) AS lat,CAST(Long AS FLOAT) AS lng FROM Capitols WHERE CapitolID = (?)";
	$params = array($row);
	$stmt = sqlsrv_query( $conn, $sql, $params);
	$name = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC); 
	$address[] = $name;
}
header('Content-Type: application/json');
echo json_encode($address);
sqlsrv_free_stmt( $stmt);	
?>


