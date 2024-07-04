<?php
// Include the database connection file (connect.php)
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_cashier = $_POST['id_cashier'];
    $tanggal = date("Y-m-d"); // Set the date to the current date
    $income = $_POST['income'];
    $working_hours = $_POST['working_hours'];

    $stmt = $mysqli->prepare("INSERT INTO report_cashier (id_cashier, tanggal, income, working_hours) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $id_cashier, $tanggal, $income, $working_hours);

    if ($stmt->execute()) {
        $response = array('status' => 'success', 'message' => 'Data inserted successfully');
        echo json_encode($response);
    } else {
        $response = array('status' => 'error', 'message' => 'Error inserting data');
        echo json_encode($response);
    }

    $stmt->close();
} else {
    $response = array('status' => 'error', 'message' => 'Invalid request method');
    echo json_encode($response);
}

$mysqli->close();
?>