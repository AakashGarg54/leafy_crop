$(document).ready(function () {
  // Init
  $(".image-section").hide();
  $(".newl").hide();
  $(".after_predication").hide();

  //$(".after-otp").hide();

  // Upload Preview
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").css("background-size", "450px 450px");
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".btn-getotp").click(function () {
    $(".send-message").html("OTP send");
  });

  //$(".btn-login").click(function validate_OTP() {
  //$(".after-otp").show(2000)
  //});

  $(".imageUpload").change(function () {
    $("#imagehidden").hide();
    $(".image-section").show();
    $("#btn-predict").css("margin-left", "240px");
    $("#btn-predict").show();
    readURL(this);
  });

  // Predict
  $("#btn-predict").click(function () {
    var form_data = new FormData($("#upload-file")[0]);

    // Show loading animation
    $(this).hide();
    $(".newl").show();

    // Make prediction by calling api /predict
    $.ajax({
      type: "POST",
      url: "/predict",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: function (data) {
        // Get and display the result
        $(".newl").hide();
        $("#result__print").html("Result:  " + data);
        $(".result").val("Result:  " + data);
        $(".before_predication").hide(1500);
        $(".after_predication").show(1500);
        $.ajax({
          url: "static/preventation.json",
          success: function (preventation_json) {
            $(preventation_json.Treatment).each((index, value) => {
              if (value.crop === data) {
                const preventation__treatment = `
                Generic Treatment: <br>
                <br>
                <ol>
                <li>Understand the mechanism of infection.</li>
                <li>Choose the right plants for your site.</li>
                <li>Use disease-resistant varieties</li>
                <li>Keep a clean garden: roguing, rotating crops, and sanitizing tools.</li>
                <li>Create a well-balanced soil.</li>
                </ol>
                `;

                $("#preventation__print").html(preventation__treatment);
                $("#preventation__result").html(preventation__treatment);
                $("#preventation__url").attr("href", value.url);
                $("#preventation__url_mail").html(value.url);
                console.log("True");
              }
            });
          },
        });
      },
    });
  });

  $("#back").click(function () {
    $(".before_predication").show(1000);
    $(".after_predication").hide(1000);
  });
});

//$(document).on("submit", "#login-number", function (e) {
// e.preventDefault();
// console.log("Hey I am triggered");
//});
