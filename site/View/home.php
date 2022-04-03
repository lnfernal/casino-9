<html>

<head>
    <title>Home | Casino</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.socket.io/4.4.1/socket.io.min.js" integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/navbar.css">
    <meta name="auth" content="<?php echo $_SESSION['login'] . $_SESSION['key'] ?>">
</head>

<body>
    <noscript>You must need to enable JavaScript to use this website.</noscript>
    <?php include 'Modules/navbar.php'; ?>
    <div class="grid">
        <div class="item">
            <p class="titulo">Número Atual: <span class="roulette"></span></p>

            <p class="titulo">Últimos 10 Números:</p>

            <div class="last_numbers">
            </div>

            <input id="bet_value" placeholder="Quantia (R$)">
            <div class="row">
                <button class="bet_btn black" id="bet_black">x2</button>
                <button class="bet_btn green" id="bet_green">x14</button>
                <button class="bet_btn red" id="bet_red">x2</button>
            </div>

        </div>
        <div class="item">
            <p class="titulo">Crash Atual: <span class="crash"></span>x</p>
        </div>
    </div>
    <script src="assets/js/main.js"></script>
</body>

</html>