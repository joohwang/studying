const express = require('express');
const app = express();

const fs = require("fs");

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/index.html`);
}).get('*.js', (req, resp) => {
    resp.sendFile(`${__dirname}${req.url}`);
}).get('/static/img/*', (req, resp) => {
    resp.sendFile(`${__dirname}${req.url}`);
}).get("*.json", (req, resp) => {
    const file = fs.readFileSync(`${__dirname}/resource/types${req.url}`, "utf-8");
    resp.setHeader("Content-type", "application/json;charset=UTF-8");
    resp.send(file);
});



const server = require('http');

server.createServer(app).listen(9999, 'localhost', () => {
    console.log('start');
});