<?php include("components/dashboard/navbar.php"); ?>
<div style="margin-top: 50px; margin-bottom: 80px;">
    <center>
        <h1 class="color1 font-plusjkt-bold">Daftar Transaksi</h1>
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

        <div style="max-width: 95%; margin: 0 auto">

            <div class="bg-order">
                <div style="display: flex; justify-content: space-between;">
                    <div style="padding: 20px 40px">
                        <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Total Transaksi
                        </h3>
                        <p style="margin-top: -10px; font-size: 12px; color: #666666" class="font-plusjkt-regular"><b
                                class="torder"></b>
                            transaksi
                        </p>
                    </div>
                    <a href="#" style="margin: 32px 30px; width: 150px; height: 20px; padding: 9px"
                        class="external btn-addprd btn-export disabled font-plusjkt-semi">Unduh ke Excel</a>

                    <a href="#" style="display: none" class="external links">link</a>

                </div>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th class="font-plusjkt-semi">#</th>
                                <th class="font-plusjkt-semi">Kasir</th>
                                <th class="font-plusjkt-semi">Produk</th>
                                <th class="font-plusjkt-semi">Jumlah</th>
                                <th class="font-plusjkt-semi">Harga Beli</th>
                                <th class="font-plusjkt-semi">Harga Jual</th>
                                <th class="font-plusjkt-semi">Jasa Pemasangan</th>
                                <th class="font-plusjkt-semi">Catatan</th>
                                <th class="font-plusjkt-semi">Total Harga</th>
                                <th class="font-plusjkt-semi">Tanggal</th>
                                <th class="font-plusjkt-semi">Metode Pembayaran</th>
                            </tr>
                        </thead>
                        <tbody id="listOrder">
                            <!-- Add more rows for additional products -->
                        </tbody>
                    </table>
                    <div style="float: right; margin-top: 40px;">
                        <div style="display: flex; justify-content: space-between; margin-top: -10px;">
                            <h3 class="font-plusjkt-semi" style="color: #198754; margin-right: 80px">Total Pendapatan:
                            </h3>
                            <h3 class="font-plusjkt-semi" style="color: #198754" id="tprice"></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </center>
</div>