<?php
    if($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])){
        //redirect
        header('HTTP/1.0 403 Forbidden', TRUE, 403);
        die(header('location: ../error.php'));
    }
    session_start();

    

    echo "Hello I am app<br/>";
    //TODO: Build app bellow.
    echo "<a href='api/logout.php'><input type='button' value='Log Out'/></a>"
?>