 "use strict";

 var my3DSContainer = document.createElement('div');

 document.addEventListener("DOMContentLoaded", function (event) {
   braintree.client.create({
     authorization: client_token
   }, function (clientErr, clientInstance) {
     if (clientErr) {
       console.error(clientErr);
       return;
     }

     braintree.threeDSecure.create({
       version: 2, // Will use 3DS 2 whenever possible
       client: clientInstance
     }, function (threeDSecureErr, threeDSecureInstance) {
       if (threeDSecureErr) {
         console.log(threeDSecureErr)
         return;
       }
       threeDSecure = threeDSecureInstance;
     });

     braintree.hostedFields.create({
       client: clientInstance,
       styles: {
         'input': {
           'font-size': '25px'
         },
         'input.invalid': {
           'color': 'green'
         },
         'input.valid': {
           'color': 'brown'
         }
       },
       fields: {
         number: {
           selector: '#card-number',
           placeholder: '4111 1111 1111 1111'
         },
         cvv: {
           selector: '#cvv',
           placeholder: '123'
         },
         expirationDate: {
           selector: '#expiration-date',
           placeholder: '10/2019'
         }
       }
     }, function (hostedFieldsErr, hostedFieldsInstance) {
       if (hostedFieldsErr) {
         console.error(hostedFieldsErr);
         return;
       }

       submit.removeAttribute('disabled');

       form.addEventListener('submit', function (event) {
         event.preventDefault();

         hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
           if (tokenizeErr) {
             console.error(tokenizeErr);
             return;
           }

           threeDSecure.verifyCard({
             amount: '500.00',
             nonce: payload.nonce,
             bin: payload.bin,
             email: 'test@example.com',
             addFrame: function (err, iframe) {
               // Set up your UI and add the iframe.
               my3DSContainer.appendChild(iframe);
               document.body.appendChild(my3DSContainer);
             },
             removeFrame: function () {
               // Remove UI that you added in addFrame.
               document.body.removeChild(my3DSContainer);
             },
             billingAddress: {
               givenName: 'Jane',
               surname: 'Doe',
               phoneNumber: '8101234567',
               streetAddress: '555 Smith St.',
               extendedAddress: '#5', // When available
               locality: 'Oakland',
               region: 'CA',
               postalCode: '12345',
               countryCodeAlpha2: 'US'
             },
             additionalInformation: {
               acsWindowSize: '01',
               workPhoneNumber: '8101234567',
               shippingGivenName: 'Jill',
               shippingSurname: 'Doe',
               shippingPhone: '8101234567',
               shippingAddress: {
                 streetAddress: '555 Smith St.',
                 extendedAddress: '#5', // When available
                 locality: 'Oakland',
                 region: 'CA',
                 postalCode: '12345',
                 countryCodeAlpha2: 'US'
               }
             },

             onLookupComplete: function (data, next) {
               next();
             }
           }, function (err, response) {
             if (err) {
               console.log(err)
               return;
             }
             console.log(response)
             console.log('Got a nonce: ' + response.nonce);
             document.querySelector('#nonce').value = response.nonce;
             form.submit();
           });

         });
       }, false);
     });
   });
 });