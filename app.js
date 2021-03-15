var express = require('express');
var exphbs  = require('express-handlebars');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const mercadopago = require('mercadopago');

dotenv.config();

mercadopago.configure({
    access_token: "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
    integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
});

const port = process.env.PORT || 3000

var app = express();

app.use(cors());

app.use(bodyParser.json());
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res)=> res.render('home'));

app.get('/detail', (req, res)=> res.render('detail', req.query));
app.get('/pending', (req, res)=> res.render('pending', req.query));
app.get('/failure', (req, res)=> res.render('failure', req.query));

app.post('/notifications', (request, response) => {
    //const data = request.body;
    /*mercadopago.ipn.manage(request.body)
    .then(data => response.send(data))
    .then((error) => console.log(error));*/
    console.log(request.body);
    response.send(request.body);
});
/*Ejemplo: Si configuraste la notification_url: 
https://www.yoursite.com/notifications, 
recibirás notificaciones de pago de esta manera: 
https://www.yoursite.com/notifications?topic=payment&id=123456789 */

app.post('/checkout', (request, response) =>{
    const preference = request.body;

    mercadopago.preferences.create(preference)
    .then(res => {
        global.id = res.body.id;
        console.log(res.body);
        response.send(res.body);
    });
});


app.listen(port);