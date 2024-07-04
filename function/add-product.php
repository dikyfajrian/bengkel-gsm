<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validate input
    $prdname = isset($_POST['prdname']) ? $_POST['prdname'] : '';
    $prddesc = isset($_POST['prddesc']) ? $_POST['prddesc'] : '';
    $prdstock = isset($_POST['prdstock']) ? $_POST['prdstock'] : '';
    $prdbuy = isset($_POST['prdbuy']) ? $_POST['prdbuy'] : '';
    $prdprice = isset($_POST['prdprice']) ? $_POST['prdprice'] : '';

    if (empty($prdname) || empty($prddesc) || empty($prdstock) || empty($prdbuy) || empty($prdprice)) {
        echo json_encode(['status' => 'error', 'message' => 'Please complete the form']);
        exit;
    }

    // Insert into the database
    $created_date = date('Y-m-d'); // Current date
    $stmt = $mysqli->prepare("INSERT INTO products (name, description, stock, buy, price, created_date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssidss", $prdname, $prddesc, $prdstock, $prdbuy, $prdprice, $created_date);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Product added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error adding product']);
    }

    $stmt->close();
} else {
    // Handle non-POST requests
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>