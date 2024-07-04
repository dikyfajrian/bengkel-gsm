<div class="navbar no-outline" style="height: 85px">
    <div class="navbar-bg bg-color-white"></div>
    <div class="navbar-inner" style="padding: 0px 30px">
        <div class="left">
            <a href="#" class="link popover-open" data-popover=".popover-pos">
                <img src="image/button/btn-pos.svg" width="200" alt="">
            </a>
        </div>
        <div class="title" style="opacity: 1 !important">
            <h2 class="font-plusjkt-bold color1">Gunung Sari <b class="color2">Motor</b></h2>
        </div>
        <div class="right">
            <p class="font-inter-regular" style="text-align: right; color: #979797; font-size: 14px">Selamat Datang 👋🏻
                <br><b class="color1 font-plusjkt-bold cname"
                    style="text-transform: capitalize; font-size: 17px; display: block; margin-top: 5px">
                </b>
            </p>
        </div>
    </div>
</div>

<div style="display: flex">
    <div class="grid1">

        <?php include("components/pos/bg-info.php"); ?>

        <div style="padding: 20px 40px">
            <h2 class="color1 font-plusjkt-semi">Pilih Produk</h2>
            <div style="float: right; margin-top: -90px;">
                <div class="list searchbar searchbar-inline">
                    <ul class="bg-search">
                        <li class="item-content item-input">
                            <div class="item-media"><img src="image/icons/search-normal.svg" alt=""></div>
                            <div class="item-inner">
                                <div class="item-input-wrap">
                                    <input type="search" class="font-plusjkt-semi input-search"
                                        style="margin-left: -30px; width: 180px; color: #859DD2; background-color: transparent"
                                        placeholder="Cari Produk..." name="name" />
                                    <span class="input-clear-button" style="margin: -16px -11px;"></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div style="clear: both;"></div>
            <div class="grid grid-cols-3 grid-gap listpr" style="margin-top: 0px" id="listPrd">
            </div>

            <div class="list simple-list searchbar-not-found" style="margin-top: -30px">
                <p>produk tidak ditemukan</p>
            </div>

        </div>

    </div>

    <div class="grid2">
        <div style="padding: 0px 20px">
            <div class="emptys" style="margin-top: 150px">
                <center>
                    <img src="image/icons/empty.svg" alt="">
                    <h2 class="font-plusjkt-bold color1" style="margin-top: -10px">Selamat Bekerja!</h2>
                    <p class="font-inter-regular" style="color: #666666">
                        tambah produk yang ada <br>
                        untuk memulai transaksi
                    </p>
                </center>
            </div>

            <div class="detailt" style="display: none; justify-content: space-between">
                <h3 class="font-plusjkt-bold color2">Detail Order</h3>
                <div class="chip" style="margin-top: 15px; background-color: #FFF1DB; padding: 0px 16px">
                    <div class="chip-label font-plusjkt-medium color2"><b class="font-plusjkt-medium color2"
                            id="numord">0</b> item
                    </div>
                </div>
            </div>


            <div class="list" style="margin: 5px -14px;">
                <ul id="prdItem">
                </ul>
            </div>

            <div class="disc" style="margin-top: 40px; display: none">
                <h3 class="font-plusjkt-bold color2" style="font-size: 15px">Tambahkan Diskon</h3>
                <div style="display: flex; justify-content: space-between">
                    <p class="color1 font-plusjkt-medium" style="font-size: 16px; margin-top: 3px"><b id="discVal"
                            class="font-plusjkt-medium">0</b>%</p>
                    <div class="stepper" id="step-diskon">
                        <div class="stepper-button-minus step-btn-minus">
                            <img src="image/icons/step-min.svg" width="27" alt="">
                        </div>
                        <div class="stepper-button-plus step-btn-plus">
                            <img src="image/icons/step-plus.svg" width="27" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: none;" class="option">
            <div class="list accordion-opposite accordion-list" style="margin: 20px 10px 0px">
                <ul>
                    <li class="accordion-item accords">
                        <a class="item-link item-content">
                            <div class="item-inner">
                                <div class="item-title font-plusjkt-semi color2" style="font-size: 14px;">Tambah Jasa
                                    Pemasangan</div>
                            </div>
                        </a>
                        <div class="accordion-item-content">
                            <div class="block">
                                <div style="margin: 20px 0px; display: flex; justify-content: space-between">
                                    <input id="jasaHarga" class="input-form font-plusjkt-medium"
                                        placeholder="harga jasa" required />
                                    <a href="#" class="button button-fill button-round bg-color1 add-jasa"
                                        style="margin-top: 8px; text-transform: capitalize">Tambah</a>
                                </div>
                                <a href="#" style="display: none; margin-bottom: 17px; margin-top: -10px;"
                                    class="text-color-red del-jasa">Hapus</a>
                                <input id="jasaCatatan"
                                    style="width: 89% !important; height: 32px !important; font-size: 13px !important;"
                                    class="input-form font-plusjkt-medium" placeholder="Tambah Catatan..." required />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="borders" style="display:none; border-bottom: 1px solid #F3F6F9; margin-top: 10px"></div>



        <div style="padding: 0px 20px; margin-top: 20px">
            <div class="pricing" style="display: none">
                <div id="pemasangan" style="display: none; justify-content: space-between">
                    <p class="font-plusjkt-semi color2" style="color: #979797">Jasa Pemasangan</p>
                    <p class="font-plusjkt-semi color2" id="tjasa"></p>
                </div>
                <div style="display: flex; justify-content: space-between">
                    <p class="font-plusjkt-regular" style="color: #979797">Subtotal</p>
                    <p class="font-plusjkt-semi color1" id="tsubtotal"></p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: -10px;">
                    <p class="font-plusjkt-regular" style="color: #979797">Diskon</p>
                    <p class="font-plusjkt-semi color1" id="tdiskon"></p>
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: -10px;">
                    <p class="font-plusjkt-semi" style="color: #198754">Total Harga</p>
                    <p class="font-plusjkt-semi" style="color: #198754" id="tprice" data-price=""></p>
                </div>
            </div>
        </div>

        <center>
            <a href=" #" class="btn-circle text-color-white font-plusjkt-semi cont-order bg-color2"
                style="margin-top: 50px; display: none;">Konfirmasi Pesanan</a>
        </center>
    </div>
</div>