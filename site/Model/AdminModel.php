<?php

class AdminModel
{

    public $id, $username, $password;

    public function save(){
        include 'DAO/AdminDAO.php';

        $dao = new AdminDAO();

        if($this->id == null){
            $dao->insert($this);
        }
    }

    public function verify(){
        include 'DAO/AdminDAO.php';

        $dao = new AdminDAO();

        if($dao->verify($this)){
            return true;
        }else{
            return false;
        }
    }
}
