let islogged = localStorage.getItem("gsm_pos_logged");
if (islogged == null) {
  window.location.href = "index.php";
}

let cname = localStorage.getItem("gsm_cashier_name");
let cid = localStorage.getItem("gsm_cashier_id");
var timer;
let todayDate = moment(new Date()).format("DD MMMM, YYYY");
let tempPrices = [];
let listProduct = [];
let totalPrice = 0;
let currentJpr = 0;
let numord = 0;
let litem = 0;
let lpesanan;
let lincome;

if (localStorage.getItem("gsm_report_pesanan")) {
  lpesanan = localStorage.getItem("gsm_report_pesanan");
} else {
  localStorage.setItem("gsm_report_pesanan", 0);
  lpesanan = 0;
}

if (localStorage.getItem("gsm_report_income")) {
  lincome = localStorage.getItem("gsm_report_income");
} else {
  localStorage.setItem("gsm_report_income", 0);
  lincome = 0;
}

$("#torder").text(lpesanan);
$("#tincome").text(convertToRupiah(lincome));

// Display the formatted date in the specified element
$("#posDate").text(todayDate);

let searchBar = $(".input-search");

searchBar.on("input", function () {
  // Change width on input
  if (searchBar.val().trim() !== "") {
    $(".bg-search").css("width", "220px");
  } else {
    $(".bg-search").css("width", "194px");
  }
});
function convertToRupiah(angka) {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}

function delJasa() {
  $("#jasaHarga").val("");
  $("#tjasa").empty();
  $("#pemasangan").hide();
  app.accordion.close(".accords");
  $(".del-jasa").css("display", "none");
  currentJpr = 0;
}

function calculateTotalPrice() {
  // Calculate total price by summing up tempPrices and currentJpr
  totalPrice = tempPrices.reduce((sum, price) => sum + price, 0) + currentJpr;
  // Hide or show elements based on numorder
  if (numord == 0) {
    $(".cont-order").hide();
    $(".pricing").hide();
    $(".disc").hide();
    $(".borders").hide();
    $(".option").hide();
    $(".detailt").hide();
    $(".emptys").show();
    totalPrice = 0;
    delJasa();
  }

  // Update the total price display
  updateTotalPriceDisplay(totalPrice);
}

// Function to apply discount to the total price
function applyDiscount(discountPercentage) {
  // Calculate the discount amount based on the total price
  const discountAmount = (totalPrice * discountPercentage) / 100;

  $("#tdiskon").text(convertToRupiah(discountAmount));

  // Apply the discount to the total price
  const discountedTotal = totalPrice - discountAmount;

  // Update the total price display
  updateTotalPriceDisplay(discountedTotal);
}

// Function to update the total price display
function updateTotalPriceDisplay(totalPrice) {
  $("#tsubtotal").text(convertToRupiah(totalPrice));
  $("#tprice").attr("data-price", totalPrice);
  $("#tprice").text(convertToRupiah(totalPrice));
}

// Function to update prd_quantity in array
function updateQuantity(productId, newQuantity) {
  // Find the index of the product in the array
  var index = listProduct.findIndex(function (product) {
    return product.prd_id === productId;
  });

  // If the product is found, update the prd_quantity
  if (index !== -1) {
    let newprice = listProduct[index].prd_price;
    listProduct[index].prd_quantity = newQuantity;
    listProduct[index].prd_total_price = newprice * newQuantity;
  } else {
    app.dialog.alert("Product not found", "Oops");
  }
}

// Function to delete a product by prd_id in array
function deleteProduct(productId) {
  // Use filter to create a new array excluding the product with the specified prd_id
  listProduct = listProduct.filter(function (product) {
    return product.prd_id !== productId;
  });
}

