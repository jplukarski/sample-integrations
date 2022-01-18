'use strict';
require("dotenv").config();
const express = require("express");
const app = express();
const braintree = require('braintree');

const port = process.env.PORT || 3001;

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
var router = express.Router();

var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   process.env.BT_MERCHANT_ID,
  publicKey:    process.env.BT_PUBLIC_KEY,
  privateKey:   process.env.BT_PRIVATE_KEY
});

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});

router.get('/', (req, res) => {
  res.send('Node server is running on this port.');
});

router.get('/client_token', (req, res) => {
  gateway.clientToken.generate({}, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send('Failed to retrieve client token, error: ' + err);
    }
  });
});

router.post('/checkout', (req, res) => {
  gateway.transaction.sale({
    amount: req.body.total,
    paymentMethodNonce: req.body.nonce,
    options: {
      storeInVaultOnSuccess: true
    }
  }, function(err, result){
    if(err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })
})

app.use('/', router);