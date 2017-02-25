<?php
//This PHP file will post a new line of data into the SQL database.
include_once 'connectData.php';

if (isset($_POST["Light"]))
{
	$light = $_POST["Light"];
	$temp = $_POST["Temp"];
} 

$sql = "INSERT INTO LightLog (DataID,TimeStamp,Light,Temp) VALUES (NEWID(),GETDATE(),?,?)";
$params = array($light,$temp);

$stmt = sqlsrv_query( $conn, $sql, $params);

sqlsrv_free_stmt($stmt);	
?>
