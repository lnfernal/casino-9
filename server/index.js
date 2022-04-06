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

let current_mines = []

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
}

function endMineGame(game_id) {
    let game = current_mines.find(g => g.socket_id === game_id)
    current_mines.remove(game)
}

connection.connect((err) => {
    if (err) {
        console.error(`Error connecting to MySQL: ${err.message}`)
    } else {
        console.log(`Successfully connected to MySQL database.`)
    }
})

io.on('connection', (socket) => {
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

                        io.sockets.emit('new_entry', { username: user, value: bet.value, color: bet.color })
                    }
                }
            }
        })
    })

    socket.on('mine_clicked', mine => {
        let game = current_mines.find(g => g.socket_id === socket.id)
        if (game) {
            if (!game.clicked_items.includes(mine.clicked_button_id)) {
                game.addClicked(mine.clicked_button_id)
                if (game.array_bombs.indexOf(Number(mine.clicked_button_id)) >= 0) {
                    io.sockets.to(socket.id).emit('loss', mine.clicked_button_id)
                    endMineGame(socket.id)
                } else {
                    game.addHit()
                    game.multiply()
                    io.sockets.to(socket.id).emit('new_payback', game.current_payback.toFixed(2))
                    io.sockets.to(socket.id).emit('win', mine.clicked_button_id)
                }
            }
        } else {
            io.sockets.to(socket.id).emit('notify_error', 'Você deve começar um novo jogo')
        }
    })

    socket.on('end_mine_game', game_id => {
        let game = current_mines.find(g => g.socket_id === socket.id)

        if (game) {
            if (game.hits == 0) {
                io.sockets.to(socket.id).emit('notify_error', 'Você deve fazer uma jogada antes de parar')
            } else {
                connection.query(`UPDATE users SET balance = balance + ${game.current_payback} WHERE username = '${game.author}'`, err => {
                    if (err) {
                        console.log(err)
                    }
                })

                endMineGame(game_id)
                io.sockets.to(socket.id).emit('notify_success', `Você ganhou R$${game.current_payback.toFixed(2)} com sua aposta!`)
                io.sockets.to(socket.id).emit('increase_balance', Number(game.current_payback))

                io.sockets.to(socket.id).emit('reset_board', socket.id)
            }

        } else {
            io.sockets.to(socket.id).emit('reset_board', socket.id)
        }
    })

    socket.on('mines_bet', mine_bet => {
        if (mine_bet.auth.length > 32) {
            let pass = mine_bet.auth.slice(0, 32)
            let user = mine_bet.auth.slice(32, mine_bet.auth.length)

            connection.query(`SELECT balance FROM users WHERE username = '${user}' AND password = '${pass}';`, (err, row) => {
                if (err) {
                    console.log(err)
                    io.sockets.to(socket.id).emit('notify_error', err)
                } else {
                    if (row.length > 0) {
                        if (!current_mines.find(g => g.socket_id === socket.id)) {
                            if (mine_bet.value <= row[0].balance) {
                                io.sockets.to(mine_bet.socket_id).emit('notify_success', 'Jogo Iniciado')
                                connection.query(`UPDATE users SET balance = balance - ${mine_bet.value} WHERE username = '${user}'`, err => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        io.sockets.to(socket.id).emit('decrease_balance', mine_bet.value)
                                    }
                                })
                                let game = new MineGame(mine_bet.socket_id, mine_bet.mine_count, mine_bet.value, user)
                                current_mines.push(game)

                                connection.query(`SELECT admin FROM users WHERE username = '${user}' AND admin = 1;`, (err, adm) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    if (row.length > 0) {
                                        io.sockets.to(socket.id).emit('consolelog', game.array_bombs.sort(function (a, b) {
                                            return a - b
                                        }))
                                    }
                                })

                                io.sockets.to(socket.id).emit('start_mine_game', socket.id)
                            } else {
                                io.sockets.to(socket.id).emit('notify_error', 'Saldo Insuficiente')
                            }
                        } else {
                            io.sockets.to(socket.id).emit('notify_error', 'Um jogo já foi iniciado')
                        }
                    }
                }
            })
        }
    })
})

class MineGame {
    constructor(socket_id, mine_count, bet, author, current_payback, array_bombs, multiplier, hits, clicked_items, probability) {
        this.socket_id = socket_id
        this.mine_count = mine_count
        this.bet = bet
        this.author = author
        this.current_payback = bet

        this.clicked_items = []

        this.hits = 0

        this.probability = (25 - mine_count) / 25

        this.multiplier = function () {
            return 0.97 / this.probability
        }

        this.addHit = function () {
            this.hits++
        }

        this.multiply = function () {
            this.current_payback = this.current_payback * 0.97 / this.probability
        }

        this.addClicked = function (number) {
            this.clicked_items.push(number)
        }

        this.array_bombs = []

        for (let i = 0; i < mine_count; i++) {
            let num = generateNumber(0, 24)

            if (this.array_bombs.includes(num)) {
                i--
            } else {
                this.array_bombs.push(num)
            }
        }
    }

    get multiplicador() {
        return this.CalculoMultiplicador()
    }

    CalculoMultiplicador() {
        return 0.97 / this.probability
    }

    get hitQty() {
        return this.hits
    }

    get pegaArray() {
        return this.array
    }
}

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