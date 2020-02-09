<?php

$recepient = trim($_POST["recepient"]) || "info@nahaba.agency";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);

$subject = "New contact from http://www.nahaba.agency/";
$msg = <<<STARTOUT
<table style="border:1px solid rgba(0,0,0,0.3); width: 800px;border-spacing: 0;border-collapse: collapse;">

    <tr>
    <td style="padding: 5px 5px 25px 5px;font-size: 150%;text-align: center;" colspan="2">Данные пользователя:</td>
    </tr>
    
    <tr style="border-bottom: 1px solid rgba(0,0,0,0.3);">
    <td style="padding: 5px;width: 50%;">Name:</td>
    <td style="padding: 5px;width: 50%; font-size: 130%;"><b>$name</b></td>
    </tr>
    
    <tr style="border-bottom: 1px solid rgba(0,0,0,0.3);">
    <td style="padding: 5px;width: 50%;">Phone:</td>
    <td style="padding: 5px;width: 50%;"><a href="tel:$phone">$phone</a></td>
    </tr>
STARTOUT;

if ($email != '') {
    $msg .= <<<IFMAIL
    <tr>
    <td style="padding: 5px;width: 50%;">Email:</td>
    <td style="padding: 5px;width: 50%;"><a href="mailto:$email">$email</a></td>
    </tr>
IFMAIL;
}

$msg .= '</table>';

$headers = array(
    "Content-type: text/html; charset=iso-8859-1",
    "From: nahaba.agency",
    "Reply-To: wolojanex5@gmail.com", // чтобы при попытке ответить на письмо был подставлен адрес пользователя
);



if ( mail($recepient, $subject, $msg, implode("\r\n", $headers)) ) {
    echo 'done';
}
else {
    echo 'Не отправлено';
}
