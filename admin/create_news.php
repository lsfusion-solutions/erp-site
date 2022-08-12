<?php
    $title = "Новости продукта lsFusion ERP";

    $f = fopen("all.csv", "r");


    $allNews = [];

if (($f = fopen("all.csv", "r")) !== FALSE) {
    fgetcsv($f, 1000, ",");//skipping first line

    $news = null;
    while (($data = fgetcsv($f, 1000, ",")) !== FALSE) {
        if( strlen($data[0]) > 0 ){//new news

            if( isset($news) ){
                $allNews[] = $news;
                $news = $data;
            }else{
                $news = $data;
            }

        }else{
            $news[3] .= "\n" . $data[3];
        }
    }
    if(isset($news)){
        $allNews[] = $news;
    }
    fclose($f);
}
function getNewsFilename($news, $index){

    $textcyr="Тествам с кирилица";
    $textlat="I pone dotuk raboti!";
    $cyr = [" ", 'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п', 'р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я', 'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П', 'Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'
    ];
    $lat = ["_", 'a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p', 'r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya', 'A','B','V','G','D','E','Io','Zh','Z','I','Y','K','L','M','N','O','P', 'R','S','T','U','F','H','Ts','Ch','Sh','Sht','A','I','Y','e','Yu','Ya'
    ];

    $filename = str_replace(["«", "»", "?", ":"], ["", "", "", ""], $news[1]);


    $filename = strtolower(str_replace($cyr, $lat, strtolower($filename))) . ".html";
    return $filename;
}


//adding last 3 images to home page

$newsHTML = "";
foreach($allNews as $_index => $news){
    if($_index >= 3){
        break;
    }

    $filename = getNewsFilename($news, $_index);
    $newsHTML .= '<li>
                        <a href="/news/' . $filename . '" class="inner">
                            <h3>' . nl2br($news[1]) . '</h3>
                            <p>' . nl2br($news[2]) . '</p>
                            <em>' . nl2br($news[0]) . '</em>
                        </a>
                    </li>';

}

$indexHTML = implode("", file("../index.html"));
$header = substr($indexHTML, 0, strpos($indexHTML, "<!-- start news -->") + strlen('<!-- start news -->'));
$footer = substr($indexHTML, strpos($indexHTML, "<!-- end news -->"));
$f = fopen("../index.html", "w");
fwrite($f, $header . $newsHTML . $footer);
fclose($f);









$headerHTML = implode("", file("../includes/header.html"));
$footerHTML = implode("", file("../includes/footer.html"));

$f = fopen("../news.html", "w");
$headerHTML = str_replace(["{title}", "{description}", "{keywords}"], [$title, "", ""], $headerHTML);
fwrite($f, $headerHTML);

fwrite($f, '<section id="section-news">
        <div class="inner">
            <h2>Новости</h2>
            <div class="ulbox">
                <ul class="list4">');

foreach($allNews as $_index => $news){
    $filename = getNewsFilename($news, $_index);
    $html = '<li>
                        <a href="/news/' . $filename . '" class="inner">
                            <div class="img"><img src="/imgs/news/1.jpg" alt="" title="" /></div>
                            <h3>' . nl2br($news[1]) . '</h3>
                            <p>' . nl2br($news[2]) . '</p>
                            <em>' . nl2br($news[0]) . '</em>
                        </a>
                    </li>';
    fwrite($f, $html);
    
}
fwrite($f, '</ul></div></div>');
fwrite($f, $footerHTML);

foreach($allNews as $_index => $news){
    $filename = "../news/" . getNewsFilename( $news, $_index);

    $headerHTML = str_replace(["{title}", "{description}", "{keywords}"], [$news[1], "", ""], $headerHTML);
    $f = fopen($filename, "w");
    fwrite($f, $headerHTML);


    $html = '<section id="section-single-news">
        <div class="inner">
            <h1>' . nl2br($news[1]) . '</h1>
            <div class="news">
                <div class="img">
                    <img src="/imgs/news/1_big.jpg" alt="" title="" />
                </div>
                <div class="info">
                    <h2>' . nl2br($news[0]) . '</h2>
                    <p>' . nl2br($news[3]) . '</p>
                    <a href="/news.html">Все новости</a>
                </div>
            </div>

        </div>
    </section>';

    fwrite($f, $html);

    fwrite($f, $footerHTML);
    fclose($f);
}




    echo "\ndone";