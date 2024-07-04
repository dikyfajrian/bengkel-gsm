<?php
// Connect to the database
require_once 'connect.php';

if(isset($_FILES["pdfFile"])) {

    $clientFileName = "barang-masuk.pdf"; // File name provided from client-side

    // Extract file extension
    $fileExtension = pathinfo($_FILES["pdfFile"]["name"], PATHINFO_EXTENSION);

    // Generate a unique rounded number
    $uniqueNumber = round(microtime(true));

    // Construct new file name with client file name, unique number, and file extension
    $newFileName = pathinfo($clientFileName, PATHINFO_FILENAME) . "-" . $uniqueNumber . "." . $fileExtension;

    $targetFile = "../laporan/" . $newFileName;
    
    if (move_uploaded_file($_FILES["pdfFile"]["tmp_name"], $targetFile)) {
        $fileUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/bengkel-gsm/laporan/' . $newFileName; // Constructing the URL path of the uploaded file
        
        $todayDateTime = date('Y-m-d H:i:s');
        $query = "INSERT INTO laporan (file, tipe, tgl_laporan) VALUES ('$newFileName', 'masuk', '$todayDateTime')";
        if ($mysqli->query($query) === TRUE) {
            echo $fileUrl; // Respond with the URL path
        } else {
            echo "Error inserting data into database: " . $mysqli->error;
        }
    } else {
        echo "Error uploading PDF file.";
    }
} else {
    echo "No PDF file received.";
}

// Close database connection
$mysqli->close();
?>