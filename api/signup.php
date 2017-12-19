<?php
    //check for direct access
    if($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])){
        //redirect
        header('HTTP/1.0 403 Forbidden', TRUE, 403);
        die(header('location: ../error.php'));
    }
    session_start();

    if(isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'] && isset($_POST['password-c']))){
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        if($password === $_POST['password-c']){
            //TODO:check for valid input and sanitize
        }else{
            $_SESSION['error'] = "Passwords don't match";
        }
    }else{
        $_SESSION['error'] = "Please fill all the fields!";
    }


?>