<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Fetch total number of products from the database
    $result = $mysqli->query("SELECT COUNT(*) AS totalProducts FROM products");

    if ($result) {
        $row = $result->fetch_assoc();
        $totalProducts = $row['totalProducts'];
        echo json_encode(['status' => 'success', 'totalProducts' => $totalProducts]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error retrieving total products']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>