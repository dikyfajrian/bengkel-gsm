<?php
// Include the database connection file (connect.php)
include 'connect.php';

// Prepare and execute the SQL query to calculate total revenue
$result = $mysqli->query("SELECT SUM(total_price) AS total_revenue FROM orders");
$row = $result->fetch_assoc();

// Get the total revenue
$totalRevenue = $row['total_revenue'];

// Return the total revenue as JSON response
$response = array('status' => 'success', 'totalRevenue' => $totalRevenue);
echo json_encode($response);

// Close the database connection
$mysqli->close();
?>