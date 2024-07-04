<?php
require_once 'function/connect.php';
function convertToRupiah($angka) {
    $rupiah = "";
    $angkarev = strrev($angka);
    for ($i = 0; $i < strlen($angkarev); $i++)
        if ($i % 3 == 0) $rupiah .= substr($angkarev, $i, 3) . ".";
    return "Rp " . strrev(substr($rupiah, 0, strlen($rupiah) - 1));
}
// Get order ID from the URL parameter
$id_order = isset($_GET['id_order']) ? $_GET['id_order'] : null;

// Retrieve order details from the database
$stmt = $mysqli->prepare("SELECT * FROM orders WHERE id_order = ?");
$stmt->bind_param("i", $id_order);
$stmt->execute();
$result = $stmt->get_result();
$order = $result->fetch_assoc();

// Check if the order exists
if (!$order) {
    die('Order not found');
}

// Calculate subtotal
$subtotal = 0;
foreach (json_decode($order['items'], true) as $item) {
    $subtotal += $item['prd_quantity'] * $item['prd_price'];
}

// Calculate discount in Rupiah
$discountRupiah = $subtotal * ($order['discount'] / 100);

// Close the database connection
$stmt->close();
$mysqli->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt</title>
    <link rel="stylesheet" href="css/font-color.css">
    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }

    h1 {
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    </style>
</head>

<body>

    <center>
        <h1>Gunung Sari Motor</h1>
        <h3>Struk Transaksi #<?php echo $order['id_order']; ?></h3>
        <p>Total Item: <?php echo $order['quantity']; ?></p>
    </center>

    <table>
        <thead>
            <tr>
                <th>Nama Produk</th>
                <th>Jumlah</th>
                <th>Harga</th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach (json_decode($order['items'], true) as $item):
            ?>
            <tr>
                <td><?php echo $item['prd_name']; ?></td>
                <td><?php echo $item['prd_quantity']; ?></td>
                <td><?php echo convertToRupiah($item['prd_price']); ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <p>Subtotal: <?php echo convertToRupiah($subtotal); ?></p>
    <p>Jasa Pemasangan: <?php echo convertToRupiah($order['jasa_pemasangan']); ?></p>
    <p>Catatan: <?php echo $order['catatan']; ?></p>
    <p>Diskon: <?php echo convertToRupiah($discountRupiah); ?> (<?php echo $order['discount']; ?>%)</p>
    <p>Total Harga (Termasuk PPN10%): <?php echo convertToRupiah($order['total_price']); ?></p>

    <!-- You can add more details or customize the receipt layout as needed -->
    <script type="text/javascript" src="js/jquery.min.js"></script>
</body>

</html>