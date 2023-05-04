$(document).ready(function () {

    $(document).on("click", "#verify", function () {
        var verify_email = $("#verify_email").val();
        var base_url = window.location.origin

        $.ajax({
            url: base_url + "/verify/ajax",
            type: "post",
            dataType: "json",
            data: { verify_email },
            success: function (res) {
                var get_otp = res.otp;
                $("#get_otp").val(res.otp);
               // $("#get_otp").attr('data-get_otp', get_otp);
                // $('#get_otp').append('<label data-get_otp="' + get_otp + '">' + get_otp + '</option>');
                // <label class="form-label" for="form3Example1n1"><%= get_otp.value %> </label>               
            }
        })      
    })
})

// var real_otp = $("#type_otp").attr("'data-get_otp");
// alert("oow", real_otp);
// var enter_otp = $("#type_otp").val();