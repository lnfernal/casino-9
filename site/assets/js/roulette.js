$(document).ready(function () {
    var socket = io("http://192.168.2.100:8000", { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('consolelog', function (content) {
        console.log(content)
    })

    let array_inicial = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4]

    let i = 0

    while(i < 200){
        let color = ''
        array_inicial.forEach(n => {
            if(n == 0){
                color = 'green'
            }else if(n > 7){
                color = 'black'
            }else{
                color = 'red'
            }
            $('.roulette_numbers').html($('.roulette_numbers').html() + '<div class="roulette_number ' + color + '">' + n.toString() + '</div>')
            i++
        })
    }

    
    socket.on('new_entry', function(new_entry){
        let entry_color = new_entry.color
        let username = new_entry.username
        let value = Number(new_entry.value)

        let new_entry_element = `<div class="bet_entry"><div class="entry_username">${username}</div><div class="entry_amount">R$ ${value.toFixed(2)}</div></div>`

        if(entry_color == 'black'){
            $('#black_entries').append(new_entry_element)
            $('#black_bets_total').html((Number($('#black_bets_total').html()) + value).toFixed(2))
        }else if(entry_color == 'green'){
            $('#green_entries').append(new_entry_element)
            $('#green_bets_total').html((Number($('#green_bets_total').html()) + value).toFixed(2))
        }else if(entry_color == 'red'){
            $('#red_entries').append(new_entry_element)
            $('#red_bets_total').html((Number($('#red_bets_total').html()) + value).toFixed(2))
        }
    })
    
    
    socket.on('number', function (number) {
        if ($('.last_number').length >= 10) {
            $('.last_numbers').find('.last_number').first().remove()
        }

        if (number > 7) {
            $('.last_numbers').append(`<div class="last_number black">${number}</div>`)
        } else if (number <= 7 && number != 0) {
            $('.last_numbers').append(`<div class="last_number red">${number}</div>`)
        } else {
            $('.last_numbers').append(`<div class="last_number green">${number}</div>`)
        }

        if (number > 7) {
            $('.roulette').css('background-color', '#343b4a')
            $('.roulette').css('color', '#b6b6b6')
        } else if (number <= 7 && number != 0) {
            $('.roulette').css('background', '#CE3B3B')
            $('.roulette').css('color', '#6C0404')
        } else {
            $('.roulette').css('background', '#41B836')
            $('.roulette').css('color', '#075600')
        }

        $('.roulette').text(`${number}`)

        $('#black_bets_total').html('0.00')
        $('#green_bets_total').html('0.00')
        $('#red_bets_total').html('0.00')

        $('#bet_buttons').children('.col').children('.bet_entry').each(function(){
            this.remove()
        })
    })

    socket.on('last_numbers', last_numbers => {
        last_numbers.forEach(number => {
            if (number >= 8) {
                $('.last_numbers').append(`<div class="last_number black">${number}</div>`)
            } else if (number <= 7 && number != 0) {
                $('.last_numbers').append(`<div class="last_number red">${number}</div>`)
            } else {
                $('.last_numbers').append(`<div class="last_number green">${number}</div>`)
            }
        })
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

    $('#bet_black').click(function () {
        if ($('meta[name="auth"]').attr('content') != 'noauth') {
            if ($('#bet_value').val() >= 0.1) {
                socket.emit('bet', { color: 'black', value: $('#bet_value').val(), socket_id: socket.id, auth: $('meta[name="auth"]').attr('content') })
            } else {
                alertify.error('Você deve fazer uma aposta acima de R$0,10')
            }
        }
    })

    $('#bet_red').click(function () {
        if ($('meta[name="auth"]').attr('content') != 'noauth') {
            if ($('#bet_value').val() >= 0.1) {
                socket.emit('bet', { color: 'red', value: $('#bet_value').val(), socket_id: socket.id, auth: $('meta[name="auth"]').attr('content') })
            } else {
                alertify.error('Você deve fazer uma aposta acima de R$0,10')
            }
        }
    })

    $('#bet_green').click(function () {
        if ($('meta[name="auth"]').attr('content') != 'noauth') {
            if ($('#bet_value').val() >= 0.1) {
                socket.emit('bet', { color: 'green', value: $('#bet_value').val(), socket_id: socket.id, auth: $('meta[name="auth"]').attr('content') })
            } else {
                alertify.error('Você deve fazer uma aposta acima de R$0,10')
            }
        }
    })
})