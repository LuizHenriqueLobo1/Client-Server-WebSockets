const app  = require('express')();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

var myColor = 'black';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
    console.log(`Novo usuário conectado! ID => ${socket.id}`);

    socket.emit('loadColor', myColor);

    socket.on('sendColor', (color) => {
        myColor = color;
        socket.broadcast.emit('updateColor', color);
    });
});

http.listen(3000, () => {
    console.log(`Ouvindo na porta 3000`);
});