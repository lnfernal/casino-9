const mysql = require('mysql')
const io = require('socket.io')(8000)

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabriel140305-',
    database: 'casino'
});

let last_numbers = []

let current_bets = []

connection.connect((err) => {
    if (err) {
        console.error(`Error connecting to MySQL: ${err.message}`)
    } else {
        console.log(`Successfully connected to MySQL database.`)
    }
})

io.on('connection', (socket) => {
    console.log(`Um novo usuário se conectou: ${socket.id}`)
    consolelog(`Your Socket's connection ID: ${socket.id}`, socket.id)

    socket.emit('last_numbers', last_numbers)

    socket.on('bet', bet => {
        let pass = bet.auth.slice(0, 32)
        let user = bet.auth.slice(32, bet.auth.length)

        connection.query(`SELECT balance FROM users WHERE username = '${user}' AND password = '${pass}';`, (err, row) => {
            if (err) {
                console.log(err)
                io.sockets.to(socket.id).emit('notify_error', err)
            } else {
                if (row.length > 0) {
                    if (bet.value > row[0].balance) {
                        io.sockets.to(socket.id).emit('notify_error', 'Saldo Insuficiente')
                    } else {
                        current_bets.push({ username: user, value: bet.value, color: bet.color, socket_id: bet.socket_id })
                        connection.query(`UPDATE users SET balance = balance - ${bet.value} WHERE username = '${user}';`, (err) => {
                            if (err) {
                                console.log(err)
                                io.sockets.to(socket.id).emit('notify_error', err)
                            }
                        });
                        io.sockets.to(socket.id).emit('decrease_balance', bet.value)
                        io.sockets.to(socket.id).emit('notify_success', 'Aposta realizada com sucesso')

                        io.sockets.emit('new_entry', {username: user, value: bet.value, color: bet.color})
                    }
                }
            }
        })
    })

    socket.on('mines_bet', mine_bet => {
        if(mine_bet.auth.length > 32){
            let pass = mine_bet.auth.slice(0, 32)
            let user = mine_bet.auth.slice(32, mine_bet.auth.length)
    
            connection.query(`SELECT balance FROM users WHERE username = '${user}' AND password = '${pass}';`, (err, row) => {
                if (err) {
                    console.log(err)
                    io.sockets.to(socket.id).emit('notify_error', err)
                } else {
                    if (row.length > 0) {
                        if (mine_bet.value <= row[0].balance) {
                            io.sockets.to(mine_bet.socket_id).emit('notify_success', 'Mines iniciado')
                        } else {
                            io.sockets.to(socket.id).emit('notify_error', 'Saldo Insuficiente')
                        }
                    }
                }
            })
        }
    })
})

function consolelog(content, reciptentId) {
    io.sockets.to(reciptentId).emit('consolelog', content)
}

function generateNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


setInterval(function () {
    let num = generateNumber(0, 14)
    let color = ''
    if (num == 0) {
        color = 'green'
    } else if (num >= 8) {
        color = 'black'
    } else {
        color = 'red'
    }

    if (current_bets.length > 0) {
        current_bets.forEach(new_bet => {
            if (new_bet.color == color) {
                let username = new_bet.username
                if (color != 'green') {
                    connection.query(`UPDATE users SET balance = balance + ${new_bet.value * 2} WHERE username = '${username}'`, err => {
                        if (err) {
                            console.log(err)
                        }
                    })

                    io.sockets.to(new_bet.socket_id).emit('notify_success', `Você ganhou R$${(new_bet.value * 2).toFixed(2).toString().replace('.', ',')} com sua aposta!`)
                    io.sockets.to(new_bet.socket_id).emit('increase_balance', new_bet.value * 2)
                } else {
                    connection.query(`UPDATE users SET balance = balance + ${new_bet.value * 14} WHERE username = '${username}'`, err => {
                        if (err) {
                            console.log(err)
                        }
                    })

                    io.sockets.to(new_bet.socket_id).emit('notify_success', `Você ganhou R$${(new_bet.value * 14).toFixed(2).toString().replace('.', ',')} com sua aposta!`)
                    io.sockets.to(new_bet.socket_id).emit('increase_balance', new_bet.value * 14)
                }
            }
        })
    }


    if (last_numbers.length < 10) {
        last_numbers.push(num)
    } else {
        last_numbers.shift()
        last_numbers.push(num)
    }

    current_bets = []

    io.sockets.emit('number', num)
}, 10000);