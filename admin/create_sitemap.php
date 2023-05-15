<?php
//https://developers.google.com/webmaster-tools/v1/sitemaps/submit?hl=ru

//PUT https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Flsfusion-erp.com%2F/sitemaps/https%3A%2F%2Flsfusion-erp.com%2Fsitemap.xml

//https://www.google.com/ping?sitemap=https%3A%2F%2Flsfusion-erp.com%2Fsitemap.xml
    $f = fopen("../sitemap.xml", "w");
function ob_file_callback($buffer){
    global $f;
    fwrite($f, $buffer);
}
    ob_start('ob_file_callback');


echo "<?xml version='1.0' encoding='UTF-8'?>\n"; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php
    $f = fopen("../sitemap.xml", "w");

    $ingores = [
            ".", "..", "google6c9d04d5ad4904a7.html", ".git", ".gitignore", ".idea", ".htaccess", "CNAME", "admin", "404.html", "css", "js", "imgs", "includes", "attachments", "thank-you.html", "sitemap.xml",
            "index.html",
            "case_template.html",
            "cookie.html",
            "reviews.html",
            "equipment.html",

        ];

function processDir($path){
    global $ingores;

    $path = trim($path, "/");
    $path .= "/";
    $outputPath = trim($path, ".");



    $d = opendir($path);
    while (($file = readdir($d)) !== false){
        if(in_array($file, $ingores) == true){
            continue;
        }

        if(is_file($path . $file)) {
            $pathinfo = pathinfo($path . $file);
            if($pathinfo["extension"] != "html"){
                continue;
            }

            $lastmod = filemtime($path . $file);
            ?>
    <url>
            <loc>https://lsfusion-erp.com<?php echo $outputPath . $file;?></loc>
            <lastmod><?php echo date("Y-m-d", $lastmod)?></lastmod>
    </url>
            <?php
        }elseif(is_dir($path . $file)){
            processDir($path . $file);
        }else{
            //echo "unknown:" . $path . $file . "<br>";
        }
    }
}
processDir("..");
?>

</urlset><?php
    ob_end_flush();
    fclose($f);