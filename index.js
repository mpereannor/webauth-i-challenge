const server = require('./api/server');
server.get('/', (req, res) => {
    res.send('test!!')
});

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));