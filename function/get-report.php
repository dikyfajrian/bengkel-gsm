<?php
include 'connect.php';

// Fetch product data from the database
$result = $mysqli->query("SELECT cashier.*, report_cashier.* FROM report_cashier  JOIN cashier ON report_cashier.id_cashier = cashier.id_cashier ORDER BY report_cashier.tanggal DESC");

if ($result->num_rows > 0) {
    $products = array();

    while ($row = $result->fetch_assoc()) {
        $products[] = array(
            'id_report' => $row['id_report'],
            'nama' => $row['nama'],
            'tanggal' => $row['tanggal'],
            'income' => $row['income'],
            'working_hours' => $row['working_hours'],
        );
    }

    echo json_encode(['status' => 'success', 'report' => $products]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No report found']);
}

$mysqli->close();
?>