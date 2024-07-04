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

function getCashier() {
  // Make AJAX request to get cashier data
  $.ajax({
    type: "GET",
    url: "function/get-cashier.php",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        // Clear existing content in the list
        $("#listCashier").empty();

        let nums = response.cashier.length;
        $(".tproduct").text(nums);

        // Loop through each product and append it to the list
        $.each(response.cashier, function (index, product) {
          var datePrd = moment(product.created).format("DD/MM/YYYY");
          var productItem = `
                        <tr class="color1 font-plusjkt-medium">
                            <td>${index + 1}</td>
                            <td>${product.nama}</td>
                            <td>${datePrd}</td>
                            <td>
                                <a href="#" class="text-color-red font-plusjkt-semi btn-popup-delete" id="${
                                  product.id_cashier
                                }">Hapus</a>
                            </td>
                        </tr>
                    `;
          // Append the product item to the list
          $("#listCashier").append(productItem);
        });

        $(".btn-popup-delete").on("click", function () {
          let id = $(this).attr("id");

          deleteCashier(id);
        });
      } else {
        if (response.message == "No cashier found") {
          // Display "No products available" message
          $("#listCashier").html(
            '<tr><td colspan="6">Belum ada kasir yang didaftarkan</td></tr>'
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

function getReport() {
  // Make AJAX request to get cashier data
  $.ajax({
    type: "GET",
    url: "function/get-report.php",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        // Clear existing content in the list
        $("#listReport").empty();

        let nums = response.report.length;

        $(".trx").text(nums);

        // Loop through each product and append it to the list
        $.each(response.report, function (index, product) {
          var datePrd = moment(product.tanggal).format("DD/MM/YYYY");
          var productItem = `
                        <tr class="color1 font-plusjkt-medium">
                            <td>${index + 1}</td>
                            <td>${product.nama}</td>
                            <td>${datePrd}</td>
                            <td>${product.working_hours}</td>
                            <td>${convertToRupiah(product.income)}</td>
                        </tr>
                    `;
          // Append the product item to the list
          $("#listReport").append(productItem);
        });
      } else {
        if (response.message == "No report found") {
          // Display "No products available" message
          $("#listReport").html(
            '<tr><td colspan="6">Belum ada laporan yang ada</td></tr>'
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

getCashier();
getReport();

function deleteCashier(id) {
  app.dialog.confirm("Hapus kasir ini?", "Konfirmasi", function () {
    app.dialog.preloader("Mohon tunggu...");
    // Send AJAX request
    $.ajax({
      type: "POST",
      url: "function/delete-cashier.php", // Specify your PHP file name
      data: { id: id },
      success: function (response) {
        setTimeout(() => {
          app.dialog.close();
          // Product updated successfully
          getCashier();
          // Product added successfully
          app.dialog.alert("Kasir tersebut telah dihapus", "Berhasil");
        }, 500);
      },
      error: function (xhr, status, error) {
        // Handle errors
        console.error(xhr.responseText);
      },
    });
  });
}

$(".btn-popup-add").on("click", function () {
  app.popup
    .create({
      closeByBackdropClick: false,
      content: `<div class="popup" style="border-radius: 25px; height: 380px">
                <div style="display: flex; justify-content: space-between;">
                <div style="padding: 20px 40px">
                    <h3 style="font-size: 18px; margin-top: 11px" class="color1 font-plusjkt-semi">Tambahkan Kasir</h3>
                    <p style="margin-top: -10px; font-size: 12px; color: #666666" class="font-plusjkt-regular">lengkapi informasi dibawah</p>
                </div>
                <a href="#" style="margin: 32px 30px; width: 60px; height: 20px; padding: 9px"
                    class="btn-addprd font-plusjkt-semi popup-close">tutup</a>
                </div>

                <div style="margin-top: 20px; text-align: center;">
                    <div style="display: inline-block; text-align: left;">
                         <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 5px">Nama Kasir</p>
                        <input id="prd-name" class="input-form font-plusjkt-medium" placeholder="isi nama kasir"
                            required />
                    </div>
                </div>
                    <center>
                    <a href="#" class="btn-circle text-color-white font-plusjkt-semi bg-color2 addnew"
                    style="margin-top: 70px;">Tambahkan</a>
                    </center>
                </div>
                </div>`,
      on: {
        opened: function () {
          $(".addnew").on("click", function () {
            let prdname = $("#prd-name").val();

            // Validate input
            if (prdname === "") {
              app.dialog.alert("Silahkan lengkapi form");
              return;
            }

            // Make AJAX request
            $.ajax({
              type: "POST",
              url: "function/add-cashier.php",
              data: {
                cashier_name: prdname,
              },
              dataType: "json",
              success: function (response) {
                if (response.status === "success") {
                  getCashier();

                  // Product added successfully
                  app.dialog.alert("Kasir telah ditambahkan", "Berhasil");
                  // Clear input fields
                  $("#prd-name").val("");
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
