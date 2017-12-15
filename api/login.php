<?php
    //check for direct access
    if($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])){
        //redirect
        header('HTTP/1.0 403 Forbidden', TRUE, 403);
        die(header('location: ../error.php'));
    }
    session_start();
    
    if($_POST['username'] != "" && $_POST['password'] != ""){
        if($_POST['username'] == "ana" && $_POST['password'] == "1234"){
            $_SESSION['user'] = $_POST['username'];
        }else{
            $_SESSION['error'] = "Incorrect username or password!";
        }
    }else{
        $_SESSION['error'] = "Please enter a username and a password!";
    }

    header("Location: ../index.php");
?>