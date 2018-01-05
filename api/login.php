<?php
    //check for direct access
    /*
    if($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])){
        //redirect
        header('HTTP/1.0 403 Forbidden', TRUE, 403);
        die(header('location: ../error.php'));
    }
    */
    session_start();

    if($_POST['username'] !== "" && $_POST['password'] !== ""){
        $username = $_POST['username'];
        $password = $_POST['password'];

        $usersFile = file_get_contents('../database/users.json');

        if($usersFile){
            $usersJSON = json_decode($usersFile, true);
            foreach($usersJSON as $user){
                if($user['username'] === $username && $user['password'] === $password){
                    $_SESSION['user'] = $username;
                }
            }
            if(!isset($_SESSION['user'])){
                $_SESSION['error'] = "Incorrect username or password!";
            }
        }else{
            $_SESSION['error'] = "Can't open users file";
        }
    }else{
        $_SESSION['error'] = "Please enter a username and a password!";
    }

    header("Location: ../index.php");
?>