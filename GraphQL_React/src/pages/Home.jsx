import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import donut from '../assets/images/donut.jpeg'

export default function Homepage() {
    return (
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
                        <Col>
                            <Link to={'/hosted-fields'}><Button>Hosted Fields</Button></Link>
                        </Col>
                        <Col>
                            <Link to={'/drop-in'}><Button>Drop-In</Button></Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </Container>
        </>
    )
}
