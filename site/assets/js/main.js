$(document).ready(function () {
    var socket = io("http://192.168.2.100:8000", { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('consolelog', function(content){
        console.log(content)
    })

    socket.on('number', function(number){
        if($('.last_number').length >= 10){
            $('.last_numbers').find('.last_number').first().remove()
            console.log('era pra remover')
        }

        if(number >=8){
            $('.last_numbers').append(`<div class="last_number black">${number}</div>`)
        }else if(number <= 7 && number != 0){
            $('.last_numbers').append(`<div class="last_number red">${number}</div>`)
        }else{
            $('.last_numbers').append(`<div class="last_number green">${number}</div>`)
        }

        if(number > 7){
            $('.roulette').css('background', '#272727')
            $('.roulette').css('color', '#969696')
        }else if(number <= 7 && number != 0){
            $('.roulette').css('background', '#CE3B3B')
            $('.roulette').css('color', '#6C0404')
        }else{
            $('.roulette').css('background', '#41B836')
            $('.roulette').css('color', '#075600')
        }
        $('.roulette').text(`${number}`)
    })

    socket.on('last_numbers', last_numbers => {
        console.log(last_numbers)
        last_numbers.forEach(number => {
            if(number >=8){
                $('.last_numbers').append(`<div class="last_number black">${number}</div>`)
            }else if(number <= 7 && number != 0){
                $('.last_numbers').append(`<div class="last_number red">${number}</div>`)
            }else{
                $('.last_numbers').append(`<div class="last_number green">${number}</div>`)
            }
        })
    })

    $('#bet_black').click(function (){
        socket.emit('bet', {color: 'black', value: $('#bet_value').val()})
    })
})