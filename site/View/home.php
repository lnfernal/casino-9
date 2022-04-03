<html>

<head>
    <title>Home | Casino</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.socket.io/4.4.1/socket.io.min.js" integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/AlertifyJS/1.13.1/alertify.js" integrity="sha512-eOUPKZXJTfgptSYQqVilRmxUNYm0XVHwcRHD4mdtCLWf/fC9XWe98IT8H1xzBkLL4Mo9GL0xWMSJtgS5te9rQA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/navbar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/AlertifyJS/1.13.1/css/alertify.css" integrity="sha512-MpdEaY2YQ3EokN6lCD6bnWMl5Gwk7RjBbpKLovlrH6X+DRokrPRAF3zQJl1hZUiLXfo2e9MrOt+udOnHCAmi5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <meta name="auth" content="<?php if (isset($_SESSION['login'])) {echo $_SESSION['key'] . $_SESSION['login'];} else {echo 'noauth';} ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
</head>

<body>
    <noscript>You must need to enable JavaScript to use this website.</noscript>
    <?php include 'Modules/navbar.php'; ?>
    <div class="grid">
        <div class="item">
            <div class="bet-controller"></div>
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
        <div class="item" style="display: none;">
            <p class="titulo">Crash Atual: <span class="crash"></span>x</p>
        </div>
    </div>
    <script src="assets/js/main.js"></script>
</body>

</html>