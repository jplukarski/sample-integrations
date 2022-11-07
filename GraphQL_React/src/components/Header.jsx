import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    return(
        <>
            <Navbar bg="dark" variant="dark" style={{marginBottom:"2em"}}>
                <Container>
                    <Navbar.Brand href="/">Joe's Old Fashioned Doughnuts</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}