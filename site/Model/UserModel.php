<?php

class UserModel
{

    public $id, $username, $password, $balance, $cpf, $email, $data_nascimento, $data_criado, $admin;

    public function save(){
        require_once 'DAO/UserDAO.php';

        $dao = new UserDAO();

        if($this->id == null){
            $dao->insert($this);
        }
    }

    public function verify(){
        require_once 'DAO/UserDAO.php';

        $dao = new UserDAO();

        if($dao->verify($this)){
            return true;
        }else{
            return false;
        }
    }

    public function isAdmin(){
        require_once 'DAO/UserDAO.php';

        $dao = new UserDAO();

        if($dao->isAdmin($this)){
            return true;
        }else{
            return false;
        }
    }

    public function getBalance(){
        require_once 'DAO/UserDAO.php';

        $dao = new UserDAO();

        return $dao->getBalance($this);
    }

}
