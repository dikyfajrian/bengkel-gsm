<?php
date_default_timezone_set('Asia/Jakarta');
// Database configuration
$host = 'localhost';
$dbname = 'bengkel_gsm';
$user = 'root';
$password = '';

// Establish a database connection
$mysqli = new mysqli($host, $user, $password, $dbname);

// Check the connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

?>