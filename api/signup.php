<?php
    //check for direct access
    if($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])){
        //redirect
        header('HTTP/1.0 403 Forbidden', TRUE, 403);
        die(header('location: ../error.php'));
    }
    session_start();

    if(isset($_POST['username']) && $_POST['username'] !== "" && isset($_POST['email']) && $_POST['email'] !== "" && isset($_POST['password']) && $_POST['password'] !== "" && isset($_POST['password-c']) && $_POST['password-c'] !== ""){
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        if($password === $_POST['password-c']){
            //TODO:check for valid input and sanitize
            $userFile = file_get_contents('../database/users.json');
            if($userFile){
                $data = array("username" => $username, "email" => $email, "password" => $password);

                $usersJSON = json_decode($userFile);
                array_push($usersJSON, $data);
                file_put_contents('../database/users.json',json_encode($usersJSON));
            }else{
                $_SESSION['error'] = "Can't open users file";
            }
        }else{
            $_SESSION['error'] = "Passwords don't match";
        }
    }else{
        $_SESSION['error'] = "Please fill all the fields!";
    }
    header("Location: ../index.php");


?>