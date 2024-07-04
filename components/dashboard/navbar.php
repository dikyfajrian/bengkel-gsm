<div class="navbar no-outline" style="height: 85px; border-bottom: 1px solid #F0F0F0">
    <div class="navbar-bg bg-color-white"></div>
    <div class="navbar-inner" style="padding: 0px 30px">
        <div class="left">
            <h2 class="font-plusjkt-bold color1">Gunung Sari <b class="color2">Motor</b></h2>
        </div>
        <div class="title">
            <div class="grid grid-cols-4 grid-gap">
                <div style="margin-right: 10px">
                    <a href="index.php?page=dashboard"
                        class="external font-plusjkt-semi <?php echo (isset($_GET['page']) && $_GET['page'] == 'dashboard') ? 'nav-active' : 'nav-unactive'; ?>">Dashboard</a>
                </div>
                <div style="margin-right: 10px">
                    <a href="index.php?page=orders"
                        class="external font-plusjkt-semi <?php echo (isset($_GET['page']) && $_GET['page'] == 'orders') ? 'nav-active' : 'nav-unactive'; ?>">Daftar Transaksi</a>
                </div>
                <div style="margin-right: 10px">
                    <a href="index.php?page=products"
                        class="external font-plusjkt-semi <?php echo (isset($_GET['page']) && $_GET['page'] == 'products') ? 'nav-active' : 'nav-unactive'; ?>">Produk</a>
                </div>
                <div style="margin-left: -35px">
                    <a href="index.php?page=cashier"
                        class="external font-plusjkt-semi <?php echo (isset($_GET['page']) && $_GET['page'] == 'cashier') ? 'nav-active' : 'nav-unactive'; ?>">Kasir</a>
                </div>
            </div>
        </div>
        <div class="right">
            <a href="#" class="link popover-open" data-popover=".popover-dashboard">
                <img src="image/button/btn-pos.svg" width="180" alt="">
            </a>
        </div>
    </div>
</div>