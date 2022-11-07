import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

export default function Header() {
    return(
        <>
            <Navbar bg="dark" variant="dark" style={{marginBottom:"2em"}}>
                <Container>
                    <Navbar.Brand> <Link to={'/'}>Joe's Old Fashioned Doughnuts</Link> </Navbar.Brand>
                    <Navbar.Text>

                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    )
}