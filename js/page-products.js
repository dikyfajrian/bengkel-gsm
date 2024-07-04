moment.locale("id");
let formattedDate = moment(new Date()).format("dddd, DD MMMM YYYY");
// Function to check if a value is numeric
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

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

function getProduct() {
  // Make AJAX request to get product data
  $.ajax({
    type: "GET",
    url: "function/get-product.php",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        // Clear existing content in the list
        $("#listProduct").empty();

        $(".tproduct").text(response.products.length);

        // Loop through each product and append it to the list
        $.each(response.products, function (index, product) {
          var productItem = `
                        <tr class="color1 font-plusjkt-medium">
                            <td>${index + 1}</td>
                            <td>${product.name} <br>
                                <span class="product-description">${
                                  product.description
                                }</span>
                            </td>
                            <td>${product.stock} item</td>
                            <td>${convertToRupiah(product.buy)}</td>
                            <td>${convertToRupiah(product.price)}</td>
                            <td>
                                <a href="#" class="color2 font-plusjkt-semi btn-popup-edit" id="${
                                  product.id_products
                                }">Ubah</a>  <a href="#" style="margin-left: 15px" class="text-color-red font-plusjkt-semi btn-popup-delete" id="${
            product.id_products
          }">Hapus</a>
                            </td>
                        </tr>
                    `;
          // Append the product item to the list
          $("#listProduct").append(productItem);
        });

        $(".btn-popup-edit").on("click", function () {
          let id = $(this).attr("id");

          editProduct(id);
        });

        $(".btn-popup-delete").on("click", function () {
          let id = $(this).attr("id");

          deleteProduct(id);
        });
      } else {
        if (response.message == "No products found") {
          // Display "No products available" message
          $("#listProduct").html(
            '<tr><td colspan="6">No products available</td></tr>'
          );
        }
        console.log(response.message);
      }
    },
    error: function () {
      console.log("Error retrieving product data");
    },
  });
}

function getLaporan() {
  // Make AJAX request to get product data
  $.ajax({
    type: "GET",
    url: "function/get-laporan.php",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        // Clear existing content in the list
        $("#listReport").empty();

        $(".treport").text(response.products.length);

        // Loop through each product and append it to the list
        $.each(response.products, function (index, product) {
          var datePrd = moment(product.tgl_laporan).format(
            "DD/MM/YYYY - HH:mm:ss"
          );
          var productItem = `
                        <tr class="color1 font-plusjkt-medium">
                            <td>${index + 1}</td>
                            <td>${datePrd}</td>
                            <td><a href="laporan/${
                              product.file
                            }" target="_blank" class="external">lihat file</a></td>
                        </tr>
                    `;
          // Append the product item to the list
          $("#listReport").append(productItem);
        });
      } else {
        if (response.message == "No report found") {
          // Display "No report available" message
          $(".treport").text("0");

          $("#listReport").html(
            '<tr><td colspan="6">Belum ada laporan pembelian</td></tr>'
          );
        }
        console.log(response.message);
      }
    },
    error: function () {
      console.log("Error retrieving report data");
    },
  });
}

function getLaporanMasuk() {
  // Make AJAX request to get product data
  $.ajax({
    type: "GET",
    url: "function/get-laporan-masuk.php",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        // Clear existing content in the list
        $("#listReports").empty();

        $(".treports").text(response.products.length);

        // Loop through each product and append it to the list
        $.each(response.products, function (index, product) {
          var datePrd = moment(product.tgl_laporan).format(
            "DD/MM/YYYY - HH:mm:ss"
          );
          var productItem = `
                        <tr class="color1 font-plusjkt-medium">
                            <td>${index + 1}</td>
                            <td>${datePrd}</td>
                            <td><a href="laporan/${
                              product.file
                            }" target="_blank" class="external">lihat file</a></td>
                        </tr>
                    `;
          // Append the product item to the list
          $("#listReports").append(productItem);
        });
      } else {
        if (response.message == "No report found") {
          // Display "No report available" message
          $(".treports").text("0");

          $("#listReports").html(
            '<tr><td colspan="6">Belum ada laporan masuk</td></tr>'
          );
        }
        console.log(response.message);
      }
    },
    error: function () {
      console.log("Error retrieving report data");
    },
  });
}

