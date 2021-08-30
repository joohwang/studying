const express = require('express');
const app = express();

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/index.html`);
}).get('*.js', (req, resp) => {
    resp.sendFile(`${__dirname}${req.url}`);
}).get('/static/img/*', (req, resp) => {
    resp.sendFile(`${__dirname}${req.url}`);
})



const server = require('http');

server.createServer(app).listen(9999, 'localhost', () => {
    console.log('start');
});