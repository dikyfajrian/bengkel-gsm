<?php
date_default_timezone_set('Asia/Jakarta');
$page = (isset($_GET['page'])) ? $_GET['page'] : '';

switch($page){
  case 'welcome': // $page == welcome (jika isi dari $page adalah welcome)
  include "views/welcome.php"; // load file welcome.php yang ada di folder views
  break;
  
  case 'dashboard': // $page == dashboard (jika isi dari $page adalah dashboard)
  include "views/dashboard.php"; // load file dashboard.php yang ada di folder views
  break;

  case 'orders': // $page == orders (jika isi dari $page adalah orders)
  include "views/orders.php"; // load file orders.php yang ada di folder views
  break;

  case 'products': // $page == products (jika isi dari $page adalah products)
  include "views/product.php"; // load file products.php yang ada di folder views
  break;

  case 'cashier': // $page == cashier (jika isi dari $page adalah cashier)
  include "views/cashier.php"; // load file cashier.php yang ada di folder views
  break;
  
  case 'pos': // $page == pos (jika isi dari $page adalah pos)
  include "views/pos.php"; // load file pos.php yang ada di folder views
  break;

  default: // Ini untuk set default jika isi dari $page tidak ada pada kondisi diatas
  include "views/welcome.php";
}
?>