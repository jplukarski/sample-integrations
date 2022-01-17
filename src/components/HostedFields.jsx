import React, { useState, useEffect } from 'react'
// import hostedFields from 'braintree-web/hosted-fields'
// import client from 'braintree-web/client'

export default function HostedFields(props) {
    const [nonce, setNonce] = useState('')
    useEffect(() => {
        if (nonce === '') {
            createHostedFields(props.clientToken)
        } else {
            chargePaymentMethod(nonce)
        }
    }, [nonce])

    function createHostedFields(clientToken) {
        client.create({
            authorization: clientToken
        }, function (clientErr, clientInstance) {
            if (clientErr) {
                alert(clientErr)
                return
            }
            clientDidCreate(clientInstance)
        })
    }

    function clientDidCreate(clientInstance) {
        const options = {
            client: clientInstance,
            styles: {
                'input': {
                    'font-size': '12pt',
                    'color': '#3A3A3A',
                },
                '.valid': {
                    'highlight-color': 'green',
                    'font-size': '12pt'
                }
            },
            fields: {
                number: {
                    selector: '#card-number',
                    placeholder: "4111 1111 1111 1111"
                },
                cvv: {
                    selector: '#cvv',
                    placeholder: "123"
                },
                expirationDate: {
                    selector: '#expiration-date',
                    placeholder: "10/20"
                },
                postalCode: {
                    selector: '#postal-code',
                    placeholder: '90210'
                }
            }
        }
        hostedFields.create(options, function (hostedFieldsErr, hostedFieldsInstance) {
            if (hostedFieldsErr) {
                alert(hostedFieldsErr)
            }
            hostedFieldsDidCreate(hostedFieldsInstance)
        })
    }

    function hostedFieldsDidCreate(hostedFieldsInstance) {
        const form = document.querySelector('#my-sample-form')

        form.addEventListener('submit', function (event) {
            event.preventDefault()
            hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                if (tokenizeErr) {
                    alert(tokenizeErr)
                }
                setNonce(payload.nonce)
            })
        })
    }

    function chargePaymentMethod(nonce) {
        fetch('https://payments.sandbox.braintree-api.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': 'NXJ4ZzNrNXNudGRuaDQ4aDo5ODZhNjZiYzJjYWYxMTk3MTA1YzNjMzY2YjRmOTFjOA==',
                'Braintree-Version': '2019-01-01',
                'Content-Type': 'application/json',
            },
            body: `{ "query": "mutation chargePaymentMethod($input: ChargePaymentMethodInput!){chargePaymentMethod(input: $input) {transaction {id status}}}" ,"variables": {"input": {"paymentMethodId": "${nonce}","transaction": {"amount": "11.23"}}}}`
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
            })
    }

    return (
        <form action="/" method="post" id="my-sample-form">
            <div>
                <h2>Enter Card Details</h2>
            </div>

            <label htmlFor="card-number">Card Number</label>
            <div id="card-number"></div>

            <label htmlFor="cvv">CVV</label>
            <div id="cvv"></div>

            <label htmlFor="expiration-date">Expiration Date</label>
            <div id="expiration-date"></div>

            <label htmlFor="postal-code">Postal Code:</label>
            <div id="postal-code"></div>

            <input id="my-submit" type="submit" value="Checkout" />
        </form>
    )
}