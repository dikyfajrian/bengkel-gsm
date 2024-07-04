<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validate input
    $prdname = isset($_POST['cashier_name']) ? $_POST['cashier_name'] : '';

    if (empty($prdname)) {
        echo json_encode(['status' => 'error', 'message' => 'Please complete the form']);
        exit;
    }

    // Insert into the database
    $created_date = date('Y-m-d'); // Current date
    $stmt = $mysqli->prepare("INSERT INTO cashier (nama, created) VALUES (?, ?)");
    $stmt->bind_param("ss", $prdname, $created_date);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Cashier added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error adding cashier']);
    }

    $stmt->close();
} else {
    // Handle non-POST requests
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>