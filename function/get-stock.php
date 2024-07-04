<?php
include 'connect.php';

// Fetch product data from the database
$result = $mysqli->query("SELECT * FROM products WHERE stock = 0");

if ($result->num_rows > 0) {
    $products = array();

    while ($row = $result->fetch_assoc()) {
        $products[] = array(
            'id_products' => $row['id_products'],
            'name' => $row['name'],
            'description' => $row['description'],
            'stock' => $row['stock'],
            'price' => $row['price'],
            'date_added' => $row['created_date'] // You should replace this with your actual date field
        );
    }

    echo json_encode(['status' => 'success', 'products' => $products]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No products found']);
}

$mysqli->close();
?>