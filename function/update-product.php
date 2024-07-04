<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $prdname = isset($_POST['prdname']) ? $_POST['prdname'] : '';
    $prddesc = isset($_POST['prddesc']) ? $_POST['prddesc'] : '';
    $prdstock = isset($_POST['prdstock']) ? $_POST['prdstock'] : '';
    $prdprice = isset($_POST['prdprice']) ? $_POST['prdprice'] : '';

    // Validate input
    if (empty($id) || empty($prdname) || empty($prddesc) || empty($prdstock) || empty($prdprice)) {
        echo json_encode(['status' => 'error', 'message' => 'Please complete the form']);
        exit;
    }

    // Validate price
    if (!is_numeric($prdprice)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid product price. Please enter a numeric value.']);
        exit;
    }

    // Validate stock
    if (!is_numeric($prdstock) || (int)$prdstock < 1) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid product stock. Minimum stock is 1.']);
        exit;
    }

    // Update the product in the database
    $stmt = $mysqli->prepare("UPDATE products SET name = ?, description = ?, stock = ?, price = ? WHERE id_products = ?");
    $stmt->bind_param("ssidi", $prdname, $prddesc, $prdstock, $prdprice, $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Product updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error updating product']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>