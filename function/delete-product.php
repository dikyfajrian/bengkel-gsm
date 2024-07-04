<?php
include 'connect.php';

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // Invalid request method
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit();
}

// Get the product ID from the AJAX request
$product_id = isset($_POST['id']) ? $_POST['id'] : null;

// Check if product_id is not provided or is not a number
if (!isset($product_id) || !is_numeric($product_id)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid product ID']);
    exit();
}

// Perform the deletion query
$query = "DELETE FROM products WHERE id_products = $product_id";

if ($mysqli->query($query) === TRUE) {
    echo json_encode(['status' => 'success', 'message' => 'Product deleted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error deleting product: ' . $mysqli->error]);
}

// Close the database connection
$mysqli->close();
?>