getProduct();
getLaporan();
getLaporanMasuk();

function deleteProduct(id) {
  app.dialog.confirm("Hapus produk ini?", "Konfirmasi", function () {
    app.dialog.preloader("Mohon tunggu...");
    // Send AJAX request
    $.ajax({
      type: "POST",
      url: "function/delete-product.php", // Specify your PHP file name
      data: { id: id },
      success: function (response) {
        setTimeout(() => {
          app.dialog.close();
          // Product updated successfully
          getProduct();
          // Product added successfully
          app.dialog.alert("Produk telah dihapus", "Berhasil");
        }, 500);
      },
      error: function (xhr, status, error) {
        // Handle errors
        console.error(xhr.responseText);
      },
    });
  });
}

function editProduct(id) {
  // Make AJAX request to get product details based on id
  $.ajax({
    type: "GET",
    url: "function/get-product-details.php", // Adjust the URL accordingly
    data: {
      id: id,
    },
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        // Product details retrieved successfully

        // Extract product details from the response
        let product = response.product;

        app.popup
          .create({
            closeByBackdropClick: false,
            // Rest of your popup creation code...
            content: `<div class="popup" style="border-radius: 25px">
                <div style="display: flex; justify-content: space-between;">
                <div style="padding: 20px 40px">
                    <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Ubah Produk</h3>
                    <p style="margin-top: -10px; font-size: 12px; color: #666666" class="font-plusjkt-regular">lengkapi informasi dibawah</p>
                </div>
                <a href="#" style="margin: 32px 30px; width: 60px; height: 20px; padding: 9px"
                    class="btn-addprd font-plusjkt-semi popup-close">close</a>
                </div>

                <div style="margin-top: 0px; text-align: center;">
                    <div style="display: inline-block; text-align: left;">
                         <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 5px">Nama Produk</p>
                        <input id="prd-name" class="input-form font-plusjkt-medium" placeholder="isi nama produk"
                            required />

                         <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">Deskripsi Produk</p>
                        <input id="prd-desc" class="input-form font-plusjkt-medium" placeholder="isi deskripsi produk"
                            required />
                            </div>

                          <div style="text-align: left; padding: 0px 47px">

                            <div class="grid grid-cols-2" style="max-width: 70%; margin: 0 auto;">
                                <div>
                                 <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">Jumlah</p>
                            <input id="prd-stock" style="width: 170px !important;" type="number" min="1" class="input-form font-plusjkt-medium" placeholder="0"
                            required />
                                </div>
                                <div>
                                     <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">Harga Produk</p>
                            <input id="prd-price" style="width: 187px !important;" type="text" class="input-form font-plusjkt-medium" placeholder="10000"
                            required />
                                </div>
                            </div>

                           
                            </div>
                    </div>
                    <center>
                    <a href="#" class="btn-circle text-color-white font-plusjkt-semi bg-color2 editprd"
                    style="margin-top: 70px;">Submit</a>
                    </center>
                </div>
                </div>`,
            on: {
              opened: function () {
                // Populate the input fields with retrieved product details
                $("#prd-name").val(product.name);
                $("#prd-desc").val(product.description);
                $("#prd-stock").val(product.stock);
                $("#prd-price").val(product.price);

                $(".editprd").on("click", function () {
                  let prdname = $("#prd-name").val();
                  let prddesc = $("#prd-desc").val();
                  let prdstock = $("#prd-stock").val();
                  let prdprice = $("#prd-price").val();

                  // Validate input
                  if (
                    prdname === "" ||
                    prddesc === "" ||
                    prdstock === "" ||
                    prdprice === ""
                  ) {
                    app.dialog.alert("Silahkan lengkapi form terlebih dahulu");
                    return;
                  }

                  // Validate price
                  if (!isNumeric(prdprice)) {
                    app.dialog.alert("Hanya boleh angka");
                    return;
                  }

                  // Validate stock
                  if (!isNumeric(prdstock) || parseInt(prdstock) < 1) {
                    app.dialog.alert("Minimum stok produk adalah 1");
                    return;
                  }

                  // Make AJAX request to update the product
                  $.ajax({
                    type: "POST",
                    url: "function/update-product.php", // Adjust the URL accordingly
                    data: {
                      id: id,
                      prdname: prdname,
                      prddesc: prddesc,
                      prdstock: prdstock,
                      prdprice: prdprice,
                    },
                    dataType: "json",
                    success: function (response) {
                      if (response.status === "success") {
                        // Product updated successfully
                        getProduct();

                        // Product added successfully
                        app.dialog.alert("Produk telah diubah", "Berhasil");

                        // Clear input fields
                        $("#prd-name, #prd-desc, #prd-stock, #prd-price").val(
                          ""
                        );

                        // Close the popup
                        app.popup.close();
                      } else {
                        // Error updating product
                        app.dialog.alert(response.message);
                      }
                    },
                    error: function () {
                      app.dialog.alert("Error processing update request");
                    },
                  });
                });
              },
            },
          })
          .open();
      } else {
        // Error retrieving product details
        app.dialog.alert(response.message);
      }
    },
    error: function () {
      app.dialog.alert("Error processing request");
    },
  });
}

