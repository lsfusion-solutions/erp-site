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

if( isset($_REQUEST["email"]) && isset($_REQUEST["newsletter"]) &&  $_REQUEST["newsletter"] == "yes") {
    ini_set("error_reporting", E_ALL);
    ini_set("display_errors", true);

    $email = str_replace(" ", "+", $_REQUEST["email"]);

    $api_key = "5db56237a04758f3d1d4eb94efbedf1d-us21";//old key
    $list_id = "b2924d27ea";//"lsFusion ERP" list

    $url = "https://us21.api.mailchimp.com/3.0/lists/{$list_id}/members/" . md5($email);


    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Accept: application/vnd.api+json',
        'Content-Type: application/vnd.api+json',
        'Authorization: apikey ' . $api_key
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    //curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLINFO_HEADER_OUT, true);

    $responseContent = curl_exec($ch);

    curl_close($ch);

    $returnObj = json_decode(substr($responseContent, strpos($responseContent, "{")));

    if($returnObj->status == 404){//subscribe is not found

        $url = "https://us21.api.mailchimp.com/3.0/lists/{$list_id}/members/";
        $args = array(
            'email_address' => $email,
            'status'        => 'subscribed',

            'merge_fields'  => array(
                "FNAME"         => isset($_REQUEST["first_name"]) ? $_REQUEST["first_name"] : "Guest"
            )

        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/vnd.api+json',
            'Content-Type: application/vnd.api+json',
            'Authorization: apikey ' . $api_key
        ));
        curl_setopt($ch, CURLOPT_USERAGENT, 'DrewM/MailChimp-API/3.0 (github.com/drewm/mailchimp-api)');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        //curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
        curl_setopt($ch, CURLOPT_ENCODING, '');
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);

        curl_setopt($ch, CURLOPT_POST, true);

        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($args));

        $responseContent = curl_exec($ch);

        curl_close($ch);
        //var_dump($responseContent);
        //var_dump($returnObj);
    }
    //var_dump($responseContent);
    //var_dump($returnObj);
}

if( isset($_POST["thankyou"]) ) {
    header("Location: {$_POST["thankyou"]}");
}else{
    echo "Are you bot?";
}