// Assuming this code is within a function or an event handler
$.ajax({
  type: "GET",
  url: "function/get-product.php",
  dataType: "json",
  success: function (response) {
    if (response.status === "success") {
      // Clear the existing content in the listPrd element
      $("#listPrd").empty();
      let product = response.products;
      // Loop through the products and append them to the listPrd element
      for (let ip = 0; ip < product.length; ip++) {
        let productItem = `
                    <div class="bg-product">
                        <div class="content">
                        <div style="padding: 1px 20px">
                        <h3 style="font-size: 15px; margin-top: 11px" class="color1 font-plusjkt-medium namaMenu">${
                          product[ip].name
                        }</h3>
                        <p style="margin-top: -8px; font-size: 12px" class="color-alt1 font-plusjkt-regular">${convertToRupiah(
                          product[ip].price
                        )}</p>
                          </div>
                          <a href="#" class="btn-addprd font-plusjkt-semi" data-product='${JSON.stringify(
                            product[ip]
                          )}'>Tambah</a>
                            </div>
                        <div class="divider">
                        <br />
                        <p class="font-plusjkt-medium color2">Jumlah Stok : ${
                          product[ip].stock
                        }</p>
                        </div>
                    </div>
                `;

        // Append the product item to the listPrd element
        $("#listPrd").append(productItem);
      }

      // create searchbar
      app.searchbar.create({
        el: ".searchbar",
        backdrop: false,
        searchContainer: ".listpr",
        searchItem: ".bg-product",
        searchIn: ".namaMenu",
      });

      $(".btn-addprd").on("click", function () {
        let prd = JSON.parse($(this).attr("data-product"));
        let stocks = prd.stock;

        if (stocks < 1) {
          app.dialog.alert(
            "Stok produk kurang, silahkan update terlebih dahulu",
            "Oops"
          );
        } else {
          numord += 1;
          $("#numord").text(numord);

          listProduct.push({
            prd_id: prd.id_products,
            prd_name: prd.name,
            prd_buy: prd.buy,
            prd_price: prd.price,
            prd_quantity: 1,
            prd_total_price: 1 * prd.price,
          });

          let btadd = $(this);
          btadd.addClass("disabled");
          $(".emptys").hide();
          $(".borders").show();
          $(".option").show();
          $(".pricing").show();
          $(".disc").show();
          $(".cont-order").show();
          $(".detailt").css("display", "flex");

          // Update tempPrices array with the new product price
          tempPrices[prd.id_products] = parseInt(prd.price);

          // Recalculate the total price
          calculateTotalPrice();

          // Update the discount based on the discount stepper
          const discVal = app.stepper.get(`#step-diskon`).value;
          applyDiscount(discVal);

          // $('.tsubtotal').text()
          let datap = `<li class="swipeout swipe-${prd.id_products}">
                        <div class="item-content swipeout-content">
                            <div class="item-inner">
                                <div class="item-title">
                                    <h3 style="font-size: 15px; margin-top: 11px" class="color1 font-plusjkt-medium">
                                        ${prd.name}
                                    </h3>
                                    <p style="margin-top: -8px; font-size: 12px"
                                        class="color-alt1 font-plusjkt-regular">${convertToRupiah(
                                          prd.price
                                        )}</p>
                                </div>
                                 <div class="stepper stepper-init" id="steps-${
                                   prd.id_products
                                 }" data-min="1" data-max="500" data-step="1" data-value="1">
                                    <div class="stepper-button-minus step-btn-minus">
                                        <img src="image/icons/step-min.svg" width="27" alt="">
                                    </div>
                                    <div class="stepper-value" id="value-${
                                      prd.id_products
                                    }"></div>
                                    <div class="stepper-button-plus step-btn-plus">
                                        <img src="image/icons/step-plus.svg" width="27" alt="">
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="swipeout-actions-right">
                            <a class="swipedel-${
                              prd.id_products
                            } bg-color-red">Hapus</a>
                        </div>
                        <div style="border-bottom: 1px solid #F3F6F9; "></div>
                    </li>`;
          $(datap).appendTo("#prdItem");

          app.stepper.create({
            el: `#steps-${prd.id_products}`,
            min: 1,
            value: 1,
            valueEl: `#value-${prd.id_products}`,
            on: {
              change: function (step) {
                let qty = step.value;

                if (qty > stocks) {
                  app.dialog.alert(
                    "Stok produk kurang, silahkan update terlebih dahulu",
                    "Oops"
                  );
                  step.setValue(step.value - 1);
                } else {
                  let total = parseInt(prd.price) * parseInt(qty);
                  updateQuantity(prd.id_products, qty);
                  newPrice = total;

                  // Update the corresponding tempPrices entry
                  tempPrices[prd.id_products] = parseInt(total);

                  // Recalculate the total price
                  calculateTotalPrice();

                  // Update the discount based on the discount stepper
                  let discVal = app.stepper.get(`#step-diskon`).value;
                  applyDiscount(discVal);
                }
              },
            },
          });

          $(`.swipedel-${prd.id_products}`).on("click", function () {
            app.dialog.confirm("Hapus item?", "Konfirmasi", function () {
              app.swipeout.delete(`.swipe-${prd.id_products}`);

              setTimeout(() => {
                numord -= 1;
                $("#numord").text(numord);
                deleteProduct(prd.id_products);
                // Remove the product price from tempPrices array
                tempPrices[prd.id_products] = 0;

                // Recalculate the total price
                calculateTotalPrice();

                // Update the discount based on the discount stepper
                const discVal = app.stepper.get(`#step-diskon`).value;
                applyDiscount(discVal);

                btadd.removeClass("disabled");
              }, 250);
            });
          });
        }
      });

      $(".cont-order").on("click", function () {
        app.dialog.prompt("Masukan nominal uang", function (cash) {
          if (cash) {
            // Validate price
            if (!isNumeric(cash)) {
              app.dialog.alert("Hanya boleh angka");
              return;
            }

            if (parseInt(cash) < totalPrice) {
              app.dialog.alert("Nominal uang kurang dari total harga");
            } else {
              app.dialog.confirm("Proses pesanan?", function () {
                let kembalian = parseInt(cash) - totalPrice;
                app.dialog.alert(
                  `Kembalian nya sebesar ${convertToRupiah(kembalian)}`
                );

                app.popover.close();

                let items = listProduct;
                let quantity = listProduct.length;
                let total_price = parseInt($("#tprice").attr("data-price"));
                let jasa = currentJpr == 0 ? "-" : currentJpr;
                let discount = parseInt($("#discVal").text());
                let catatan = $("#jasaCatatan").val();
                app.dialog.preloader("Memproses transaksi...");
                // AJAX insert here
                $.ajax({
                  url: "function/insert.php",
                  type: "POST",
                  data: {
                    id_cashier: cid,
                    items: JSON.stringify(items),
                    discount: discount,
                    quantity: quantity,
                    jasa_pemasangan: jasa,
                    catatan: catatan === "" ? "-" : catatan,
                    total_price: total_price,
                  },
                  dataType: "json",
                  success: function (response) {
                    let id_orders = response.id_order;
                    // AJAX update stock
                    $.ajax({
                      url: "function/update-stock.php",
                      type: "POST",
                      data: {
                        items: JSON.stringify(items),
                      },
                      success: function (updateResponse) {
                        setTimeout(() => {
                          let getp = parseInt(
                            localStorage.getItem("gsm_report_pesanan")
                          );
                          localStorage.setItem("gsm_report_pesanan", getp + 1);

                          let getpr = parseInt(
                            localStorage.getItem("gsm_report_income")
                          );
                          localStorage.setItem(
                            "gsm_report_income",
                            getpr + total_price
                          );

                          app.dialog.close();
                          app.popup
                            .create({
                              closeByBackdropClick: false,
                              content: `<div class="popup popup-order" style="border-radius: 24px; height: 480px">
                            <center>
                                <div style="margin-top: 60px">
                                    <img src="image/icons/like-shapes.svg" alt="">
                                     <p class="font-plusjkt-semi color1">kembalian : ${convertToRupiah(
                                       kembalian
                                     )}</p>
                                    <p class="font-plusjkt-semi" style="color: #198754;">+${convertToRupiah(
                                      total_price
                                    )}</p>
                                    <h1 class="color2 font-plusjkt-bold">Transaksi Berhasil</h1>
                                    <p class="font-plusjkt-regular" style="color: #979797; margin-top: -12px">silahkan print
                                        struk transaksi</p>

                                    <div class="grid grid-cols-2" style="margin-top: 50px; max-width: 75%">
                                        <div><a href="index.php?page=pos"
                                                class="external btn-circle text-color-white font-plusjkt-semi color2"
                                                style="border: 2px solid var(--color2);">Tutup</a>
                                        </div>
                                        <div><a href="print.php?id_order=${id_orders}"
                                                class="external btn-circle text-color-white font-plusjkt-semi cont-print bg-color2"
                                                target="_blank">Print
                                                Struk</a>
                                        </div>
                                    </div>
                                </div>
                            </center>
                        </div>`,
                            })
                            .open();
                        }, 1000);
                      },
                      error: function (updateError) {
                        console.error("Error updating stock:", updateError);
                      },
                    });
                  },
                  error: function (error) {
                    console.error("Error inserting order:", error);
                  },
                });
              });
            }
          } else {
            app.dialog.alert("Silahkan masukan nominal uang");
          }
        });
      });
    } else {
      // Handle the error
      console.error(response.message);
    }
  },
  error: function () {
    // Handle the AJAX request error
    console.error("Error processing request");
  },
});