$(".btn-popup-add").on("click", function () {
  app.popup
    .create({
      closeByBackdropClick: false,
      content: `<div class="popup" style="border-radius: 25px; overflow-y: scroll">
                <div style="display: flex; justify-content: space-between;">
                <div style="padding: 20px 40px">
                    <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Tambah Produk</h3>
                    <p style="margin-top: -10px; font-size: 12px; color: #666666" class="font-plusjkt-regular">lengkapi informasi dibawah</p>
                </div>
                <a href="#" style="margin: 32px 30px; width: 60px; height: 20px; padding: 9px"
                    class="btn-addprd font-plusjkt-semi popup-close">tutup</a>
                </div>

                <div style="margin-top: 0px; text-align: center;">
                    <div style="display: inline-block; text-align: left;">
                         <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 5px">Nama Produk</p>
                        <input id="prd-name" class="input-form font-plusjkt-medium" placeholder="isi nama produk"
                            required />

                         <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">Deskripsi</p>
                        <input id="prd-desc" class="input-form font-plusjkt-medium" placeholder="isi deskripsi produk"
                            required />

                              <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">Jumlah Stok</p>
                            <input id="prd-stock" type="number" min="1" class="input-form font-plusjkt-medium" placeholder="0"
                            required />
                            </div>

                            <div style="text-align: left; padding: 0px 47px">

                            <div class="grid grid-cols-2" style="max-width: 70%; margin: 0 auto;">
                                <div>
                                 <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">Harga Beli</p>
                            <input id="prd-buy" style="width: 170px !important;" type="number" class="input-form font-plusjkt-medium" placeholder="9500"
                            required />
                                </div>
                                <div>
                                     <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">Harga Jual</p>
                            <input id="prd-price" style="width: 187px !important;" type="number" class="input-form font-plusjkt-medium" placeholder="10000"
                            required />
                                </div>
                            </div>

                            </div>

                    </div>
                    <center>
                    <a href="#" class="btn-circle text-color-white font-plusjkt-semi bg-color2 addnew"
                    style="margin-top: 70px; margin-bottom: 40px">Tambahkan</a>
                    </center>
                </div>
                </div>`,
      on: {
        opened: function () {
          $(".addnew").on("click", function () {
            let prdname = $("#prd-name").val();
            let prddesc = $("#prd-desc").val();
            let prdstock = $("#prd-stock").val();
            let prdbuy = $("#prd-buy").val();
            let prdprice = $("#prd-price").val();

            // Validate input
            if (
              prdname === "" ||
              prddesc === "" ||
              prdstock === "" ||
              prdbuy === "" ||
              prdprice === ""
            ) {
              app.dialog.alert("Silahkan lengkapi form");
              return;
            }

            // Validate price
            if (!isNumeric(prdbuy)) {
              app.dialog.alert("Hanya boleh angka");
              return;
            }

            // Validate price
            if (!isNumeric(prdprice)) {
              app.dialog.alert("Hanya boleh angka");
              return;
            }

            // Validate stock
            if (!isNumeric(prdstock) || parseInt(prdstock) < 1) {
              app.dialog.alert("Minimum stok produk adalah 1");
              return;
            }

            // Make AJAX request
            $.ajax({
              type: "POST",
              url: "function/add-product.php",
              data: {
                prdname: prdname,
                prddesc: prddesc,
                prdstock: prdstock,
                prdbuy: prdbuy,
                prdprice: prdprice,
              },
              dataType: "json",
              success: function (response) {
                if (response.status === "success") {
                  getProduct();

                  // Product added successfully
                  app.dialog.alert("Produk ditambahkan", "Berhasil");
                  // Clear input fields
                  $("#prd-name, #prd-desc, #prd-stock, #prd-price").val("");
                  // Close the popup
                  app.popup.close();
                } else {
                  // Error adding product
                  app.dialog.alert(response.message);
                }
              },
              error: function () {
                app.dialog.alert("Error processing request");
              },
            });
          });
        },
      },
    })
    .open();
});

