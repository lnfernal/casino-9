$(document).ready(function () {
    var socket = io("http://192.168.2.100:8000", { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('consolelog', function(content){
        console.log(content)
    })

    socket.on('number', function(number){
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
})