<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        case 'process_date_range':
            if (isset($_POST['start_date']) && isset($_POST['end_date'])) {
                $start_date = $_POST['start_date'];
                $end_date = $_POST['end_date'];

                 // Prepare and execute the SQL query to fetch all orders data
                $result = $mysqli->query("SELECT cashier.*, orders.* FROM orders JOIN cashier ON orders.id_cashier = cashier.id_cashier WHERE orders.created BETWEEN '$start_date' AND '$end_date' ORDER BY orders.id_order ASC");

                // Check if there are any rows in the result set
                if ($result->num_rows > 0) {
                    // Loop through each row and fetch data
                    $orders = array();
                    while ($row = $result->fetch_assoc()) {
                        $orders[] = $row;
                    }

                    // Return the orders data as JSON response
                    $response = array('status' => 'success', 'orders' => $orders);
                    echo json_encode($response);
                } else {
                    // No orders found
                    $response = array('status' => 'success', 'orders' => array());
                    echo json_encode($response);
                }
            } else {
                $response = array('status' => 'error', 'message' => 'Missing start_date or end_date');
                echo json_encode($response);
            }
            break;

        case 'process_single_date':
            if (isset($_POST['single_date'])) {
                $single_date = $_POST['single_date'];
                // Prepare and execute the SQL query to fetch all orders data
                $result = $mysqli->query("SELECT cashier.*, orders.* FROM orders JOIN cashier ON orders.id_cashier = cashier.id_cashier WHERE orders.created = '$single_date' ORDER BY orders.id_order ASC");

                // Check if there are any rows in the result set
                if ($result->num_rows > 0) {
                    // Loop through each row and fetch data
                    $orders = array();
                    while ($row = $result->fetch_assoc()) {
                        $orders[] = $row;
                    }

                    // Return the orders data as JSON response
                    $response = array('status' => 'success', 'orders' => $orders);
                    echo json_encode($response);
                } else {
                    // No orders found
                    $response = array('status' => 'success', 'orders' => array());
                    echo json_encode($response);
                }
            } else {
                $response = array('status' => 'error', 'message' => 'Missing single_date');
                echo json_encode($response);
            }
            break;

        default:
            $response = array('status' => 'error', 'message' => 'Invalid action');
            echo json_encode($response);
    }
} else {
    $response = array('status' => 'error', 'message' => 'Invalid request method or action not set');
    echo json_encode($response);
}

$mysqli->close();
?>