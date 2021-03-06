<?php

class UserController 
{
    public static function formCadastro()
    {
        include 'View/modules/user/FormCadastro.php';
    }

    public static function formLogin()
    {
        include 'View/modules/user/FormLogin.php';
    }

    public static function verifyLogin()
    {
        require_once 'Model/UserModel.php';

        $user = new UserModel();

        $user->username = $_POST['username'];
        $user->password = md5($_POST['password']);

        if($user->verify()){
            $_SESSION['login'] = $user->username;
            $_SESSION['key'] = $user->password;
            header('location: /');
        }else{
            $_SESSION['dados_incorretos'] = true;
            header('location: /auth/login/form');
        }
    }

    public static function adminPage(){
        include 'View/Modules/admin/home.php';
    }

    public static function getBalance(){
        require_once 'Model/UserModel.php';

        $user = new UserModel();

        $user->username = $_SESSION['login'];
        return $user->getBalance();
    }

    public static function logout() {
        unset($_SESSION['login']);
        unset($_SESSION['key']);

        header('location: /');
    }

    public static function save() {
        require_once 'Model/UserModel.php'; 

        $user = new UserModel();

        $user->username = $_POST['username'];
        $user->password = md5($_POST['password']);
        $user->email = $_POST['email'];
        $user->cpf = $_POST['cpf'];
        $user->data_nascimento = $_POST['data_nascimento'];
        $user->data_criado = date('Y-m-d H:i:s');

        $user->save();

        header("Location: /pessoa");
    }
}