<?php
    if($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])){
        //redirect
        header('HTTP/1.0 403 Forbidden', TRUE, 403);
        die(header('location: ../error.php'));
    }
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewpost" content="width=device-width; maximum-scale=1"/>
    <title>HalfCat</title>
    <link rel="shortcut icon" href="imagini/logo/thumb.ico" />    
    <link href="css/app-style.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400" rel="stylesheet">
    <script src="javascript/app.js"></script>
</head>
<body onload="populate()">
    <header>
        <a href="index.php">
            <svg class="logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 372.97 338.15">
                <defs>
                    <linearGradient id="linear-gradient" x1="42.68" y1="275.79" x2="284.68" y2="132.79" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#ca22e8"/><stop offset="1" stop-color="#ff0f6b"/>
                    </linearGradient>
                    <linearGradient id="linear-gradient-2" x1="37.6" y1="267.2" x2="279.6" y2="124.2" xlink:href="#linear-gradient"/>
                    <linearGradient id="linear-gradient-3" x1="86.31" y1="349.64" x2="328.31" y2="206.64" xlink:href="#linear-gradient"/>
                </defs>
                <title>Logo</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <path d="M166.6,1.44c-1.3,1.2-1.6,3.9-1.6,12.3,0,9-.3,11-1.7,12.3-1,.9-7.8,4.6-15,8.2L135,40.84H90.2c-34.3,0-45.2.3-46.4,1.2C41.1,44.24,0,99.84,0,101.34c0,.8,6.5,14.6,14.5,30.5l14.5,29v22.1c0,14.3.4,22.8,1.1,24.1s24.3,31.1,52.6,66.5c46.3,57.8,51.8,64.3,54.3,64.3,3.3,0,6-2.3,6-5.1,0-1.1-5-21.7-11-45.9s-11-44.4-11-45a7.17,7.17,0,0,1,2-3c1.9-1.9,3.3-2,52.2-2h50.3l50.6,50.6c52.8,52.7,53.1,53,57.4,49.4a5.46,5.46,0,0,0,1.5-3.7c0-1.3-11-30-24.5-63.7S286,207.64,286,207c0-1.5,27.2-42.3,29.5-44.2,1.4-1.2,5-1.5,16.3-1.6l14.4-.1,13.4-13.4c16.4-16.4,16.4-16.5,7.1-25.7-5.3-5.2-7.4-8.5-13.6-21.1l-7.4-14.8-13.9-6.9c-7.7-3.8-14.4-7.5-15-8.2s-1.3-5.2-1.5-9.9-.8-9.2-1.4-9.9-2.6-1.4-4.3-1.4c-2.7,0-7.6,4.5-43.8,40.7L225,131.34l-74.1.2c-52.3.2-74.7,0-76.2-.8-3.2-1.6-26.6-24.9-28.3-28.1-1.4-2.6-1.1-3.4,5.5-16.7,3.9-7.6,7.7-14.1,8.6-14.5s21.4-.6,45.5-.6h43.9l21.3-14.1c11.7-7.8,21.9-14.8,22.6-15.7.8-1.1,1.2-5.8,1.2-15.2,0-16,.8-14.6-12.7-21.4C172.4-.46,169.1-1.06,166.6,1.44Z" style="fill:url(#linear-gradient)"/>
                        <path d="M25.5,222.23C23.8,228.5,2,331.12,2,333.12c0,3.27,1.45,4.72,4.68,4.72,2.21,0,6.13-3.81,31.76-31.15,16-17.07,29.12-31.69,29.12-32.6,0-2-38.4-52.85-40.19-53.22A1.73,1.73,0,0,0,25.5,222.23Z" style="fill:url(#linear-gradient-2)"/>
                        <path d="M193.8,250c-2.1,1.7-32.8,79-32.8,82.6s1.7,5.2,5.5,5.2c2.6,0,7.2-4.1,36.8-33.8,26.8-26.8,33.7-34.2,33.7-36.3,0-1.9-2.2-4.7-8.4-10.7l-8.4-8.2H207.8C199.4,248.84,194.9,249.24,193.8,250Z" style="fill:url(#linear-gradient-3)"/>
                    </g>
                </g>
            </svg>
        </a>

        <nav id="navbar">
            <form>
                <input type="text" id="search-param"/>
                <input type="submit" onclick="onSearch(); return false" value="" id="search-btn"/>
            </form>
        </nav>
        
        <a id="logout-a" href='api/logout.php'><input id="logout-btn" type='button' value='Log Out'/></a>
    </header>
    <div id="content" class="clearfix"></div>
    <footer id="player"></footer>
</body>