import React from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector} from 'react-redux'

const Header = () => {
    const {cartItems}=useSelector(state=> state.cart);
    console.log('cartItems',cartItems);
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src={logo} alt="" />
                            PowerHubShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link href='/cart'><FaShoppingCart /> Cart
                            {cartItems.length > 0 && (
                                <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                    {cartItems.reduce((acc,item)=> acc+item.qty,0)}
                                </Badge>
                            )}
                            </Nav.Link>
                            <Nav.Link href='/login'><FaUser /> Sign-In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header