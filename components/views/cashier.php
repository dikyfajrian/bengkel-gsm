<?php include("components/dashboard/navbar.php");
?>

<div style="margin-top: 50px; margin-bottom: 80px;">
    <center>
        <h1 class="color1 font-plusjkt-bold">Halaman Kasir</h1>
        <h3 class="font-inter-regular" style="color: #666666; margin-top: -10px">lihat daftar dan kinerja kasir yang ada
        </h3>

        <div class="toolbar toolbar-bottom tabbar no-outline"
            style="width: 400px; border-radius: 100px; margin-top: 30px">
            <div class="toolbar-inner">
                <a href="#tab-1" class="tab-link tab-link-active font-plusjkt-medium">Daftar</a>
                <a href="#tab-2" class="tab-link font-plusjkt-medium">Kinerja</a>
            </div>
        </div>

        <!-- Top Tabs -->
        <div class="tabs-animated-wrap">
            <div class="tabs tabs-top">
                <div id="tab-1" class="page-content tab tab-active">
                    <div class="bg-cashier">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="padding: 20px 40px">
                                <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Total
                                    Kasir</h3>
                                <p style="margin-top: -10px; font-size: 12px; color: #666666"
                                    class="font-plusjkt-regular"><b class="tproduct"></b>
                                    orang
                                </p>
                            </div>
                            <a href="#" style="margin: 32px 30px; width: 150px; height: 20px; padding: 9px"
                                class="btn-addprd font-plusjkt-semi btn-popup-add">Tambah Kasir</a>
                        </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="font-plusjkt-semi">#</th>
                                        <th class="font-plusjkt-semi">Nama</th>
                                        <th class="font-plusjkt-semi">Tanggal Dibuat</th>
                                        <th class="font-plusjkt-semi">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="listCashier">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="tab-2" class="page-content tab">
                    <div class="bg-cashier">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="padding: 20px 40px">
                                <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Total
                                    Laporan</h3>
                                <p style="margin-top: -10px; font-size: 12px; color: #666666"
                                    class="font-plusjkt-regular"><b class="trx"></b>
                                    transaksi
                                </p>
                            </div>
                        </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="font-plusjkt-semi">#</th>
                                        <th class="font-plusjkt-semi">Nama Kasir</th>
                                        <th class="font-plusjkt-semi">Tanggal</th>
                                        <th class="font-plusjkt-semi">Total Jam Kerja</th>
                                        <th class="font-plusjkt-semi">Total Pendapatan</th>
                                    </tr>
                                </thead>
                                <tbody id="listReport">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </center>
</div>