app.stepper.create({
  el: `#step-diskon`,
  min: 0,
  max: 100,
  value: 0,
  step: 5,
  valueEl: `#discVal`,
  on: {
    change: function (step) {
      const discVal = step.value;
      // Update the discount value
      applyDiscount(discVal);
    },
  },
});

function getTimeSpentOnSite() {
  var timeSpentOnSite = parseInt(localStorage.getItem("timeSpentOnSite"));
  timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
  return timeSpentOnSite;
}

function startCounting() {
  var timerStart = Date.now();

  timer = setInterval(function () {
    var timeSpentOnSite = getTimeSpentOnSite() + (Date.now() - timerStart);
    localStorage.setItem("timeSpentOnSite", timeSpentOnSite);
    timerStart = parseInt(Date.now());

    // Convert to seconds
    var gtm = parseInt(timeSpentOnSite / 1000);
    var hour = Math.floor(gtm / 3600);
    var minute = Math.floor((gtm - hour * 3600) / 60);
    var seconds = gtm - (hour * 3600 + minute * 60);

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("workingHour").innerHTML =
      hour + ":" + minute + ":" + seconds;

    localStorage.setItem(
      "gsm_working_hour",
      hour + ":" + minute + ":" + seconds
    );
  }, 1000);
}
startCounting();

