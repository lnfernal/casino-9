<?php

if (isset($_SESSION['login'])) {
    header('location: /');
}

?>

<html>

<head>
    <title>Login - Casino</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/forms/style.css">
</head>
<body>
<div class="form_wrapper">
  <div class="form_container">
    <div class="title_container">
      <h2>Faça Login No Cassino!</h2>
      <?php if(isset($_SESSION['dados_incorretos'])){
          echo '<h3 style="color: red;">Dados de Login Incorretos</h3>';
      } ?>
    </div>
    <form action="/auth/login" method="POST">
      <div class="row clearfix">
        <div class="col_half">
          <label>Usuário</label>
          <div class="input_field">
            <input type="text" name="username" placeholder="Nomedeusuario" required />
          </div>
        </div>
        <div class="col_half">
          <label>Senha</label>
          <div class="input_field">
            <input type="password" name="password" placeholder="*********" />
          </div>
        </div>
      </div>
      <input class="button" type="submit" value="Logar" />
    </form>
  </div>
</body>
</html>