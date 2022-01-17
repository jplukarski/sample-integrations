import React, { useState, useEffect } from 'react'
import dropin from 'braintree-web-drop-in';

export default function DropIn(props) {
    const [nonce, setNonce] = useState('')

    useEffect(() => {

        if (nonce === '') {
            createDropIn(props.clientToken)
        } else {
            chargePaymentMethod(nonce)
        }
    }, [nonce])

    function createDropIn(clientToken) {
        dropin.create({
            authorization: clientToken,
            container: '#btdropin'
        }, (clientErr, clientInstance) => {
            if (clientErr) {
                alert(clientErr)
                return
            }
            clientDidCreate(clientInstance)
        })
    }

    function clientDidCreate(instance) {
        const button = document.getElementById('makeAPayment')
        button.addEventListener('click', function () {
            instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                if (requestPaymentMethodErr) {
                    alert('Something went wrong')
                    return
                }
                console.log(payload.nonce)
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
        <>
            <div id="btdropin"></div>
            <button id='makeAPayment'>make a payment</button>
        </>
    )
}