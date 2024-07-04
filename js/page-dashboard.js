moment.locale("id");
let formattedDate = moment(new Date()).format("dddd, DD MMMM YYYY");
$("#date").text(formattedDate);

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
    // opened: function () {
    //   $(".link").removeClass("calendar-close sheet-close popover-close");
    // },
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
    url: "function/overview.php",
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
        if (response.totalRevenue == null) {
          $("#totalRev").text(convertToRupiah(0));
        } else {
          $("#totalRev").text(convertToRupiah(response.totalRevenue));
        }
        $("#totalOrd").text(response.totalOrders);
        $("#totalPrd").text(response.totalProducts);

        labels = response.labels;
        ordersData = response.ordersData;
        revenueData = response.incomeData;

        updateChart(labels, ordersData, revenueData);
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
    url: "function/overview.php",
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
        if (response.totalRevenue == null) {
          $("#totalRev").text(convertToRupiah(0));
        } else {
          $("#totalRev").text(convertToRupiah(response.totalRevenue));
        }
        $("#totalOrd").text(response.totalOrders);
        $("#totalPrd").text(response.totalProducts);
        labels = response.labels;
        ordersData = response.ordersData;
        revenueData = response.incomeData;

        updateChart(labels, ordersData, revenueData);
      }, 600);
    },
    error: function (xhr, status, error) {
      console.error("single data request failed with error:", error);
      // Handle error here if needed
    },
  });
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

let calendarNow = moment(new Date()).format("YYYY-MM-DD");
console.log(calendarNow);
dataSingle(calendarNow);

function updateChart(labels, ordersData, revenueData) {
  var ctx = document.getElementById("analyticsChart").getContext("2d");

  // Destroy existing chart instance if it exists
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Create a new chart instance
  window.myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Orders",
          data: ordersData,
          borderColor: "#859DD2",
          borderWidth: 2,
          yAxisID: "y",
        },
        {
          label: "Revenue",
          data: revenueData,
          borderColor: "#EBB152",
          borderWidth: 2,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  });
}
