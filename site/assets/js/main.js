$(document).ready(function () {
    var socket = io("http://192.168.2.100:8000", { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('consolelog', function (content) {
        console.log(content)
    })

    socket.on('number', function (number) {
        if ($('.last_number').length >= 10) {
            $('.last_numbers').find('.last_number').first().remove()
        }

        if (number >= 8) {
            $('.last_numbers').append(`<div class="last_number black">${number}</div>`)
        } else if (number <= 7 && number != 0) {
            $('.last_numbers').append(`<div class="last_number red">${number}</div>`)
        } else {
            $('.last_numbers').append(`<div class="last_number green">${number}</div>`)
        }

        if (number > 7) {
            $('.roulette').css('background', '#272727')
            $('.roulette').css('color', '#969696')
        } else if (number <= 7 && number != 0) {
            $('.roulette').css('background', '#CE3B3B')
            $('.roulette').css('color', '#6C0404')
        } else {
            $('.roulette').css('background', '#41B836')
            $('.roulette').css('color', '#075600')
        }
        $('.roulette').text(`${number}`)
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