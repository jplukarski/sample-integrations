import React, { useState } from 'react'
import BrowserRouter, { Link } from 'react-router-dom'

export default function Homepage() {
    return (
        <>
            Home
            <Link to={'/checkout'}><button>Buy something</button></Link>
        </>
    )
}
