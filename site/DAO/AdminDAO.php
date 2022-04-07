<?php

class AdminDAO
{
    private $conexao;

    function __construct()
    {
        $dsn = "mysql:host=localhost;dbname=casino";
        $user = "root";
        $pass = "Gabriel140305-";

        $this->conexao = new PDO($dsn, $user, $pass);
    }

    function insert(AdminModel $model)
    {
        $sql = "INSERT INTO admins (username, password, email) VALUES (?, ?, ?)";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->username);
        $stmt->bindValue(2, $model->password);
        $stmt->bindValue(3, $model->email);

        $stmt->execute();
    }

    function verify(AdminModel $model){
        $sql = "SELECT * FROM admins WHERE username = ? AND password = ?";

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
}
