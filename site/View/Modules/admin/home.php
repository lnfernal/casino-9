<?php

require_once 'Model/UserModel.php';
$usuario = new UserModel();

$usuario->username = $_SESSION['login'];

if ($usuario->isAdmin()) {
    $_SESSION['admin'] = true;
} else {
    header('location: /');
}

$servername = "20.197.227.30";
$username = "gmoreira05";
$password = "Biel14032005-";
$dbname = "db_casino";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, username, email, balance FROM users";

$result = $conn->query($sql);
?>
<html>

<head>
    <title>Admin | Casino</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/navbar.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.js" integrity="sha512-MgkNs0gNdrnOM7k+0L+wgiRc5aLgl74sJQKbIWegVIMvVGPc1+gc1L2oK9Wf/D9pq58eqIJAxOonYPVE5UwUFA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="/assets/js/admin.js"></script>
    <style>
        table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            border: 1px solid #ddd;
        }

        /* Style table headers and table data */
        th,
        td {
            text-align: center;
            padding: 16px;
        }

        th:first-child,
        td:first-child {
            text-align: left;
        }

        /* Zebra-striped table rows */
        tr:nth-child(even) {
            background-color: #f2f2f2
        }

        .icon-link {
            text-decoration: none;
            color: #000;
        }

        .icon-link:hover {
            color: #666;
        }

        tr:hover {
            background-color: #e2e2e2;
        }
    </style>
</head>

<body>
    <noscript>You must need to enable JavaScript to use this website.</noscript>
    <?php include 'View/Modules/navbar.php'; ?>

    <div class="grid" style="overflow-x:auto">
        <table class="table">
            <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>E-Mail</th>
                <th>Saldo</th>
                <th>Ações</th>
            </tr>

            <?php
            while ($row = $result->fetch_assoc()) {
                echo "<tr><td>" . $row["id"] . "</td><td>" . $row["username"] . "</td><td>" . $row["email"] . "</td><td>R$ " . $row["balance"] . "</td><td><a id=" . $row["id"] . " href='#'class='icon-link'><i class='fa-solid fa-coins'></i></a></td></tr>";
            }
            ?>
        </table>
    </div>
</body>

</html>