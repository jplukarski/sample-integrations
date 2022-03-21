'use strict';

var express = require('express');
var app = express();
var braintree = require('braintree');
var bodyParser = require('body-parser');
var parseUrlEnconded = bodyParser.urlencoded({
  extended: false
});

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '',
  publicKey: '',
  privateKey: ''
});

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  gateway.clientToken.generate({
    merchantAccountId: 'joepenterprizes'
  }, function (err, res) {
    console.log(res)
    response.render('index', {
      clientToken: res.clientToken
    });
  });
});

// app.get('/', function (request, response) {
//   gateway.clientToken.generate({}, function (err, res) {
//     console.log(res)
//     response.render('index', {
//       clientToken: res.clientToken
//     });
//   });
// });

app.post('/process', parseUrlEnconded, function (request, response) {
  var nonceFromTheClient = request.body.payment_method_nonce;
  var transaction = request.body;
  console.log("My Transaction: ", JSON.stringify(transaction))
  gateway.transaction.sale({
    amount: '10',
    paymentMethodNonce: nonceFromTheClient,
    merchantAccountId: 'joepenterprizes',
    options: {
      storeInVaultOnSuccess: true
    }
  }, function (err, result) {

    if (err) throw err;

    if (result.success) {

      console.log(result);

      response.sendFile('success.html', {
        root: './public'
      });
    } else {
      response.sendFile('error.html', {
        root: './public'
      });
      console.log(result)
    }
  });

})


app.listen(3005, function () {
  console.log('Listening on port 3005');
});

module.exports = app;