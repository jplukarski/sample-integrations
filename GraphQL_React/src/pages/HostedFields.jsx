import React, { useState, useEffect } from 'react'
import CheckoutForm from '../components/HostedFields'

export default function HostedFields() {
    const [clientToken, setClientToken] = useState('')

    useEffect(()=>{
        getClientToken()
    },[])

    function getClientToken() {
        fetch('https://payments.sandbox.braintree-api.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': process.env.REACT_APP_GRAPHQL_AUTH,
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
                    setClientToken(res.data.createClientToken.clientToken)
                }
            })
    }

    return(
        <>
            {clientToken ? <CheckoutForm clientToken={clientToken}/> : "loading..."}
        </>
    )
}