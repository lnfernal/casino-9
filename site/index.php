<?php

$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
include 'Controller/UserController.php';
include 'Controller/AdminController.php';

session_start();

switch($url){
    case '/':
        include 'View/roulette.php';
    break;

    case '/games/mines':
        include 'View/mines.php';
    break;

    case '/auth/register/form':
        UserController::formCadastro();
    break;

    case '/auth/register':
        UserController::save();
    break;

    case '/auth/login/form':
        UserController::formLogin();
    break;

    case '/auth/login':
        UserController::verifyLogin();
    break;

    case '/auth/logout':
        UserController::logout();
    break;

    case '/admin':
        include 'View/Modules/admin/home.php';    
    break;

    case '/admin/auth/login/form':
        AdminController::formLogin();
    break;

    case '/admin/auth/login':
        AdminController::verifyLogin();
    break;
}

?>