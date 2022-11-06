import React, { useState, useEffect } from 'react'
import DropIn from '../components/DropIn'
import HostedFields from '../components/HostedFields'

export default function Checkout() {
    const [clientToken, setClientToken] = useState('')

    useEffect(() => {
        getClientToken()
    }, [])

    function getClientToken() {
        fetch('https://payments.sandbox.braintree-api.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': 'my_authorization',
                'Braintree-Version': '2022-01-01',
                'Content-Type': 'application/json',
            },
            body: '{"query": "mutation {createClientToken{ clientToken }}"}'
        })
            .then(res => res.json())
            .then((res, err)=> {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                    // setClientToken(res.data.createClientToken.clientToken)
                }
            })
    }

    return (
        <>
            Buy something
            {clientToken !== '' ? <HostedFields clientToken={clientToken} /> : <div>loading..</div>}

        </>
    )
}