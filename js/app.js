$(document).ready(function() {
    $(document).click(function(e){

        let target = e.target;

        if( $(target).is(".language") || $(target).closest(".language").size() > 0 ){
            $("div.language").toggleClass("active");
        }else{
            $("div.language").removeClass("active");
        }
    })
    $(".menu-link").click(function(e){$(this).toggleClass("active");e.preventDefault()})

    setInterval(function(){
        let currImg = $("#section-header > .inner").css("backgroundImage");
        let oldIndex = parseInt( currImg.match(/\d+/)[0] );

        let newIndex = oldIndex % 12 + 1;

        currImg = currImg.replace("-" + oldIndex, "-" + newIndex);

        $("#section-header > .inner").css("backgroundImage", currImg);

    }, 1000);
    $(".contactus").click(function(e){
        alert("TODO: Contact Form will appear")
        e.preventDefault()
        return false;
    })
})