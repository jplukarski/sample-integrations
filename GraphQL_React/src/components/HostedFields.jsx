import React, { useState, useEffect, useRef } from 'react'
import hostedFields from 'braintree-web/hosted-fields'
import client from 'braintree-web/client'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function HostedFields(props) {
    const [nonce, setNonce] = useState('')
    const formRef = useRef()
    const cardNumberRef = useRef()
    const cvvRef = useRef()
    const expiryRef = useRef()
    const postalCodeRef = useRef()

    useEffect(() => {
        if (nonce === '') {
            createHostedFields(props.clientToken)
        } else {
            chargePaymentMethod(nonce)
        }
    }, [nonce, createHostedFields, props.clientToken])

    function createHostedFields(clientToken) {
        client.create({
            authorization: clientToken
        }, function (clientErr, clientInstance) {
            if (clientErr) {
                console.log(clientErr)
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
                    container: '#card-number',
                    placeholder: "4111 1111 1111 1111"
                },
                cvv: {
                    container: '#cvv',
                    placeholder: "123"
                },
                expirationDate: {
                    container: '#expiration-date',
                    placeholder: "10/20"
                },
                postalCode: {
                    container: '#postal-code',
                    placeholder: '90210'
                }
            }
        }
        hostedFields.create(options, function (hostedFieldsErr, hostedFieldsInstance) {
            if (hostedFieldsErr) {
                alert(hostedFieldsErr)
            }
            console.log(hostedFieldsInstance)
            hostedFieldsDidCreate(hostedFieldsInstance)
        })
    }

    function hostedFieldsDidCreate(hostedFieldsInstance) {
        console.log(formRef)
        formRef.current.addEventListener('submit', function (event) {
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
                'Authorization': process.env.REACT_APP_GRAPHQL_AUTH, 
                'Braintree-Version': '2019-01-01',
                'Content-Type': 'application/json',
            },
            body: `{ "query": "mutation chargePaymentMethod($input: ChargePaymentMethodInput!){chargePaymentMethod(input: $input) {transaction {id status}}}" ,"variables": {"input": {"paymentMethodId": "${nonce}","transaction": {"amount": "11.23"}}}}`
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if(result.data.chargePaymentMethod.transaction) {
                    console.log('cool')
                }
            })
    }

    return (
        <>
            <Form action="/" method="post" ref={formRef}>

                <h2>Enter Card Details</h2>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="card-number">Card Number</Form.Label>
                    <Form.Control id="card-number" ref={cardNumberRef}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="cvv">CVV</Form.Label>
                    <Form.Control id="cvv" ref={cvvRef}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="expiration-date">Expiry Date</Form.Label>
                    <Form.Control id="expiration-date" ref={expiryRef}></Form.Control>
                </Form.Group>
                    
                <Form.Group>
                    <Form.Label htmlFor="postal-code">Postal Code</Form.Label>
                    <Form.Control id="postal-code" ref={postalCodeRef}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Button id="my-submit" type="submit">Checkout</Button>
                </Form.Group>
            </Form>
        </>
    )
}