<?php
include 'connect.php';

// Fetch product data from the database
$result = $mysqli->query("SELECT * FROM cashier");

if ($result->num_rows > 0) {
    $products = array();

    while ($row = $result->fetch_assoc()) {
        $products[] = array(
            'id_cashier' => $row['id_cashier'],
            'nama' => $row['nama'],
            'created' => $row['created'] // You should replace this with your actual date field
        );
    }

    echo json_encode(['status' => 'success', 'cashier' => $products]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No cashier found']);
}

$mysqli->close();
?>