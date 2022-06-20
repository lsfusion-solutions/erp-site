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

    let currentSlide = 1;
    let images = new Image();
    images.src = "/imgs/header-2.svg";
    setInterval(function(){
        let nextSlide = currentSlide % 12 + 1;
        $("#section-header > .inner").addClass("bg" + nextSlide).removeClass("bg" + currentSlide);
        currentSlide = nextSlide;

        let nextPreloadSlide = nextSlide % 12 + 1;
        let images = new Image();
        images.src = "/imgs/header-" + nextPreloadSlide + ".svg";

    }, 5000);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    let currentSlideWhy = 1;
    setInterval(function(){
        let nextSlide = getRandomInt(8) + 1;
        $("#section-why-header > .inner").addClass("bg" + nextSlide).removeClass("bg" + currentSlideWhy);
        currentSlideWhy = nextSlide;
    }, 5000);



    $(".contactus").click(function(e){
        $("#contactuspopup").popup({closeelement:".close"}).popup("show");
        e.preventDefault()
        return false;
    })
    if( $("#contactuspopup").length > 0) {
        $("#contactuspopup form").validate();
    }


    $("#section-companies nav span").click(function(){
        if( $(this).hasClass("active") ){
            return;
        }
        $("#section-companies nav span.active").removeClass("active")
        $(this).addClass("active")
        if($(this).index() == 0){//fmcg
            $("#section-companies ul").removeClass("farma").removeClass("fashion").addClass("fmcg");
        }else if($(this).index() == 1){//fashion
            $("#section-companies ul").removeClass("farma").removeClass("fmcg").addClass("fashion");
        }else if($(this).index() == 2){//farma
            $("#section-companies ul").removeClass("fashion").removeClass("fmcg").addClass("farma");
        }
    })

    $("#section-best nav span").click(function(){
        if( $(this).hasClass("active") ){
            return;
        }
        $("#section-best nav span.active").removeClass("active")
        $(this).addClass("active")
        $("#section-best .videos .swiper").hide().eq( $(this).index() ).show()
    })

    function getYouTubeCode(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
    $("#section-best .videos a").click(function(e){
        if( $("#videopopup").length == 0 ){
            $("body").append(
                '<div id="videopopup" class="popup"><span class="close">x</span><div class="inner"></div></div>'
            )
            $("#videopopup").popup({closeelement: ".close"});
        }
        $("#videopopup .inner").html( '<iframe src="https://www.youtube.com/embed/' + getYouTubeCode($(this).attr("href")) + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' )
        $("#videopopup").popup("show");

        e.preventDefault()
        return false;
    })

    //FAQ page
    $("#section-faq nav span").click(function(){
        if( $(this).hasClass("active") ){
            return;
        }
        $(this).closest("nav").find("span.active").removeClass("active")
        $(this).addClass("active")
        $(this).closest("section").find("ul.faq").hide().eq( $(this).index() ).show()
    })
    $("#section-faq ul.faq > li").click(function(){
        $(this).toggleClass("active")
    })

    $("a#report").click(function(e){
        e.preventDefault()
        $("#reportpopup").popup({closeelement: ".close"}).popup("show");
        return false;
    })
    if( $("#reportpopup form").length > 0) {
        $("#reportpopup form").validate();
    }

})