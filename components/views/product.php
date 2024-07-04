<?php include("components/dashboard/navbar.php"); ?>
<div style="margin-top: 50px; margin-bottom: 80px;">
    <center>
        <h1 class="color1 font-plusjkt-bold">Produk</h1>
        <h3 class="font-inter-regular" style="color: #666666; margin-top: -10px">lihat daftar produk, pembelian produk
            dan
            produk masuk
        </h3>

        <div class="toolbar toolbar-bottom tabbar no-outline"
            style="width: 680px; border-radius: 100px; margin-top: 30px">
            <div class="toolbar-inner">
                <a href="#tab-1" class="tab-link tab-link-active font-plusjkt-medium">Daftar Produk</a>
                <a href="#tab-2" class="tab-link font-plusjkt-medium">Pembelian Produk</a>
                <a href="#tab-3" class="tab-link font-plusjkt-medium">Produk Masuk</a>
            </div>
        </div>

        <div class="tabs-animated-wrap">
            <div class="tabs tabs-top">
                <div id="tab-1" class="page-content tab tab-active">
                    <div class="bg-order" style="margin-top: 0px">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="padding: 20px 40px">
                                <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Total
                                    Produk</h3>
                                <p style="margin-top: -10px; font-size: 12px; color: #666666"
                                    class="font-plusjkt-regular"><b class="tproduct"></b>
                                    item
                                </p>
                            </div>
                            <a href="#" style="margin: 32px 30px; width: 150px; height: 20px; padding: 9px"
                                class="btn-addprd font-plusjkt-semi btn-popup-add">Tambah Produk</a>
                        </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="font-plusjkt-semi">#</th>
                                        <th class="font-plusjkt-semi">Nama</th>
                                        <th class="font-plusjkt-semi">Stok Produk</th>
                                        <th class="font-plusjkt-semi">Harga Beli</th>
                                        <th class="font-plusjkt-semi">Harga Jual</th>
                                        <th class="font-plusjkt-semi">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="listProduct">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="tab-2" class="page-content tab">
                    <div class="bg-order" style="margin-top: 0px">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="padding: 20px 40px">
                                <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Total
                                    Data</h3>
                                <p style="margin-top: -10px; font-size: 12px; color: #666666"
                                    class="font-plusjkt-regular"><b class="treport"></b>
                                    item
                                </p>
                            </div>

                            <a href="#" style="margin: 32px 30px; width: 150px; height: 20px; padding: 9px"
                                class="btn-addprd font-plusjkt-semi btn-lap">Beli Produk</a>
                        </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="font-plusjkt-semi">#</th>
                                        <th class="font-plusjkt-semi">Tanggal Pembelian</th>
                                        <th class="font-plusjkt-semi">File Laporan</th>
                                    </tr>
                                </thead>
                                <tbody id="listReport">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="tab-3" class="page-content tab">
                    <div class="bg-order" style="margin-top: 0px">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="padding: 20px 40px">
                                <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Total
                                    Data</h3>
                                <p style="margin-top: -10px; font-size: 12px; color: #666666"
                                    class="font-plusjkt-regular"><b class="treports"></b>
                                    item
                                </p>
                            </div>

                            <a href="#" style="margin: 32px 30px; width: 150px; height: 20px; padding: 9px"
                                class="btn-addprd font-plusjkt-semi btn-laps">Input Produk Masuk</a>
                        </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="font-plusjkt-semi">#</th>
                                        <th class="font-plusjkt-semi">Tanggal Pembelian</th>
                                        <th class="font-plusjkt-semi">File Laporan</th>
                                    </tr>
                                </thead>
                                <tbody id="listReports">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </center>

</div>