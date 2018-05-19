$(document).ready(function(){
    
    $(document).on("click",".devour", function(event){
        event.preventDefault();
        var id = $(this).attr("data-id");
        // console.log("This ID: "+ id);
        $.ajax({
            url:`/api/burgers/${id}`,
            method:"PUT",
            data:{
                devoured:1
            }
        }).then(function(res){
            console.log(res)
            location.reload();
        });
    });

    $(document).on("click", ".render", function(event){
        event.preventDefault();
        var id = $(this).attr("data-id");
        $.ajax({
            url:`/api/burgers/${id}`,
            method:"PUT",
            data:{
                devoured:0
            }
        }).then(function(res){
            // console.log(res)
            location.reload();
        });
    });



});