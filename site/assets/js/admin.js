$(document).ready(function () {
    var socket = io("http://192.168.2.102:8000", { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('consolelog', function (content) {
        console.log(content)
    })

    $('.icon-link').click(function () {
        let new_value = prompt("Qual o novo saldo?")
        socket.emit('update_user_balance', {user_id: this.id, value: new_value})
    })
})