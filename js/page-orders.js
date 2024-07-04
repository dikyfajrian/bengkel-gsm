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

moment.locale("id");
let formattedDate = moment(new Date()).format("dddd, DD MMMM YYYY");
$("#date").text(formattedDate);

let calendarNow = moment(new Date()).format("YYYY-MM-DD");

dataSingle(calendarNow);

calendar = app.calendar.create({
  inputEl: "#myCalendar",
  openIn: "customModal",
  rangePicker: true,
  dateFormat: "dd/mm/yyyy",
  // closeOnSelect: true,
  backdrop: true,
  closeByBackdropClick: false,
  maxDate: new Date(),
  footer: true,
  toolbarCloseText: "Batalkan",
  on: {
    open(calendar) {
      calendar.setValue([new Date()]);
      calendar.$el.find(".calendar-footer").prepend(`
        <a class="link changecal" style="margin-right: auto">Ubah tanggal</a>
      `);
      calendar.$el.find(".changecal").on("click", function () {
        let date = $("#myCalendar").val();
        if (date.includes("-")) {
          $(".custom-cal").css("width", "16%");
          let picker = date.split("-");
          let start_date = moment(picker[0].trim(), "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          );
          let end_date = moment(picker[1].trim(), "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          );
          dataRange(start_date, end_date);
        } else {
          $(".custom-cal").css("width", "12%");
          let single_date = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
          dataSingle(single_date);
        }

        app.calendar.close();
      });
    },
  },
});

function dataRange(start, end) {
  // Process Date Range
  $.ajax({
    url: "function/ov-order.php",
    type: "POST",
    data: {
      action: "process_date_range",
      start_date: start, // replace with actual start date
      end_date: end, // replace with actual end date
    },
    dataType: "json",
    success: function (response) {
      let sdate = moment(start).format("DD MMMM YYYY");
      let edate = moment(end).format("DD MMMM YYYY");
      $("#date").text(`${sdate} - ${edate}`);
      app.dialog.preloader("Mohon tunggu...");

      setTimeout(() => {
        app.dialog.close();
        $("#listOrder").empty();
        // Orders data fetched successfully, append it to the listOrder element
        let orders = response.orders;
        let listOrder = $("#listOrder");

        // Check if there are orders to append
        if (orders.length > 0) {
          $(".btn-export").removeClass("disabled");
          $(".torder").text(orders.length);

          let nums = 0;
          let totalPriceSum = 0;
          orders.forEach(function (order, index) {
            let itm = JSON.parse(order.items);
            var datePrd = moment(order.created).format("DD/MM/YYYY");

            for (let im = 0; im < itm.length; im++) {
              nums++;
              let jp;
              if (order.jasa_pemasangan == "-") {
                jp = "-";
              } else {
                jp = convertToRupiah(order.jasa_pemasangan);
              }
              let orderItem = `
                          <tr class="color1 font-plusjkt-medium">
                              <td>${nums}</td>
                              <td>${order.nama}</td>
                              <td>${itm[im].prd_name}</td>
                              <td>${itm[im].prd_quantity}</td>
                              <td>${convertToRupiah(itm[im].prd_buy)}</td>
                              <td>${convertToRupiah(itm[im].prd_price)}</td>
                              <td>${jp}</td>
                              <td>${order.catatan}</td>
                              <td>${convertToRupiah(order.total_price)}</td>
                              <td>${datePrd}</td>
                              <td class="color2 font-plusjkt-semi">Cash</td>
                          </tr>`;
              listOrder.append(orderItem);
              totalPriceSum += parseFloat(order.total_price);
            }
          });
          $("#tprice").text(convertToRupiah(totalPriceSum));
        } else {
          // No orders to display, you can handle this case accordingly
          listOrder.append(
            '<tr><td colspan="7">Tidak ada transaksi untuk tanggal ini</td></tr>'
          );
          $(".btn-export").addClass("disabled");
        }
      }, 600);
    },
    error: function (xhr, status, error) {
      console.error("date range request failed with error:", error);
      // Handle error here if needed
    },
  });
}

function dataSingle(date) {
  // Process Single Date
  $.ajax({
    url: "function/ov-order.php",
    type: "POST",
    data: {
      action: "process_single_date",
      single_date: date, // replace with actual single date
    },
    dataType: "json",
    success: function (response) {
      let showdate = moment(date).format("DD MMMM YYYY");
      $("#date").text(showdate);
      app.dialog.preloader("Mohon tunggu...");
      setTimeout(() => {
        app.dialog.close();
        $("#listOrder").empty();
        // Orders data fetched successfully, append it to the listOrder element
        let orders = response.orders;
        let listOrder = $("#listOrder");

        $(".torder").text(orders.length);

        // Check if there are orders to append
        if (orders.length > 0) {
          $(".btn-export").removeClass("disabled");
          let nums = 0;
          // Loop through each order and append it to the table
          let totalPriceSum = 0;
          orders.forEach(function (order, index) {
            let itm = JSON.parse(order.items);
            var datePrd = moment(order.created).format("DD/MM/YYYY");

            for (let im = 0; im < itm.length; im++) {
              nums++;
              let jp;
              if (order.jasa_pemasangan == "-") {
                jp = "-";
              } else {
                jp = convertToRupiah(order.jasa_pemasangan);
              }
              let orderItem = `
                          <tr class="color1 font-plusjkt-medium">
                              <td>${nums}</td>
                              <td>${order.nama}</td>
                              <td>${itm[im].prd_name}</td>
                              <td>${itm[im].prd_quantity}</td>
                              <td>${convertToRupiah(itm[im].prd_buy)}</td>
                              <td>${convertToRupiah(itm[im].prd_price)}</td>
                              <td>${jp}</td>
                              <td>${order.catatan}</td>
                              <td>${convertToRupiah(order.total_price)}</td>
                              <td>${datePrd}</td>
                              <td class="color2 font-plusjkt-semi">Cash</td>
                          </tr>`;
              listOrder.append(orderItem);
              totalPriceSum += parseFloat(order.total_price);
            }
          });
          $("#tprice").text(convertToRupiah(totalPriceSum));
        } else {
          // No orders to display, you can handle this case accordingly
          listOrder.append(
            '<tr><td colspan="7">Tidak ada transaksi untuk tanggal ini</td></tr>'
          );
          $(".btn-export").addClass("disabled");
        }
      }, 600);
    },
    error: function (xhr, status, error) {
      console.error("single data request failed with error:", error);
      // Handle error here if needed
    },
  });
}

$(".btn-export").on("click", function () {
  console.log("export");
  // Get the table element
  var table = document.getElementById("listOrder"); // Replace "your-table-id" with the actual ID of your table

  // Prepare Excel data
  var excelData =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
  excelData += '<head><meta charset="UTF-8"></head><body>';
  excelData += "<table>";

  // Add header row
  excelData += "<tr>";
  excelData += "<td>#</td>";
  excelData += "<td>Kasir</td>";
  excelData += "<td>Produk</td>";
  excelData += "<td>Jumlah</td>";
  excelData += "<td>Harga Beli</td>";
  excelData += "<td>Harga Jual</td>";
  excelData += "<td>Jasa Pemasangan</td>";
  excelData += "<td>Total Harga</td>";
  excelData += "<td>Tanggal</td>";
  excelData += "<td>Metode Pembayaran</td>";
  excelData += "</tr>";

  // Add data rows
  var rows = table.querySelectorAll("tbody tr");
  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].querySelectorAll("td");
    excelData += "<tr>";
    for (var j = 0; j < cells.length; j++) {
      excelData += "<td>" + cells[j].innerText + "</td>";
    }
    excelData += "</tr>";
  }

  excelData += "</table></body></html>";

  // Create a Blob object
  var blob = new Blob([excelData], { type: "application/vnd.ms-excel" });

  // Create a download link
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "table_datas.xls";

  // Get the existing <a> tag with class "links"
  var existingLink = document.querySelector(".links");

  // Set the href and download attributes of the existing link
  existingLink.href = link.href;
  existingLink.download = link.download;

  // Trigger a click event on the existing link
  existingLink.click();
});
