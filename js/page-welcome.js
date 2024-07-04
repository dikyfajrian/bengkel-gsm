$(document).ready(function () {
  // Format the time using Moment.js
  moment.locale("id");
  var formattedTime = moment(new Date()).format("H:mm:ss");
  var formattedDate = moment(new Date()).format("dddd, DD MMMM YYYY");
  let service;

  // Update the element with the class "time" using jQuery
  $(".time").text(formattedTime);
  $(".date").text(formattedDate);

  // // Remove the background image
  // $(".welcome-bg").css("background-image", "none");
  // // Set a background color if needed
  // $(".welcome-bg").css("background-color", "#fff");
  // $(".welcome").hide();
  // $(".date-nav").text(formattedDate);
  // $(".service").fadeIn();

  $.ajax({
    type: "GET",
    url: "function/get-cashier.php",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        // Get the select element
        var selectElement = $("#cname");

        // Clear existing options
        selectElement.empty();

        // Add a placeholder option
        selectElement.append('<option value="">Pilih Kasir</option>');

        // Append each cashier name to the select element
        for (var i = 0; i < response.cashier.length; i++) {
          selectElement.append(
            '<option value="' +
              response.cashier[i].id_cashier +
              '">' +
              response.cashier[i].nama +
              "</option>"
          );
        }
      } else {
        if (response.message == "No cashier found") {
          // Display "No products available" message
          console.log("belum ada kasir");
        }
        console.log(response.message);
      }
    },
    error: function () {
      console.log("Error retrieving product data");
    },
  });

  $(".continue").on("click", function () {
    $(this).hide();
    $(".lock-loader").show();

    setTimeout(() => {
      // Remove the background image
      $(".welcome-bg").css("background-image", "none");
      // Set a background color if needed
      $(".welcome-bg").css("background-color", "#fff");

      $(".welcome").addClass("fadeout");
    }, 1000);

    setTimeout(() => {
      $(".welcome").hide();
      $(".date-nav").text(formattedDate);
      $(".service").fadeIn();
    }, 1400);
  });

  // Handle click event on service buttons
  $(".btn-service").on("click", function () {
    // Log the selected value
    service = $(this).data("service");

    // Remove selected class from all services
    $(".btn-service").removeClass("selected");

    // Add selected class to the clicked service
    $(this).addClass("selected");

    // Enable the "Continue" button and change its background color
    $(".cont-service")
      .removeClass("disabled")
      .css("background-color", "#FCA311");
  });

  $(".cont-service").on("click", function () {
    if (service == "dashboard") {
      setTimeout(() => {
        $(this).addClass("fadeout");
        $(".content-service").addClass("fadeout");
      }, 200);

      setTimeout(() => {
        $(".content-service").hide();
        $(".form-back").removeClass("fadeout");
        $(".form-dashboard").removeClass("fadeout");
        $(".form-back").fadeIn();
        $(".form-dashboard").fadeIn();
      }, 400);
    } else if (service == "pos") {
      setTimeout(() => {
        $(this).addClass("fadeout");
        $(".content-service").addClass("fadeout");
      }, 200);

      setTimeout(() => {
        $(".content-service").hide();
        $(".form-back").removeClass("fadeout");
        $(".form-pos").removeClass("fadeout");
        $(".form-back").fadeIn();
        $(".form-pos").fadeIn();
      }, 400);
    }
  });

  $(".form-back").on("click", function () {
    let isform = $(this).attr("id");
    $("#code-dashboard").val("");
    $("#code-pos").val("");
    $("#cname").val("");

    $(".btn-service").removeClass("selected");
    $(".cont-service").addClass("disabled").css("background-color", "#D9D9D9");

    if (isform == "pos") {
      setTimeout(() => {
        $(this).addClass("fadeout");
        $(".form-pos").addClass("fadeout");
      }, 200);

      setTimeout(() => {
        $(".form-pos").hide();
        $(".content-service").removeClass("fadeout");
        $(".content-service").fadeIn();
        $(".cont-service").removeClass("fadeout");
        $(".cont-service").fadeIn();
      }, 400);
    } else {
      setTimeout(() => {
        $(this).addClass("fadeout");
        $(".form-dashboard").addClass("fadeout");
      }, 200);

      setTimeout(() => {
        $(".form-dashboard").hide();
        $(".content-service").removeClass("fadeout");
        $(".content-service").fadeIn();
        $(".cont-service").removeClass("fadeout");
        $(".cont-service").fadeIn();
      }, 400);
    }
  });

  $(".cont-dash").on("click", function () {
    let code = $("#code-dashboard").val();

    // Check if the code is not empty
    if (code.trim() === "") {
      app.dialog.alert("Masukkan kode akses", "Oops");
      return; // Stop further execution
    }

    // Make AJAX request
    $.ajax({
      url: "function/check-access.php",
      type: "POST",
      data: { code: code, type: "admin" },
      success: function (response) {
        // Handle the success response from the server
        if (response === "Success!") {
          // Access code is correct
          window.location.href = "index.php?page=dashboard";
        } else {
          // Access code is incorrect
          app.dialog.alert("Akses kode salah", "Oops");
        }
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error(error);
      },
    });
  });

  $(".cont-pos").on("click", function () {
    let selectedOption = $("#cname option:selected");
    let idCashier = selectedOption.val();
    let nama = selectedOption.text();
    let cname = $("#cname").val();
    let code = $("#code-pos").val();

    // Check if the code is not empty
    if (code.trim() === "") {
      app.dialog.alert("Masukkan kode akses", "Oops");
      return; // Stop further execution
    } else if (cname.trim() === "") {
      app.dialog.alert("Silahkan pilih kasir", "Oops");
      return; // Stop further execution
    }

    // Make AJAX request
    $.ajax({
      url: "function/check-access.php",
      type: "POST",
      data: { code: code, type: "cashier" },
      success: function (response) {
        // Handle the success response from the server
        if (response === "Success!") {
          localStorage.setItem("gsm_pos_logged", true);
          localStorage.setItem("gsm_cashier_name", nama);
          localStorage.setItem("gsm_cashier_id", idCashier);
          // Access code is correct
          // Redirect to pos.php
          window.location.href = "index.php?page=pos";
        } else {
          // Access code is incorrect
          app.dialog.alert("Akses kode salah", "Oops");
        }
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error(error);
      },
    });
  });
});
