<html>

<head>
    <title>Mines | Casino</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.socket.io/4.4.1/socket.io.min.js" integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/AlertifyJS/1.13.1/alertify.js" integrity="sha512-eOUPKZXJTfgptSYQqVilRmxUNYm0XVHwcRHD4mdtCLWf/fC9XWe98IT8H1xzBkLL4Mo9GL0xWMSJtgS5te9rQA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="/assets/css/mines.css">
    <link rel="stylesheet" href="/assets/css/navbar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/AlertifyJS/1.13.1/css/alertify.css" integrity="sha512-MpdEaY2YQ3EokN6lCD6bnWMl5Gwk7RjBbpKLovlrH6X+DRokrPRAF3zQJl1hZUiLXfo2e9MrOt+udOnHCAmi5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <meta name="auth" content="<?php if (isset($_SESSION['login'])) {
                                    echo $_SESSION['key'] . $_SESSION['login'];
                                } else {
                                    echo 'noauth';
                                } ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
</head>

<body>
    <noscript>You must need to enable JavaScript to use this website.</noscript>
    <?php include 'Modules/navbar.php'; ?>

    <div class="content">
        <div class="game-controller-container">
            <div id="mine-controller" class="controller">
                <div class="body">
                    <label class="input-label" for="bet-amount">Valor da Aposta</label>
                    <input type="number" name="bet-amount" id="bet-amount" class="bet-amount" value="0" pattern="^\d*(\.\d{0,2})?$">

                    <button id="double" class="btn bet-controller">2x</button>
                    <button id="half" class="btn bet-controller">1/2x</button>

                    <label class="input-label" for="mine-amount">Quantidade de Minas</label>
                    <select name="mine-amount" id="mine-amount"></select>
                    <button id="start-mines" class="btn">Começar o Jogo</button>
                </div>
            </div>

            <div class="mine-wrapper">
                <div class="container">
                    <div class="board">

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/assets/js/mines.js"></script>
</body>

</html>