<?php
//This PHP file will return the address of the State capital from the selected State as a JSON.
include_once 'connect.php';

if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('EST');
}

/* Confirm that a variable has been sent. */
if (isset($_GET["State"]))
{
	$state = $_GET["State"];
}
/* Doing a WHERE LIKE of a blank will return all values. */
if ($state == "All") {
	$state = "";
}

/* Create arrays to be used for data storage. */
$stateID = array();
$address = array();

$sql = "SELECT CapitolID FROM Capitols WHERE State LIKE ?";
$params = array("%".$state."%");
$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
$stmt = sqlsrv_query( $conn, $sql , $params, $options );

while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_NUMERIC)){
	$stateID[] = $row;
}

foreach($stateID as $row){
	$sql = "SELECT c.City,s.Name AS State,CAST(c.Pop AS VARCHAR) AS Pop,CAST(c.Lat AS FLOAT) AS lat,CAST(c.Long AS FLOAT) AS lng FROM Capitols AS c INNER JOIN States AS s ON c.State = s.Abbr WHERE c.CapitolID = (?)";
	$params = array($row);
	$stmt = sqlsrv_query( $conn, $sql, $params);
	$addr = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC);
	$address[] = $addr;
}

/* Return values as JSON data to be process by an AJAX call. */
header('Content-Type: application/json');
echo json_encode($address);
sqlsrv_free_stmt( $stmt);
?>
