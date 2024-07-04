<?php
// Include the database connection file (connect.php)
include 'connect.php';

// Prepare and execute the SQL query to fetch all orders data
$result = $mysqli->query("SELECT * FROM orders ORDER BY id_order ASC");

// Check if there are any rows in the result set
if ($result->num_rows > 0) {
    // Loop through each row and fetch data
    $orders = array();
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    // Return the orders data as JSON response
    $response = array('status' => 'success', 'orders' => $orders);
    echo json_encode($response);
} else {
    // No orders found
    $response = array('status' => 'success', 'orders' => array());
    echo json_encode($response);
}

// Close the database connection
$mysqli->close();
?>