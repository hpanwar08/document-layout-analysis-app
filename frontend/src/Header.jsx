import React, { Component } from 'react'
import { Container, Navbar } from "react-bootstrap"

import "./App.css"

export default class Header extends Component {

    render() {
        return (
            <div>
                {/* <Navbar  expand='lg' style={{backgroundColor: '#fff3e0'}}> */}
                <Navbar expand='lg' bg='info' fixed="top" className='shadow-lg'>
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Brand className='logo text-light'>Document Layout Analysis</Navbar.Brand>
                        <Navbar.Text className='logo text-light'>
                            v0.1
                        </Navbar.Text>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
