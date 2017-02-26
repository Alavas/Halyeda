<?php
/* This PHP file will post a new line of data into the SQL database. */
include_once 'connectData.php';

if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('EST');
}

if (isset($_POST["Light"]))
{
	$light = $_POST["Light"];
	$temp = $_POST["Temp"];
}

/* DataID is a uniqueidentifier, TimeStamp is the current time, Light is the raw light value
from the Electric Imp, and Temp is the temperature value provided by the Electric Imp that was parsed
from the Wundergroud API. */
$sql = "INSERT INTO LightLog (DataID,TimeStamp,Light,Temp) VALUES (NEWID(),GETDATE(),?,?)";
/* Array to hold the variables. */
$params = array($light,$temp);

$stmt = sqlsrv_query( $conn, $sql, $params);
sqlsrv_free_stmt($stmt);
?>
