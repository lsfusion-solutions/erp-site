<?php

$allowerEmails = array(
    "info@lsfusion.org", "elena@mite.club", // для MyCompany
    "sasha.romanenko@gmail.com", "office@luxsoft.by", "info@fit.ru",//для сайта ERP
);

$defaultEmails = array("info@lsfusion.org");

$replaceSign = "#";

$subject = "Запрос с Mycompany (" .date("Y-m-d H:i:s") . ")";

$message = "";

foreach ($_POST as $_name => $_value){
    switch( $_name ){
        case "subject":
            $subject = $_value . " (" .date("Y-m-d H:i:s") . ")";
            break;
        case "thankyou":
        case "to":
            break;
        default:
            $message .= "<strong>{$_name}:</strong> {$_value} <br />";
    }
}

$preferences = array("input-charset" => "UTF-8", "output-charset" => "UTF-8");
$subject = iconv_mime_encode("", $subject, $preferences);
$subject = substr($subject, 2);

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

if( isset($_POST["to"]) ){

    print_r($_POST);

    echo mb_detect_encoding($_POST["subject"]);

    if( is_array($_POST["to"]) ){
        foreach($_POST["to"] as $_email){
            $_email = str_replace($replaceSign, "@", $_email);
            if( in_array($_email, $allowerEmails) ){
                @mail($_email, $subject, $message, $headers);
            }

        }
    }else{
        $_email = str_replace($replaceSign, "@", $_POST["to"]);
        if( in_array($_email, $allowerEmails) ){
            $result = @mail($_email, $subject, $message, $headers);
        }
    }

}else{

    foreach($defaultEmails as $_email){
        @mail($_email, $subject, $message, $headers);
    }
}



if( isset($_POST["thankyou"]) ) {
    header("Location: {$_POST["thankyou"]}");
}else{
    echo "Are you bot?";
}