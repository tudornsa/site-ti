<?php
    //check for direct access
    if($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])){
        //redirect
        header('HTTP/1.0 403 Forbidden', TRUE, 403);
        die(header('location: ../error.php'));
    }
    session_start();
    
    unset($_SESSION['user']);

    header("Location: ../index.php");
?>