/* ---------- Stop the timer when the window/tab is inactive ---------- */

var stopCountingWhenWindowIsInactive = true;

if (stopCountingWhenWindowIsInactive) {
  if (typeof document.hidden !== "undefined") {
    var hidden = "hidden",
      visibilityChange = "visibilitychange",
      visibilityState = "visibilityState";
  } else if (typeof document.msHidden !== "undefined") {
    var hidden = "msHidden",
      visibilityChange = "msvisibilitychange",
      visibilityState = "msVisibilityState";
  }
  var documentIsHidden = document[hidden];

  document.addEventListener(visibilityChange, function () {
    if (documentIsHidden != document[hidden]) {
      if (document[hidden]) {
        // Window is inactive
        clearInterval(timer);
      } else {
        // Window is active
        startCounting();
      }
      documentIsHidden = document[hidden];
    }
  });
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

$(".cname").html(`<img src="image/icon-or.svg"
                        style="vertical-align: middle; margin-top: -4px" alt=""> ${cname}`);

$(".add-jasa").on("click", function () {
  let jprice = $("#jasaHarga").val();

  // Validate input
  if (jprice === "") {
    app.dialog.alert("Silahkan isi harga jasa terlebih dahulu");
    return;
  }

  // Validate price
  if (!isNumeric(jprice)) {
    app.dialog.alert("Hanya boleh angka");
    return;
  }

  $(".del-jasa").css("display", "block");

  // Convert jprice to integer
  jprice = parseInt(jprice);

  if (currentJpr == 0) {
    $("#pemasangan").css("display", "flex");
    $("#tjasa").text(convertToRupiah(jprice));
    totalPrice += jprice;
    // updateTotalPriceDisplay(totalPrice);
    currentJpr = jprice;
    calculateTotalPrice();
  } else {
    // Subtract the previous jprice from totalPrice
    totalPrice -= currentJpr;

    // Add the new jprice to totalPrice
    totalPrice += jprice;

    // Update the currentJpr variable
    currentJpr = jprice;
    calculateTotalPrice();

    // Update the display
    $("#tjasa").text(convertToRupiah(jprice));
    // updateTotalPriceDisplay(totalPrice);
  }
});

$(".del-jasa").on("click", function () {
  app.dialog.confirm("Hapus jasa pemasangan?", "Konfirmasi", function () {
    // console.log(currentJpr);
    totalPrice -= currentJpr;
    currentJpr = 0;
    console.log(totalPrice);
    calculateTotalPrice();
    delJasa();
  });
});

$(".keluar").on("click", function () {
  app.dialog.confirm("Keluar dari kasir?", "Konfirmasi", function () {
    clearInterval(timer);
    app.popover.close();

    let whours = localStorage.getItem("gsm_working_hour");
    let wincome = localStorage.getItem("gsm_report_income");
    let wpesanan = localStorage.getItem("gsm_report_pesanan");
    let duration = moment.duration(whours);
    let hours = Math.floor(duration.asHours());
    let minutes = Math.floor(duration.asMinutes()) % 60;
    let formattedDuration = hours + " jam " + minutes + " menit";

    app.popup
      .create({
        closeByBackdropClick: false,
        content: `<div class="popup popup-end" style="border-radius: 24px; height: 400px">
                    <br>
                    <div style="margin-top: 20px; padding: 0px 40px">
                        <h3 class="font-plusjkt-semi color2" style="font-size: 20px">Laporan Hari Ini</h3>
                        <div class="grid grid-cols-3 grid-gap" style="margin-top: 20px; max-width: 98%">
                            <div>
                                <p style="color: #979797; text-align: left; font-size: 12px"
                                    class="font-plusjkt-regular">Tanggal
                                </p>
                                <h3 style="text-align: left; margin-top:-8px" class="font-plusjkt-medium color1">
                                ${todayDate}
                                </h3>
                            </div>
                            <div>
                                <p style="color: #979797; text-align: left; font-size: 12px"
                                    class="font-plusjkt-regular">Total
                                    Pesanan
                                </p>
                                <h3 style="text-align: left; margin-top:-8px" class="font-plusjkt-medium color1">
                                ${wpesanan}
                                </h3>
                            </div>
                            <div>
                                <p style="color: #979797; text-align: left; font-size: 12px"
                                    class="font-plusjkt-regular">Total
                                    Pendapatan
                                </p>
                                <h3 style="text-align: left; margin-top:-8px; width: 500px"
                                    class="font-plusjkt-medium color1">
                                    ${convertToRupiah(wincome)}
                                </h3>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 grid-gap" style="margin-top: 20px; max-width: 55%">
                            <div>
                                <p style="color: #979797; text-align: left; font-size: 12px"
                                    class="font-plusjkt-regular">Nama Kasir
                                </p>
                                <h3 style="text-align: left; margin-top:-8px" class="font-plusjkt-medium color1">
                                ${cname}
                                </h3>
                            </div>
                            <div>
                                <p style="color: #979797; text-align: left; font-size: 12px"
                                    class="font-plusjkt-regular">Jam Kerja
                                </p>
                                <h3 style="text-align: left; margin-top:-8px; width: 500px"
                                    class="font-plusjkt-medium color1">
                                    ${formattedDuration}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <center>
                        <a href="#" class="btn-circle text-color-white font-plusjkt-semi cont-keluar bg-color2"
                            style="margin-top: 50px;">Keluar Sekarang</a>
                    </center>
                </div>`,
        on: {
          opened: function () {
            $(".cont-keluar").on("click", function () {
              app.dialog.preloader("Mohon tunggu...");
              $.ajax({
                url: "function/insert-report.php",
                type: "POST",
                data: {
                  id_cashier: cid, // replace with the actual cashier name
                  income: wincome,
                  working_hours: formattedDuration,
                },
                success: function (response) {
                  app.dialog.alert("Terima kasih sudah bekerja");

                  setTimeout(() => {
                    localStorage.clear();
                    window.location.href = "index.php?page=welcome";
                  }, 600);

                  // Handle success (response) here if needed
                },
                error: function (xhr, status, error) {
                  console.error("errot storing report:", error);
                  // Handle error here if needed
                },
              });
            });
          },
        },
      })
      .open();
  });
});

// clearInterval(timer);
// localStorage.clear();
