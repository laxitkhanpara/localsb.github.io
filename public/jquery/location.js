
$(document).ready(function () {

    $(document).on("input", "#country_tap", function () {
        //var value = $("#country_tap").val();
        var value = $("#country_tap option:selected").attr("data-countryId");
        var base_url = window.location.origin
        $.ajax({
            url: base_url + "/state/ajax/" + value,
            type: "get",
            dataType: "json",
            success: function (res) {
                $('#state_tap').empty()
                $("#state_tap").html("<option value selected disabled>select state</option>")
                $.each(res.states, function (data, value) {

                    $('#state_tap').append('<option value="' + value.name + '" data-state="' + value.isoCode + '" data-country="' + value.countryCode + '">' + value.name + '</option>');

                })

            }
        })
    })
    
    $(document).on("input", "#state_tap", function () {
        var value = $("#state_tap option:selected").attr("data-state");
        var country = $("#state_tap option:selected").attr("data-country");
        var base_url = window.location.origin
        $.ajax({
            url: base_url + "/city/ajax",
            type: "post",
            dataType: "json",
            data: { country, value },
            success: function (res) {

                $.each(res.citys, function (data, value) {
                    // console.log(value.name);
                    // alert(value.name);
                    $("#city_tap").append('<option value="' + value.name + '" >' + value.name + '</option>');
                })
            }
        })
    })



    // $(document).on("input","#state_tap",function(){
    //     var value=$("#state_tap").val();
    //     var base_url=window.location.origin
    //     $.ajax({
    //         url:base_url+"/city/ajax/"+value,
    //         type:"get",
    //         dataType:"json",
    //         success: function(res){
    //             $('#city_tap').empty()
    //             $("#city_tap").html("<option value selected disabled>select city</option>")
    //             $.each(res.states, function (data, value) {

    //                 $('#city_tap').append('<option value="' + value.isoCode + '">' + value.name + '</option>');
    //             })

    //         }
    //     })

    // })
})

//module.exports={country,value}