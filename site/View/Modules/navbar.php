<div class="nav">
    <input type="checkbox" id="nav-check">
    <div class="nav-header">
        <div class="nav-title">
            Casino
        </div>
    </div>
    <div class="nav-btn">
        <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
        </label>
    </div>

    <div class="nav-links">
        <a href="/">Roulette</a>
        <a href="/games/mines">Mines</a>
        <?php 
            if(!isset($_SESSION['login'])){
                echo '<a href="/auth/login/form">Login</a>';
                echo '<a href="/auth/register/form">Cadastro</a>';
            }else{
                echo '<a href="/account">' . $_SESSION['login'] . '</a>';
                echo '<a id="balance" href="#">R$ ' . str_replace('.', ',', UserController::getBalance()) . '</a>';
                echo '<a href="/auth/logout">Logout</a>';
            }
        ?>
    </div>
</div>