function setCookie (name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
function getCookie(name){
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

function showMessage(title, msg, options){

    if( $("#popupmessage").size() == 0 ){
        $("body").append( '<div class="popup" id="popupmessage"><span class="close">x</span><div class="inner"><h3></h3><p></p><span class="btn">Закрыть</span><div id="popupmessage-special"></div> </div></div>' );
        $("#popupmessage").popup({blur: false});
        $("#popupmessage .close, #popupmessage .btn").click(function(){
            $("#popupmessage").popup("hide");
        })
    }

    if(!options){
        options = {btn: "Закрыть", click: null}
    }
    if(options.html){
        $("#popupmessage span.btn").hide()
        $("#popupmessage-special").html( options.html );
    }else{
        $("#popupmessage span.btn").text(options.btn).click(options.click).show();
        $("#popupmessage-special").html("");
    }

    $("#popupmessage h3").text(title);
    $("#popupmessage p").html(msg);
    $("#popupmessage").popup("show");
}

$(document).ready(function() {
    if(getCookie("acceptCookie") == null ){
        $("body").append("<div id='acceptCookie'><div class='inner'>Мы используем файлы cookie, чтобы сделать наш сайт максимально удобным для вас. <!--a href='/politics.html' target='_blank'>Узнать больше</a-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='ok'>OK</span></div></div>")
        $("#acceptCookie span.ok").click(function(){
            setCookie("acceptCookie", 1);
            $("#acceptCookie").css("bottom", "-100px");
        })
    }

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
                //form.submit();
                //return;
                $(form).addClass("loading");

                $.ajax({
                    url: $(form).attr("action"),
                    data: $(form).serialize(),
                    type: $(form).attr("method"),
                    success: function() {
                        $("#contactuspopup").popup("hide");
                        $("#contactuspopup form").removeClass("loading").get(0).reset();
                        showMessage("Спасибо!", "Ваше сообщение отправлено.")
                        //alert("Спасибо! \nВаше сообщение отправлено. ")
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

        //depends on the screen width we need to scroll to different positions (to make first active element visible)
        let _leftPos = Math.min(250, $("#section-companies nav span").offset().left);
        let _skipCount = 2;
        if($("#section-companies nav span").offset().left < 300){
            _skipCount = 1;
        }
        if($("#section-companies nav span").offset().left < 150){
            _skipCount = 0;
        }

        if($(this).index() == 0){//fmcg
            $("#section-companies ul").removeClass("farma").removeClass("fashion").addClass("fmcg").removeClass("other");

            companiesSlider.slideTo($("#section-companies ul li.fmcg").index() - _skipCount, _leftPos);

        }else if($(this).index() == 1){//fashion
            $("#section-companies ul").removeClass("farma").removeClass("fmcg").addClass("fashion").removeClass("other");

            companiesSlider.slideTo($("#section-companies ul li.fashion").index() - _skipCount, _leftPos);

        }else if($(this).index() == 2){//farma
            $("#section-companies ul").removeClass("fashion").removeClass("fmcg").addClass("farma").removeClass("other");

            companiesSlider.slideTo($("#section-companies ul li.farma").index() - _skipCount, _leftPos);

        }else if($(this).index() == 3){//other
            $("#section-companies ul").removeClass("fashion").removeClass("fmcg").removeClass("farma").addClass("other");

            companiesSlider.slideTo($("#section-companies ul li.other").index() - _skipCount, _leftPos);
        }
    })

/*
1. Удалите знаки комментария - https://www.screencast.com/t/8yqEduqmO1
2. Проставьте нужные класыы для все li элементов - https://www.screencast.com/t/n1LXBZmmUl возможные классы - fmcg, fashion, farma, other
3. Если нужно поменять порядок, то нужно добавить соответсвующие аттрибуты - https://www.screencast.com/t/JMqIxqWw7B2 - начинается нумерация с "1". Если номер не проставлен, то элемент будет после всех номеров.
*/
    $("#section-case nav span").click(function(){
        if( $(this).hasClass("active") ){
            return;
        }
        $("#section-case ul").removeClass($("#section-case nav span.active").attr("data-class"))
        $("#section-case nav span.active").removeClass("active")
        $(this).addClass("active")
        $("#section-case ul").addClass( $("#section-case nav span.active").attr("data-class") )

        //changing order of elements
        let ul = $("#section-case ul");
        if( ul.attr("data-all") == undefined ){
            ul.attr("data-all", ul.html())
        }

        let className = $("#section-case nav span.active").attr("data-class");
        if(className == "all" || className == ""){//need to restore
            ul.html( ul.attr("data-all") )
        }else{//need to reorder elements
            let li = $("<ul>" + ul.attr("data-all") + "</ul>" ).find("." + className)
            ul.find("li").remove();
            for(let i = 1; i <= li.length; i++){
                for(let j = 0; j < li.length; j++) {
                    let _index = li.eq(j).attr("order-" + className) || li.length
                    if(_index == i){
                        ul.append( li.eq(j) )
                    }

                }
            }
            for(let j = 0; j < li.length; j++) {
                let _index = li.eq(j).attr("order-" + className) || li.length
                if(_index > li.length){
                    ul.append( li.eq(j) )
                }

            }
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

    function getUrlVars(url) {
        var vars = {};
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m,key,value) {
                vars[key] = value;
            });
        return vars;
    }


    function getYouTubeCode(url){
        let t = getUrlVars(url)["t"];
        let start = "";
        if(t){
            start = "?start=" + parseInt( t )
        }
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] + start : false;
    }
    function getDzenCode(url){
        return url;
    }
    function getVKCode(url){
        if(getUrlVars(url)["z"]) {
            let vals = getUrlVars(url)["z"].substring(5).split("_");
            return "oid=" + vals[0] + "&id=" + vals[1];
        }
        //example: https://vk.com/video870533294_456239048
        url = url.substring(url.indexOf("video") + 5);
        let vals = url.split("_");
        return "oid=" + vals[0] + "&id=" + vals[1];
    }
    $(document).on("click", "#section-best .videos a, a.video, a.youtube, a.dzen, a.vk", function(e){
        if( $("#videopopup").length == 0 ){
            $("body").append(
                '<div id="videopopup" class="popup"><span class="close">x</span><div class="inner"></div></div>'
            )
            $("#videopopup").popup({
                closeelement: ".close",
                onclose: function(){
                    $("#videopopup .inner").html("");
                }
            });
        }

        let _html = "";
        if($(this).attr("alt-youtube") || $(this).attr("alt-dzen") || $(this).attr("alt-vk")){
            _noticeHTML = '<span class="notice"><em class="c" title="Скрыть">x</em>Медленно работает видео? Смотреть в';
            if($(this).attr("alt-youtube")){
                _noticeHTML += ' <a href="' + $(this).attr("alt-youtube") + '" class="youtube">YouTube</a>'
            }
            if( $(this).attr("alt-dzen") ){
                let _id = "";
                if( $(this).attr("data-id") ){
                    _id = $(this).attr("data-id")
                }else {
                    _id = $(this).closest(".video-wrapper").find(".dzen").attr("data-id")
                }

                if(_id) {
                    _noticeHTML += ' <a href="' + $(this).attr("alt-dzen") + '" data-id="' + _id + '" class="dzen">Дзен</a>'
                }
            }
            if($(this).attr("alt-vk")){
                _noticeHTML += ' <a href="' + $(this).attr("alt-vk") + '" class="vk">ВК</a>'
            }
            _noticeHTML += "</span>"

            _html += _noticeHTML;
        }

        $("#videopopup").removeClass("video-dzen").removeClass("video-vk").removeClass("video-youtube")
        if($(this).is(".dzen")){
            $("#videopopup").addClass("video-dzen")
            _html += '<iframe src="https://dzen.ru/embed/' + getDzenCode($(this).attr("data-id")) + '?mute=0&autoplay=1&tv=0" allow="autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture; encrypted-media" frameborder="0" scrolling="no" allowfullscreen></iframe>';
        }else if($(this).is(".vk")){
            $("#videopopup").addClass("video-vk")
            _html += '<iframe src="https://vk.com/video_ext.php?' + getVKCode($(this).attr("href")) + '&autoplay=1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>';
        }else{//by default it is youtube video
            $("#videopopup").addClass("video-youtube")
            _html += '<iframe src="https://www.youtube.com/embed/' + getYouTubeCode($(this).attr("href")) + '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        }

        $("#videopopup .inner").html( _html )
        $("#videopopup").popup("show");

        e.preventDefault()
        return false;
    })
    $(document).on("click", "#videopopup .notice .c", function(){
        $(this).closest(".notice").hide();
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
    $("#section-technology nav span").click(function(){
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
        }else{
            if($("ul#modules > li ul.dd-list li#" + document.location.hash.substring(1)).length > 0){
                $("ul#modules > li ul.dd-list li#" + document.location.hash.substring(1)).addClass("active");
                $("ul#modules > li ul.dd-list li#" + document.location.hash.substring(1)).closest("ul").closest("li").addClass("active")
            }
        }
    }
    //adding popup form to the footer


    let _html = '<form method="post" action="https://luxsoft.by/brended_sites/unstatic.php" id="newsletter-form" class="popup">' +
        '<input type="hidden" name="to[]" value="office#luxsoft.by" />' +
        '<input type="hidden" name="to[]" value="info@lsfusion-erp.com" />' +
        '<input type="hidden" name="subject" value="ERP: новая подписка" />' +
        '<input type="hidden" name="thankyou" value="https://lsfusion-erp.com/thank-you.html" />' +
        '<span class="close">x</span><div class="inner"><fieldset><legend>Подписывайтесь на новости</legend><input type="email" required name="email" placeholder="Email*" /><label for="agree-newsletter"><input type="checkbox" name="newsletter" value="yes" required id="agree-newsletter" />Я согласен с <a href="/politics.html" target="_blank">политикой конфиденциальности</a> </label> <input type="submit" value="Подписаться" /></fieldset></div> </form>'
    $("body").append( _html )
    $("#newsletter-form").validate({
        submitHandler: function(form){
            setCookie("newsletter", "yes")

            $(form).addClass("loading");

            $.ajax({
                url: $(form).attr("action"),
                data: $(form).serialize(),
                type: $(form).attr("method"),
                success: function() {
                    $("#newsletter-form").popup("hide");
                    $("#newsletter-form").removeClass("loading").hide().get(0).reset();
                    showMessage("Спасибо!", "Вы подписались на нашу рассылку.")
                    //alert("Спасибо! \nВаше сообщение отправлено. ")
                }
            });
            return;
        }
    });
    $("#newsletter-form .close").click(function(){
        setCookie("newsletter", "no")
        $("#newsletter-form").hide();
    })
    $("footer .social").append('<li class="newsletter"><a href="#">Подписаться на рассылку</a></li>')
    $("footer .social .newsletter").click(function(e){
        $("#newsletter-form").show();
        $("#newsletter-form input[type='email']").focus();
        e.preventDefault()
        return;
    })

    setTimeout(function () {
        if(getCookie("newsletter")){}else {
            if(document.location.href.indexOf("/news/") != -1 || document.location.href.indexOf("/news.html") != -1) {
                $("#newsletter-form").addClass("active")
            }
        }
    }, 5000)





    let _url = "https://erp.lsfusion.org/login?user=guest&password=guest";
    if($("a:contains('Попробовать демо')").length > 0){
        _url = $("a:contains('Попробовать демо')").attr("href");
    }
    _html = '<form method="post" action="https://luxsoft.by/brended_sites/unstatic.php" id="demo-form" class="popup">' +
        '<input type="hidden" name="to[]" value="office#luxsoft.by" />' +
        '<input type="hidden" name="to[]" value="info@lsfusion-erp.com" />' +
        '<input type="hidden" name="to[]" value="komirenko.roman@fit.ru" />' +
        '<input type="hidden" name="subject" value="ERP: переход на ДЕМО" />' +
        '<input type="hidden" name="thankyou" value="https://lsfusion-erp.com/thank-you.html" />' +
        '<span class="close">x</span><div class="inner">' +
        '<p>Мы ответим на все Ваши вопросы.</p>' +
        '<fieldset>' +
        '<input type="text" required name="name" placeholder="Имя*" />' +
        '<input type="email" required name="email" placeholder="Email*" />' +
        '<input type="text" name="phone" placeholder="Телефон" />' +
        '<input type="text" name="organization" placeholder="Организация" />' +
        '<label for="demo-need-help"><input type="checkbox" name="need-help" value="yes" id="demo-need-help" />Мне нужна консультация (мы свяжемся с вами в ближайшее время)</label>' +
        '<label for="demo-newsletter"><input type="checkbox" name="newsletter" value="yes" id="demo-newsletter" />Я хочу получать новостную рассылку (новые возможности, модули, анонсы, промо предложения)</label>' +
        '<label for="demo-justsee"><input type="checkbox" name="justsee" value="yes" id="demo-justsee" />Мне только посмотреть (мы не будем ни звонить, ни писать Вам, но будем рады, если Вы передумаете)</label> ' +
        '<label for="demo-agree"><input type="checkbox" name="egree" value="yes" required id="demo-agree" />Я согласен на обработку персональных данных. <a href="/politics.html" target="_blank">Ознакомиться с политикой обработки персональных данных.</a> </label> ' +
        '<div class="buttons">' +
        '<a href="' + _url + '" class="demo" target="_blank">Перейти на Демо</a>' +
        //'<input type="submit" value="Отправить" />' +
        '</div>' +
        '</fieldset></div> </form>'
    $("body").append( _html )
    $("#demo-form").popup({closeelement: ".close"})

    $("#demo-form a.demo").click(function(){
        if( $("#demo-form").valid() ){
            let form = $("#demo-form");

            $.ajax({
                url: $(form).attr("action"),
                data: $(form).serialize(),
                type: $(form).attr("method"),
                success: function() {
                    $("#demo-form").popup("hide");
                    $("#demo-form").removeClass("loading").hide().get(0).reset();

                    let _url = "https://erp.lsfusion.org/login?user=guest&password=guest";
                    if($("a:contains('Попробовать демо')").length > 0){
                        _url = $("a:contains('Попробовать демо')").attr("href");
                    }

                    //showMessage("Спасибо!", "Мы свяжемся с вами в ближайшее время. ", {html: "<a href='" + _url + "' target='_blank' class='btn'>Смотреть ДЕМО</a>"})
                }
            });

            return true;
        }else{
            return false;
        }

    })

    $("#demo-form").validate({
        submitHandler: function(form){
            $(form).addClass("loading");

            $.ajax({
                url: $(form).attr("action"),
                data: $(form).serialize(),
                type: $(form).attr("method"),
                success: function() {
                    $("#demo-form").popup("hide");
                    $("#demo-form").removeClass("loading").hide().get(0).reset();
                    showMessage("Спасибо!", "Мы свяжемся с вами в ближайшее время. ", {html: "<a href='https://erp.lsfusion.org/login?user=guest&password=guest' target='_blank' class='btn'>Смотреть ДЕМО</a>"})
                }
            });
            return;
        }
    });

    $("body > nav a.special, #section-header a:contains('Попробовать демо'), #section-header-lsf a:contains('Попробовать демо')").click(function(){
        if( $(this).closest("#section-header-lsf").length > 0 ){
            $("#demo-form input[name=subject]").val("ERP: переход на ДЕМО (со страницы WMS)")
        }
        $("#demo-form").popup("show");
        return false;
    })

    $("#search a").click(function(){
        $(this).toggleClass("active")
        if( $(this).hasClass("active") ){
            $("#term").val("").focus();
        }
        return false;
    })
    $("#search form").submit(function(){
        $("#q").val( "site:lsfusion-erp.com " + $("#term").val() )
    })

})