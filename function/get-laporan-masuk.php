<?php
include 'connect.php';

// Fetch product data from the database
$result = $mysqli->query("SELECT * FROM laporan WHERE tipe = 'masuk' ORDER BY tgl_laporan DESC");

if ($result->num_rows > 0) {
    $products = array();

    while ($row = $result->fetch_assoc()) {
        $products[] = array(
            'id_products' => $row['id_laporan'],
            'file' => $row['file'],
            'tgl_laporan' => $row['tgl_laporan'] // You should replace this with your actual date field
        );
    }

    echo json_encode(['status' => 'success', 'products' => $products]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No report found']);
}

$mysqli->close();
?>