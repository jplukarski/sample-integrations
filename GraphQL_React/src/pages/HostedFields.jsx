import React, { useState, useEffect } from 'react'
import CheckoutForm from '../components/HostedFields'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import donut from '../assets/images/donut.jpeg'

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
            <Container>
            <Card
            className="d-flex justify-content-center align-items-center">

                <Image
                rounded
                style={{height:'75%', width:'75%', padding:'2em'}}
                src={donut}
                />
                <Card.Body>
                    <Row>
                        {clientToken ? <CheckoutForm clientToken={clientToken}/> : "loading..."}
                    </Row>
                </Card.Body>
            </Card>
            </Container>
        </>
    )
}