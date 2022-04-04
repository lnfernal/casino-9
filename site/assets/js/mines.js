$(document).ready(function () {
    var socket = io("http://192.168.2.102:8000", { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('consolelog', function (content) {
        console.log(content)
    })

    for (let i = 0; i < 25; i++) {
        $('.board').append(`<div class="mine-cell unrevealed" id="${i}"></div>`)
    }

    for(let i = 2; i < 24; i++){
        $('#mine-amount').append(`<option value="${i}">${i}</option>`)
    }

    $(document).on('keydown', 'input[pattern]', function (e) {
        var input = $(this);
        var oldVal = input.val();
        var regex = new RegExp(input.attr('pattern'), 'g');

        setTimeout(function () {
            var newVal = input.val();
            if (!regex.test(newVal)) {
                input.val(oldVal);
            }
        }, 1);
    });

    $('#start-mines').click(function(){
        if ($('meta[name="auth"]').attr('content') != 'noauth') {
            if($('#bet-amount').val() >= 0.1){
                socket.emit('mines_bet', {value: $('#bet-amount').val(), mine_count: $('#mine-amount').val(), socket_id: socket.id, auth: $('meta[name="auth"]').attr('content')})
            }else{
                alertify.error('Você deve apostar R$0.10 no mínimo')
            }
        }else{
            alertify.error('Você deve estar logado para jogar')
        }
    })

    $('#double').click(function () {
        $('.bet-amount').val(($('.bet-amount').val() * 2))
    })

    $('#half').click(function () {
        $('.bet-amount').val(($('.bet-amount').val() / 2))
    })

    socket.on('notify_error', msg => {
        alertify.error(msg)
    })

    socket.on('notify_success', msg => {
        alertify.success(msg)
    })

    socket.on('decrease_balance', value => {
        let balance = $('#balance').html().replace('R$ ', '').replace(',', '.')

        let new_balance = balance - value;

        $('#balance').html('R$ ' + Number(new_balance).toFixed(2).toString().replace('.', ','))
    })

    socket.on('increase_balance', value => {
        let balance = $('#balance').html().replace('R$ ', '').replace(',', '.')

        let new_balance = Number(balance) + value;

        $('#balance').html('R$ ' + Number(new_balance).toFixed(2).toString().replace('.', ','))
    })
})