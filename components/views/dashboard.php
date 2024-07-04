<?php include("components/dashboard/navbar.php");
?>

<div style="margin-top: 50px; margin-bottom: 80px;">
    <center>
        <h3 class="font-inter-regular" style="color: #666666">Selamat Datang 👋🏻</h3>
        <h1 class="color1 font-plusjkt-bold" style="margin-top: -10px">Admin GSM</h1>

        <div class="list custom-cal">
            <ul>
                <li>
                    <div class="item-content item-input">
                        <div class="item-inner">
                            <div class="item-input-wrap">
                                <input type="text" style="text-align: center;" placeholder="Ubah tanggal"
                                    readonly="readonly" id="myCalendar" />
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <h3 class="font-plusjkt-medium color-alt1" id="date"></h3>
        <p class="font-inter-regular" style="color: #666666; margin-top: -8px">Lihat laporan pendapatan, transaksi dan
            produk kamu</p>

        <?php include("components/dashboard/overview.php"); ?>
        <?php include("components/dashboard/analytics.php"); ?>

    </center>

</div>
<script src="js/chart.js"></script>