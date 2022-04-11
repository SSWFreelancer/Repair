<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phonenumber = $_POST['phonenumber'];
$square = $_POST['square'];
$checkbox1 = $_POST['checkbox1'];
$checkbox2 = $_POST['checkbox2'];


// Формирование самого письма
$title = "Данные нового пользователя";
$body = "
<h2>Форма</h2>
<b>Имя:</b> $name<br><br>
<b>Телефон:</b> $phonenumber<br><br>
<b>Тип ремонта:</b> $checkbox2<br><br>
<b>Площадь:</b> $square<br><br>
<b>Тип помещения:</b> $checkbox1<br><br>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'ssw03@inbox.ru'; // Логин на почте
    $mail->Password   = 'L4wnmFhRU9nmPPr9PuuD'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('ssw03@inbox.ru', 'Пользователь'); // Адрес самой почты и имя отправителя

    // Получатель письма
    // $mail->addAddress('rvk79@list.ru');  
    $mail->addAddress('sswfreelance22@gmail.com'); //Ещё один, если нужен

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);