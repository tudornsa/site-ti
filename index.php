<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewpost" content="width=device-width; maximum-scale=1"/>
    <title>HalfCat</title>
    <link rel="shortcut icon" href="imagini/logo/thumb.ico" />    
    <link href="css/index-style.css" rel="stylesheet" type="text/css" />
    <link href="css/login-signup-style.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400" rel="stylesheet">
    <script src="javascript/script.js"></script>
</head>
<body>
    <?php
        if(isset($_SESSION['user'])){
            include "app/app.php";
        }else{
            if(isset($_SESSION['error'])){
                echo $_SESSION['error'];
                unset($_SESSION['error']);
            }
            include "landing.html";
        }
    ?>
</body>
</html>