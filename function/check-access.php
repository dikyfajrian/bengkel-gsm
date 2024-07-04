<?php
// Include the database connection
include('connect.php');

// Get the access code from the AJAX request
$code = $_POST['code'];
$type = $_POST['type'];

// Sanitize the input to prevent SQL injection
$code = $mysqli->real_escape_string($code);

// Query to check if the access code exists in the database
$query = "SELECT * FROM access_code WHERE code = '$code' AND type = '$type'";
$result = $mysqli->query($query);

if ($result->num_rows > 0) {
    // Access code is correct
    echo "Success!"; // You can customize the success message as needed
} else {
    // Access code is incorrect
    echo "Error: Access code is incorrect";
}

// Close the database connection
$mysqli->close();
?>