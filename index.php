<!DOCTYPE html>
<html>

<head>
    <!-- Required meta tags-->
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!-- Color theme for statusbar (Android only) -->
    <meta name="theme-color" content="#345cb2">
    <!-- Your app title -->
    <title>Bengkel Gunung Sari Motor</title>
    <link rel="shortcut icon" href="image/icon.png" type="image/x-icon">
    <!-- Path to Framework7 Library Bundle CSS -->
    <link rel="stylesheet" href="css/framework7.css">
    <link rel="stylesheet" href="css/font-color.css">
    <link rel="stylesheet" href="css/default.css">
    <!-- Path to your custom app styles-->
    <link rel="stylesheet" href="css/page-<?php echo (isset($_GET['page'])) ? $_GET['page'] : 'welcome'; ?>.css">
</head>

<body>
    <!-- App root element -->
    <div id="app">
        <!-- Your main view, should have "view-main" class -->
        <div class="view view-main">
            <!-- Initial Page, "data-name" contains page name -->
            <div data-name="home" class="page">

                <div class="popover popover-dashboard">
                    <div class="popover-angle"></div>
                    <div class="popover-inner">
                        <div class="list">
                            <ul>
                                <li><a href="#" class="list-button popover-close font-plusjkt-semi color2">Laporan
                                        Usaha</a>
                                </li>
                                <li>
                                    <div class="divider"></div>
                                </li>
                                <li><a href="index.php?page=welcome"
                                        class="external list-button font-plusjkt-regular color-black">Keluar</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="popover popover-pos">
                    <div class="popover-angle"></div>
                    <div class="popover-inner">
                        <div class="list">
                            <ul>
                                <li><a href="#" class="list-button popover-close font-plusjkt-semi color2">Layanan
                                        Kasir</a>
                                </li>
                                <li>
                                    <div class="divider"></div>
                                </li>
                                <li><a href="#" class="list-button font-plusjkt-regular color-black keluar">Keluar</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <!-- Scrollable page content -->
                <div class="page-content">
                    <?php include "components/config.php"; // Load file config.php ?>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script src="js/jspdf.min.js"></script>
    <script src="js/pdf-table.js"></script>
    <!-- Path to Framework7 Library Bundle JS-->
    <script type="text/javascript" src="js/framework7.js"></script>
    <!-- Path to your app js-->
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/moment.js"></script>
    <script type="text/javascript" src="js/page-<?php echo (isset($_GET['page'])) ? $_GET['page'] : 'welcome'; ?>.js">
    </script>
</body>

</html>