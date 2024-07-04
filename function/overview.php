<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        case 'process_date_range':
            if (isset($_POST['start_date']) && isset($_POST['end_date'])) {
                $start_date = $_POST['start_date'];
                $end_date = $_POST['end_date'];

                // Get total revenue for the date range
                $stmt = $mysqli->prepare("SELECT SUM(total_price) AS totalRevenue FROM orders WHERE created BETWEEN ? AND ?");
                $stmt->bind_param("ss", $start_date, $end_date);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $totalRevenue = $row['totalRevenue'];

                // Count total orders for the date range
                $stmt = $mysqli->prepare("SELECT COUNT(*) AS totalOrders FROM orders WHERE created BETWEEN ? AND ?");
                $stmt->bind_param("ss", $start_date, $end_date);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $totalOrders = $row['totalOrders'];

                // Count total product
                $stmt = $mysqli->prepare("SELECT COUNT(*) AS totalProducts FROM products");
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $totalProducts = $row['totalProducts'];

                  // Fetch data from the database and calculate sums
                $stmt = $mysqli->prepare("SELECT DAY(created) AS day, SUM(quantity) AS totalQuantity, SUM(total_price) AS totalIncome FROM orders WHERE created BETWEEN ? AND ? GROUP BY DAY(created)");
                $stmt->bind_param("ss", $start_date, $end_date);
                $stmt->execute();
                $result = $stmt->get_result();

                $labels = [];
                $ordersData = [];
                $incomeData = [];

                while ($row = $result->fetch_assoc()) {
                    $labels[] = $row['day'];
                    $ordersData[] = $row['totalQuantity'];
                    $incomeData[] = $row['totalIncome'];
                }

                // You can add more similar queries for other requirements if needed

                $response = array(
                    'status' => 'success',
                    'totalRevenue' => $totalRevenue,
                    'totalOrders' => $totalOrders,
                    'totalProducts' => $totalProducts,
                    'labels' => $labels,
                    'ordersData' => $ordersData,
                    'incomeData' => $incomeData,
                );
                echo json_encode($response);
            } else {
                $response = array('status' => 'error', 'message' => 'Missing start_date or end_date');
                echo json_encode($response);
            }
            break;

        case 'process_single_date':
            if (isset($_POST['single_date'])) {
                $single_date = $_POST['single_date'];

                // Get total revenue for the single date
                $stmt = $mysqli->prepare("SELECT SUM(total_price) AS totalRevenue FROM orders WHERE created = ?");
                $stmt->bind_param("s", $single_date);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $totalRevenue = $row['totalRevenue'];

                // Count total orders for the single date
                $stmt = $mysqli->prepare("SELECT COUNT(*) AS totalOrders FROM orders WHERE created = ?");
                $stmt->bind_param("s", $single_date);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $totalOrders = $row['totalOrders'];

                // Count total product
                $stmt = $mysqli->prepare("SELECT COUNT(*) AS totalProducts FROM products");
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $totalProducts = $row['totalProducts'];

                // Fetch data from the database and calculate sums for the single date
                $stmt = $mysqli->prepare("SELECT DAY(created) AS day, SUM(quantity) AS totalQuantity, SUM(total_price) AS totalIncome FROM orders WHERE created = ? GROUP BY DAY(created)");
                $stmt->bind_param("s", $single_date);
                $stmt->execute();
                $result = $stmt->get_result();

                $labels = [];
                $ordersData = [];
                $incomeData = [];

                while ($row = $result->fetch_assoc()) {
                    $labels[] = $row['day'];
                    $ordersData[] = $row['totalQuantity'];
                    $incomeData[] = $row['totalIncome'];
                }
                

                // You can add more similar queries for other requirements if needed

                $response = array(
                    'status' => 'success',
                    'totalRevenue' => $totalRevenue,
                    'totalOrders' => $totalOrders,
                    'totalProducts' => $totalProducts,
                    'labels' => $labels,
                    'ordersData' => $ordersData,
                    'incomeData' => $incomeData,
                );
                echo json_encode($response);
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