<?php

class UserModel
{

    public $id, $username, $password, $balance, $cpf, $email, $data_nascimento, $data_criado;

    public function save(){
        include 'DAO/UserDAO.php';

        $dao = new UserDAO();

        if($this->id == null){
            $dao->insert($this);
        }
    }

    public function verify(){
        include 'DAO/UserDAO.php';

        $dao = new UserDAO();

        if($dao->verify($this)){
            return true;
        }else{
            return false;
        }
    }

    public function getBalance(){
        include 'DAO/UserDAO.php';

        $dao = new UserDAO();

        return $dao->getBalance($this);
    }

}
