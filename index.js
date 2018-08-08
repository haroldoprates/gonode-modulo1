const express = require('express');

const nunjucks = require('nunjucks');
const path = require('path');

const moment = require('moment');


const bodyParser = require('body-parser');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('main');
});

app.post('/auth', (req, res) => {

    const { nome, dataNascimento } = req.body;

    const DATA_NASCIMENTO = dataNascimento;
    const idade = moment().diff(moment(DATA_NASCIMENTO, 'DD/MM/YYYY'), 'years');
    if (idade < 18) {
        res.render('minor', { nome });
    } else {
        res.render('major', { nome });
    }
});

app.listen(3000);
