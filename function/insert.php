<?php
// Include the database connection file (connect.php)
include 'connect.php';

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Extract the data from the POST request
    $id_cashier = $_POST['id_cashier'];
    $items = $_POST['items'];
    $discount = $_POST['discount'];
    $quantity = $_POST['quantity'];
    $jasa_price = $_POST['jasa_pemasangan'];
    $catatan = $_POST['catatan'];
    $total_price = $_POST['total_price'];
    $created_date = date("Y-m-d"); // Get today's date

    // Prepare and execute the SQL query to insert data into the "orders" table
    $stmt = $mysqli->prepare("INSERT INTO orders (id_cashier, items, discount, quantity, jasa_pemasangan, catatan, total_price, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $id_cashier, $items, $discount, $quantity, $jasa_price, $catatan, $total_price, $created_date);

    if ($stmt->execute()) {
        // Insert successful
        $insertedId = $mysqli->insert_id;  // Get the ID of the last inserted record
        $response = array('status' => 'success', 'message' => 'Order placed successfully', 'id_order' => $insertedId);
        echo json_encode($response);
    } else {
        // Insert failed
        $response = array('status' => 'error', 'message' => 'Error placing order');
        echo json_encode($response);
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // If the request is not a POST request, return an error response
    $response = array('status' => 'error', 'message' => 'Invalid request method');
    echo json_encode($response);
}

// Close the database connection
$mysqli->close();
?>