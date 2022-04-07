<?php

class AdminController 
{

    public static function formLogin()
    {
        include 'View/modules/admin/FormLogin.php';
    }

    public static function verifyLogin()
    {
        include 'Model/AdminModel.php';

        $admin = new AdminModel();

        $admin->username = $_POST['username'];
        $admin->password = md5($_POST['password']);

        if($user->verify()){
            $_SESSION['admin_login'] = $user->username;
            $_SESSION['admin_key'] = $user->password;
            header('location: /admin/');
        }else{
            $_SESSION['dados_incorretos'] = true;
            header('location: /admin/auth/login/form');
        }
    }

    public static function logout() {
        unset($_SESSION['admin_login']);
        unset($_SESSION['admin_key']);

        header('location: /');
    }

    public static function save() {
        include 'Model/AdminModel.php'; 

        $admin = new AdminModel();

        $admin->username = $_POST['username'];
        $admin->password = md5($_POST['password']);
        $admin->email = $_POST['email'];

        $admin->save();
    }

    public static function verifyLoginSession($username, $password){
        include 'Model/AdminModel.php';

        $admin = new AdminModel();

        $admin->username = $username;
        $admin->password = $password;

        if($admin->verify()){
            return true;
        }else{
            return false;
        }
    }
}