<?php

    if(!isset($_SESSION['admin_login'])){
        header('location: /admin/auth/login/form');
    }else{
        include 'Controller/AdminController.php';
        if(!AdminController::verifyLoginSession($_SESSION['admin_login'], $_SESSION['admin_token'])){
            header('location: /admin/auth/login/form');
        }
    }

    

?>