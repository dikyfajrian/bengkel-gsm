let islogged = localStorage.getItem("gsm_pos_logged");
if (islogged == null) {
  window.location.href = "index.php";
}

let cname = localStorage.getItem("gsm_cashier_name");
var timer;
let todayDate = moment(new Date()).format("DD MMMM, YYYY");

// Display the formatted date in the specified element
$("#posDate").text(todayDate);

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

// Assuming this code is within a function or an event handler
$.ajax({
  type: "GET",
  url: "function/get-product.php",
  dataType: "json",
  success: function (response) {
    if (response.status === "success") {
      // Clear the existing content in the listPrd element
      $("#listPrd").empty();

      var subPrice = 0;
      var newPrice;
      var totalPrice = 0;
      var itemPrice = 0;

      // Loop through the products and append them to the listPrd element
      response.products.forEach(function (product) {
        let productItem = `
                    <div class="bg-product">
                        <div style="padding: 1px 20px">
                            <h3 style="font-size: 15px; margin-top: 11px" class="color1 font-plusjkt-medium">${
                              product.name
                            }</h3>
                            <p style="margin-top: -8px; font-size: 12px" class="color-alt1 font-plusjkt-regular">${convertToRupiah(
                              product.price
                            )}</p>
                        </div>
                        <a href="#" class="btn-addprd font-plusjkt-semi" data-product='${JSON.stringify(
                          product
                        )}'>Add</a>
                    </div>
                `;

        // Append the product item to the listPrd element
        $("#listPrd").append(productItem);

        let test;
        let datas = [];

        // Attach a click event to the "Add" button within the added product item
        $("body")
          .off("click", ".btn-addprd")
          .on("click", ".btn-addprd", function (event) {
            event.stopPropagation();
            $(this).addClass("disabled");
            $(".emptys").hide();
            $(".pricing").show();
            $(".cont-order").show();
            // Retrieve product data from the data attribute
            var productData = $(this).data("product");

            // Access product properties as needed
            console.log("Product ID:", productData.id_products);
            console.log("Product Name:", productData.name);
            console.log("Product Price:", productData.price);

            let datap = `<li class="swipeout deleted-callback-${
              productData.id_products
            }" data-price="${productData.price}">
                        <div class="item-content swipeout-content">
                            <div class="item-inner">
                                <div class="item-title">
                                    <h3 style="font-size: 15px; margin-top: 11px" class="color1 font-plusjkt-medium">
                                        ${productData.name}
                                    </h3>
                                    <p style="margin-top: -8px; font-size: 12px"
                                        class="color-alt1 font-plusjkt-regular">${convertToRupiah(
                                          productData.price
                                        )}</p>
                                </div>
                                <div class="stepper stepper-raised stepper-init" id="steps-${
                                  productData.id_products
                                }"
                                    style="box-shadow: none; border: 1px solid #f1f1f1; margin-top: 0px">
                                    <div class="stepper-button-minus"></div>
                                    <div class="stepper-input-wrap">
                                        <input class="stp-${
                                          productData.id_products
                                        }" type="text" value="1" min="0" max="100" step="1" readonly />
                                    </div>
                                    <div class="stepper-button-plus"></div>
                                </div>

                            </div>
                        </div>
                        <div class="swipeout-actions-right">
                            <a class="swipeout-delete">Delete</a>
                        </div>
                        <div style="border-bottom: 1px solid #F3F6F9; "></div>
                    </li>`;
            $(datap).appendTo("#prdItem");
            datas.push({
              produk: productData.name,
              jumlah: 1,
              harga: productData.price,
            });
            // subPrice = productData.price;
            let hitung = parseInt(subPrice) + parseInt(productData.price);
            subPrice = hitung;
            $("#tsubtotal").text(convertToRupiah(subPrice));
            $("#tprice").text(convertToRupiah(subPrice));

            var stepper = app.stepper.create({
              el: "#steps-" + productData.id_products,
            });

            $(".stp-" + productData.id_products).on("change", function () {
              jum = $(".stp-" + productData.id_products).val();
              // totalPrice = subPrice * jum;
              newPrice = subPrice * jum;

              $("#tsubtotal").text(convertToRupiah(subPrice * jum));
              $("#tprice").text(convertToRupiah(subPrice * jum));
            });

            let tb = $(this);

            $(".deleted-callback-" + productData.id_products).on(
              "swipeout:deleted",
              function () {
                let itmPrice = $(this).attr("data-price");
                subPrice -= itmPrice;

                $("#tsubtotal").text(convertToRupiah(subPrice));
                $("#tprice").text(convertToRupiah(subPrice));
                tb.removeClass("disabled");
              }
            );

            $(".cont-order").on("click", function () {
              let dname = datas[0].produk;
              let dquantity = datas[0].jumlah;
              let dprice = datas[0].harga;

              app.dialog.confirm("Process order?", function () {
                // Make an AJAX request to insert data into the "orders" table
                $.ajax({
                  type: "POST",
                  url: "function/insert.php", // Change this to the correct file path
                  data: {
                    items: dname,
                    quantity: dquantity,
                    total_price: dprice,
                  },
                  dataType: "json",
                  success: function (response) {
                    if (response.status === "success") {
                      app.dialog.preloader("Processing order...");
                      setTimeout(() => {
                        app.dialog.close();
                        subPrice = 0;
                        // Empty the content of #prdItem
                        tb.removeClass("disabled");
                        $("#prdItem").empty();
                        $(".cont-order").hide();
                        $("#tsubtotal").text("0");
                        $("#tprice").text("0");
                        $(".pricing").hide();
                        $(".emptys").show();
                        $("#torder").text(1);
                        $("#tincome").text(convertToRupiah(dprice));
                      }, 1000);
                    } else {
                      // Error placing order, handle as needed
                      console.error(response.message);
                    }
                  },
                  error: function () {
                    // Error processing request, handle as needed
                    console.error("Error processing request");
                  },
                });
              });
            });
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

$(".cname").html(`<img src="image/icon-or.svg"
                        style="vertical-align: middle; margin-top: -4px" alt=""> ${cname}`);

// clearInterval(timer);
// localStorage.clear();