function generatePDF(products) {
  var formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  var doc = new jsPDF();
  doc.text(20, 20, `Pembelian Stok ${formattedDate}`);

  // Add selected product data to the PDF
  var tableData = [];
  products.forEach(function (product, index) {
    tableData.push([index + 1, product.product, product.quantity]);
  });

  // Add table data to the PDF
  doc.autoTable({
    head: [["No", "Nama Produk", "Jumlah Pembelian"]],
    body: tableData,
    startY: 25,
    theme: "grid",
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 60 },
    },
    bodyStyles: { lineColor: [1, 1, 1] },
    styles: {
      minCellHeight: 10,
      textColor: "#345cb2", // Text color of the table
    },
    headStyles: { fillColor: "#345cb2", textColor: "#fff" },
  });

  // Convert the PDF to a Blob object
  var blob = doc.output("blob");

  var fileName = "pembelian-stok-.pdf";

  // Create FormData object and append the Blob object
  var formData = new FormData();
  formData.append("pdfFile", blob, fileName);

  // Send the FormData object to the server using AJAX
  $.ajax({
    url: "function/save-pdf.php", // Your server-side script to handle uploading PDF
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      app.popup.close();
      app.dialog.alert("Berhasil Mencetak Laporan");
      setTimeout(() => {
        window.open(response, "_blank");
      }, 700);
      getLaporan();
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

$(".btn-lap").on("click", function () {
  $.ajax({
    url: "function/get-product.php",
    type: "GET",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var len = response.products.length;
      for (let ipz = 0; ipz < len; ipz++) {
        var id = response.products[ipz].id_products;
        var name = response.products[ipz].name;
        $("#produkOpt").append(
          "<option value='" + name + "'>" + name + "</option>"
        );
      }
    },
  });

  app.popup
    .create({
      closeByBackdropClick: false,
      content: `<div class="popup" style="border-radius: 25px; overflow-y: scroll">
                    <div style="display: flex; justify-content: space-between;">
                        <div style="padding: 20px 40px">
                            <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Pembelian Produk</h3>
                            <p style="margin-top: -10px; font-size: 12px; color: #666666" class="font-plusjkt-regular">
                                lengkapi informasi dibawah</p>
                        </div>
                        <a href="#" style="margin: 32px 30px; width: 60px; height: 20px; padding: 9px"
                            class="btn-addprd font-plusjkt-semi popup-close">tutup</a>
                    </div>
                    <div class="block" style="margin-top: -20px">
                        <div class="grid grid-cols-2" style="max-width: 90%; margin: 0 auto;">
                            <div>
                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Produk</p>
                                <select class="input-form font-plusjkt-medium produk" name="produk" id="produkOpt"
                                    style="width: 240px !important;">
                                    <option value="">Pilih produk</option>
                                </select>
                            </div>
                            <div>
                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Jumlah Pembelian</p>
                                <input id="prd-price" style="width: 240px !important;"
                                    class="input-form font-plusjkt-medium jumlah" placeholder="1" type="number" min="1" value="1"
                                    required />
                            </div>
                        </div>
                        <a href="#" style="width: 140px; margin: 14px 30px; text-transform: capitalize;"
                            class="button button-fill bg-color1 font-plusjkt-medium newp">Tambah Produk</a>
                    </div>

                    <center>
                        <a href="#" class="btn-circle text-color-white font-plusjkt-semi bg-color2 addlap"
                            style="margin-top: 70px; margin-bottom: 40px">Selesai</a>
                    </center>
                </div>`,
      on: {
        opened: function () {
          $(".newp").on("click", function () {
            let clonedDiv = $(".grid-cols-2:first").clone();

            // Clear input values in the cloned div
            clonedDiv.find('input[type="number"]').val("1");
            clonedDiv.find("select").val("");

            // Insert the cloned div before the button
            clonedDiv.insertBefore($(this));
          });

          $(".addlap").on("click", function () {
            var products = [];
            var isValid = true;

            // Iterate over each select element
            $(".produk").each(function (index) {
              var product = $(this).val();
              var quantity = $(".jumlah").eq(index).val();

              // Check if product is selected
              if (product !== "") {
                // Push the selected value into the products array as an object
                products.push({
                  product: product,
                  quantity: quantity,
                });
              } else {
                // Alert if a product is not selected
                alert("Please select a product for item " + (index + 1));
                isValid = false;
                // Exit the loop early if validation fails
                return false;
              }
            });

            // Proceed if all products are selected
            if (isValid) {
              console.log(products);

              app.dialog.confirm("Buat Laporan?", "Konfirmasi", function () {
                // Generate PDF with selected product data
                generatePDF(products);
              });
            }
          });
        },
      },
    })
    .open();
});

function generatePDFMasuk(products) {
  var formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  var doc = new jsPDF();
  doc.text(20, 20, `Barang Masuk ${formattedDate}`);

  // Add selected product data to the PDF
  var tableData = [];
  products.forEach(function (product, index) {
    tableData.push([
      index + 1,
      product.name,
      product.buy,
      product.price,
      product.quantity,
    ]);
  });

  // Add table data to the PDF
  doc.autoTable({
    head: [
      ["No", "Nama Produk", "Harga Beli", "Harga Jual", "Jumlah Pembelian"],
    ],
    body: tableData,
    startY: 25,
    theme: "grid",
    bodyStyles: { lineColor: [1, 1, 1, 1, 1] },
    styles: {
      minCellHeight: 10,
      textColor: "#345cb2", // Text color of the table
    },
    headStyles: { fillColor: "#345cb2", textColor: "#fff" },
  });

  // Convert the PDF to a Blob object
  var blob = doc.output("blob");

  var fileName = "barang-masuk-.pdf";

  // Create FormData object and append the Blob object
  var formData = new FormData();
  formData.append("pdfFile", blob, fileName);

  // Send the FormData object to the server using AJAX
  $.ajax({
    url: "function/save-pdf-masuk.php", // Your server-side script to handle uploading PDF
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      $.ajax({
        url: "function/update-stocks.php",
        type: "POST",
        data: {
          items: JSON.stringify(products),
        },
        success: function (updateResponse) {
          app.popup.close();
          app.dialog.alert("Berhasil Mencetak Laporan");
          setTimeout(() => {
            window.open(response, "_blank");
          }, 700);
          getLaporanMasuk();
          getProduct();
        },
      });
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

$(".btn-laps").on("click", function () {
  $.ajax({
    url: "function/get-product.php",
    type: "GET",
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      var len = response.products.length;
      for (let ipz = 0; ipz < len; ipz++) {
        var id = response.products[ipz].id_products;
        var name = response.products[ipz].name;
        $("#produkOpt").append(
          "<option value='" + id + "'>" + name + "</option>"
        );
      }
    },
  });

  app.popup
    .create({
      closeByBackdropClick: false,
      content: `<div class="popup" style="border-radius: 25px; overflow-y: scroll">
                    <div style="display: flex; justify-content: space-between;">
                        <div style="padding: 20px 40px">
                            <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Produk Masuk
                            </h3>
                            <p style="margin-top: -10px; font-size: 12px; color: #666666" class="font-plusjkt-regular">
                                lengkapi informasi dibawah</p>
                        </div>
                        <a href="#" style="margin: 32px 30px; width: 60px; height: 20px; padding: 9px"
                            class="btn-addprd font-plusjkt-semi popup-close">tutup</a>
                    </div>
                    <div class="block" style="margin-top: -20px">
                        <div class="grid grid-cols-4 grid4" style="max-width: 92%; margin: 0 auto;">
                            <div>
                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Produk</p>
                                <select class="input-form font-plusjkt-medium produk" name="produk" id="produkOpt"
                                    style="width: 130px !important;">
                                    <option value="">Pilih produk</option>
                                </select>
                            </div>
                            <div>
                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Harga Beli</p>
                                <input id="prd-buy" style="width: 130px !important;"
                                    class="input-form font-plusjkt-medium beli" placeholder="9500" type="text"
                                    required />
                            </div>
                            <div>
                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Harga Jual</p>
                                <input id="prd-price" style="width: 130px !important;"
                                    class="input-form font-plusjkt-medium jual" placeholder="10000" type="text"
                                    required />
                            </div>
                            <div>
                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Jumlah Pembelian</p>
                                <input id="prd-stock" style="width: 130px !important;"
                                    class="input-form font-plusjkt-medium jumlah" placeholder="1" type="number" min="1" value="1"
                                    required />
                            </div>
                        </div>
                        <a href="#" style="width: 140px; margin: 14px 30px; text-transform: capitalize;"
                            class="button button-fill bg-color1 font-plusjkt-medium newps">Tambah Produk</a>
                    </div>

                    <center>
                        <a href="#" class="btn-circle text-color-white font-plusjkt-semi bg-color2 addlaps"
                            style="margin-top: 70px; margin-bottom: 40px">Selesai</a>
                    </center>
                </div>`,
      on: {
        opened: function () {
          $(".newps").on("click", function () {
            let clonedDiv = $(".grid4:first").clone();

            // Clear input values in the cloned div
            clonedDiv.find('input[type="number"]').val("1");
            clonedDiv.find('input[type="text"]').val("");
            clonedDiv.find("select").val("");

            // Insert the cloned div before the button
            clonedDiv.insertBefore($(this));
          });

          $(".addlaps").on("click", function () {
            var products = [];
            var isValid = true;

            // Iterate over each select element
            $(".produk").each(function (index) {
              var product = $(this).val();
              var selectedText = $("#produkOpt option:selected").text();
              var quantity = $(".jumlah").eq(index).val();
              var buy = $(".beli").eq(index).val();
              var price = $(".jual").eq(index).val();

              // Check if product is selected
              if (product !== "" && buy !== "" && price !== "") {
                // Push the selected value into the products array as an object
                products.push({
                  id_products: product,
                  name: selectedText,
                  buy: convertToRupiah(buy),
                  price: convertToRupiah(price),
                  quantity: quantity,
                });
              } else {
                // Alert if a product is not selected
                alert("Silahkan lengkapi informasi untuk item " + (index + 1));
                isValid = false;
                // Exit the loop early if validation fails
                return false;
              }
            });

            // Proceed if all products are selected
            if (isValid) {
              console.log(products);

              app.dialog.confirm(
                "Buat Laporan Masuk?",
                "Konfirmasi",
                function () {
                  // Generate PDF with selected product data
                  generatePDFMasuk(products);
                }
              );
            }
          });
        },
      },
    })
    .open();
});
