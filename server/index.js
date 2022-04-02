const mysql = require('mysql')
const io = require('socket.io')(8000)

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabriel140305-',
    database: 'casino'
});

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
    io.sockets.emit('number', num)
}, 5000);