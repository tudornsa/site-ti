<?php
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