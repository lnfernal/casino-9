<?php

if (isset($_SESSION['login'])) {
    header('location: /');
}

?>

<html>

<head>
    <title>Cadastro - Casino</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/forms/style.css">
</head>
<body>
<div class="form_wrapper">
  <div class="form_container">
    <div class="title_container">
      <h2>Registre-se No Cassino!</h2>
    </div>
    <form action="/auth/register" method="POST">
      <div class="row clearfix">
        <div class="col_half">
          <label>Usuário</label>
          <div class="input_field">
            <input type="text" name="username" placeholder="Nomedeusuario" required />
          </div>
        </div>
        <div class="col_half">
          <label>E-Mail</label>
          <div class="input_field">
            <input type="email" name="email" placeholder="seu@email.com" required />
          </div>
        </div>
      </div>
      <div class="row clearfix">
      <div class="col_half">
          <label>Senha</label>
          <div class="input_field">
            <input type="password" name="password" id="senha" placeholder="*********" />
          </div>
        </div>
        <div class="col_half">
          <label>Confirmação de Senha</label>
          <div class="input_field">
            <input type="password" name="confirma_senha" id="confirmasenha" placeholder="*********" />
          </div>
        </div>
      </div>
      <div class="row clearfix">
        <div class="col_half">
          <label>CPF</label>
          <div class="input_field">
            <input type="text" name="cpf" placeholder="12345678900" required />
          </div>
        </div>
        <div class="col_half">
          <label>Data de Nascimento</label>
          <div class="input_field">
            <input type="date" name="data_nascimento" placeholder="dd/mm/aaaa" pattern="[0-9]{10}" />
          </div>
        </div>
      </div>
      <input class="button" type="submit" value="Cadastrar" />
    </form>
  </div>
</body>
</html>