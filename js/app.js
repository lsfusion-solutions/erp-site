$(document).ready(function() {
    $("a").each(function () {
        if (this.href == document.location.href) {
            $(this).addClass('active');
        }
    });

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
        let nextSlide;
        while( (nextSlide = getRandomInt(8) + 1) == 5){}
        $("#section-why-header > .inner").addClass("bg" + nextSlide).removeClass("bg" + currentSlideWhy);
        currentSlideWhy = nextSlide;
    }, 5000);



    $(".contactus").click(function(e){
        $("#contactuspopup").popup({closeelement:".close"}).popup("show");
        e.preventDefault()
        return false;
    })
    if( $("#contactuspopup").length > 0) {
        $("#contactuspopup form").validate({
            submitHandler: function( form ){
                form.submit();
                return;
                $("#contactuspopup form").addClass("loading");

                $.ajax({
                    url: $(form).attr("action"),
                    data: $(form).serialize(),
                    type: $(form).attr("method"),
                    success: function() {
                        $("#contactuspopup").popup("hide");
                        $("#contactuspopup form").removeClass("loading").get(0).reset();
                        alert("Спасибо! \nВаше сообщение отправлено. ")
                    }
                });
                return;
            }
        });
    }



    $("#section-companies nav span").click(function(){
        if( $(this).hasClass("active") ){
            return;
        }
        $("#section-companies nav span.active").removeClass("active")
        $(this).addClass("active")


        if($(this).index() == 0){//fmcg
            $("#section-companies ul").removeClass("farma").removeClass("fashion").addClass("fmcg").removeClass("other");

            companiesSlider.slideTo($("#section-companies ul li.fmcg").index() - 2, 250);

        }else if($(this).index() == 1){//fashion
            $("#section-companies ul").removeClass("farma").removeClass("fmcg").addClass("fashion").removeClass("other");

            companiesSlider.slideTo($("#section-companies ul li.fashion").index() - 2, 250);

        }else if($(this).index() == 2){//farma
            $("#section-companies ul").removeClass("fashion").removeClass("fmcg").addClass("farma").removeClass("other");

            companiesSlider.slideTo($("#section-companies ul li.farma").index() - 2, 250);

        }else if($(this).index() == 3){//other
            $("#section-companies ul").removeClass("fashion").removeClass("fmcg").removeClass("farma").addClass("other");

            companiesSlider.slideTo($("#section-companies ul li.other").index() - 2, 250);
        }
    })

    $("#section-best nav span").click(function(){
        if( $(this).hasClass("active") ){
            return;
        }
        $("#section-best nav span.active").removeClass("active")
        $(this).addClass("active")
        $("#section-best .videos .swiper:visible").removeClass("active");
        $("#section-best .videos .swiper").eq( $(this).index() ).addClass("active");
    })

    function getYouTubeCode(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
    $("#section-best .videos a, a.video").click(function(e){
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
    $("ul.dd-list > li > h3").click(function(){
        $(this).closest("li").toggleClass("active")
    })

    //FAQ page
    $("#section-faq nav span").click(function(){
        if( $(this).hasClass("active") ){
            return;
        }
        $(this).closest("nav").find("span.active").removeClass("active")
        $(this).addClass("active")
        $(this).closest("section").find("div.tab").hide().eq( $(this).index() ).show()
    })
    if( document.location.href.indexOf("faq") > 0) {
        if (document.location.hash.length > 0) {
            $("#" + document.location.hash.substring(1)).trigger("click")
            $("#" + document.location.hash.substring(1)).find("h3").eq(0).trigger("click")
        }
        $("a.relative").click(function(){
            $("#" + document.location.hash.substring(1)).trigger("click")
            //$("#" + document.location.hash.substring(1)).find("h3").eq(0).trigger("click")
            if ($("#" + document.location.hash.substring(1)).is(":visible") == false) {
                let _index = $("#" + document.location.hash.substring(1)).closest("div.tab").index("div.tab")
                $("#section-faq nav span").eq(_index).trigger("click");
            }
        })
        $(window).on('hashchange', (function () {
            $("#" + document.location.hash.substring(1)).trigger("click")
            $("#" + document.location.hash.substring(1)).find("h3").eq(0).trigger("click")
            if ($("#" + document.location.hash.substring(1)).is(":visible") == false) {
                let _index = $("#" + document.location.hash.substring(1)).closest("div.tab").index("div.tab")
                $("#section-faq nav span").eq(_index).trigger("click");
            }
        }))
    }

    $("a#report").click(function(e){
        e.preventDefault()
        $("#reportpopup").popup({closeelement: ".close"}).popup("show");
        return false;
    })
    if( $("#reportpopup form").length > 0) {
        $("#reportpopup form").validate();
    }

    $("#equipment-switcher").click(function(){
        $(this).toggleClass("active");
        if( $(this).hasClass("active") ){
            $("#equipment-switcher-1").show();
            $("#equipment-switcher-2").hide();
        }else{
            $("#equipment-switcher-1").hide();
            $("#equipment-switcher-2").show();
        }
    })

    $("ul#modules > li > h2").click(function(){
        $(this).closest("li").toggleClass("active");
    })
    if(document.location.hash.length > 0) {
        if ($("ul#modules > li#" + document.location.hash.substring(1)).length > 0) {
            $("ul#modules > li#" + document.location.hash.substring(1)).addClass("active");
        }
    }

})