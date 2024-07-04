<?php
require_once 'connect.php';

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Extract the data from the POST request
    // Get post data
    $items = json_decode($_POST['items'], true);

    $response = array();

    foreach ($items as $item) {
        $prd_id = $item['prd_id'];
        $prd_quantity = $item['prd_quantity'];

        $stmt = $mysqli->prepare("UPDATE products SET stock = stock - ? WHERE id_products = ?");
        $stmt->bind_param("ii", $prd_quantity, $prd_id);

        if ($stmt->execute()) {
            // Insert successful
            $response = array('status' => 'success', 'message' => 'Order placed successfully');
            echo json_encode($response);
        } else {
            // Insert failed
            $response = array('status' => 'error', 'message' => 'Error placing order');
            echo json_encode($response);
        }

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


// Iterate through items and update stock in products table
// foreach ($items as $item) {
//     $prd_id = $item['prd_id'];
//     $prd_quantity = $item['prd_quantity'];

//     // Update stock in products table
//     $stmt = $mysqli->prepare("UPDATE products SET stock = stock - ? WHERE id_products = ?");
//     $stmt->bind_param("ii", $prd_quantity, $prd_id);
//     $stmt->execute();

//     // Check for errors
//     if ($stmt->error) {
//         echo 'Error updating stock: ' . $stmt->error;
//         exit();
//     }
// }

// echo 'Stock updated successfully';

// // Close statement and connection
// $stmt->close();
// $mysqli->close();
?>