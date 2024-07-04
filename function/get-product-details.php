<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id = isset($_GET['id']) ? $_GET['id'] : '';

    // Validate input
    if (empty($id)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request. Missing product id.']);
        exit;
    }

    // Fetch product details from the database
    $stmt = $mysqli->prepare("SELECT id_products, name, description, stock, price FROM products WHERE id_products = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $product = $result->fetch_assoc();

        echo json_encode(['status' => 'success', 'product' => $product]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error retrieving product details.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>