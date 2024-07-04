<?php 
// Include the database connection file (connect.php)
include 'connect.php';

// Prepare and execute the SQL query to fetch and count total orders
$result = $mysqli->query("SELECT COUNT(*) AS total_orders FROM orders");
$row = $result->fetch_assoc();

// Get the total orders count
$totalOrders = $row['total_orders'];

// Return the total orders count as JSON response
$response = array('status' => 'success', 'totalOrders' => $totalOrders);
echo json_encode($response);

// Close the database connection
$mysqli->close();
?>