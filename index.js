const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index');
});

let names = [];

app.get('/users', urlencodedParser, (req, res) => {
	let index = names.indexOf(req.params.name);
	names.splice(index, 1);
	res.render('users', {names: names});
});

app.post('/users', urlencodedParser, (req, res) => {
	names.push(req.body.name);
	res.render('users', { names: names });
});

app.get('/edit', urlencodedParser, (req, res) => {
	names.push(req.body.name);
	res.render('edit', { names: names });
});

app.post('/edit', urlencodedParser, (req, res) => {
	res.render('index');
});

app.get('*', (req, res) => {
    res.status(404).end('Not found');
});

app.use((err, req, res, next) => {
    res.status(400).end('Something is wrong');
});

app.listen(8000);