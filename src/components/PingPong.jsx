import React, { useState } from 'react'

export default function PingPong() {
    function pingPong() {
        fetch('https://payments.sandbox.braintree-api.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': 'NXJ4ZzNrNXNudGRuaDQ4aDo5ODZhNjZiYzJjYWYxMTk3MTA1YzNjMzY2YjRmOTFjOA==',
                'Braintree-Version': '2019-01-01',
                'Content-Type': 'application/json',
            },
            body: '{"query": "query { ping }"}'
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
            })
    }
    return (
        <>
            <button onClick={pingPong}>Press me</button>
        </>
    )
}