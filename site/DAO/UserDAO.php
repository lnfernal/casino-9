<?php

class UserDAO
{
    private $conexao;

    function __construct()
    {
        $dsn = "mysql:host=20.197.227.30;dbname=db_casino";
        $user = "gmoreira05";
        $pass = "Biel14032005-";

        $this->conexao = new PDO($dsn, $user, $pass);
    }

    function insert(UserModel $model)
    {
        $sql = "INSERT INTO users (username, password, email, cpf, data_nascimento, data_criado) VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->username);
        $stmt->bindValue(2, $model->password);
        $stmt->bindValue(3, $model->email);
        $stmt->bindValue(4, $model->cpf);
        $stmt->bindValue(5, $model->data_nascimento);
        $stmt->bindValue(6, $model->data_criado);

        $stmt->execute();
    }

    function isAdmin(UserModel $model){
        $sql = "SELECT admin FROM users WHERE username = ? AND admin = 1";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->username);

        $stmt->execute();

        if($stmt->rowCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    function verify(UserModel $model){
        $sql = "SELECT * FROM users WHERE username = ? AND password = ?";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->username);
        $stmt->bindValue(2, $model->password);

        $stmt->execute();

        if($stmt->rowCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    function getBalance(UserModel $model){
        $sql = "SELECT balance FROM users WHERE username = ?";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->username);

        $stmt->execute();
        $row = $stmt->fetch();

        return $row['balance'];
    }
}
