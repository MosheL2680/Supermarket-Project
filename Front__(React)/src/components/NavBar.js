import React, { useContext, useEffect } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaUser } from 'react-icons/fa';
import { TiHome } from "react-icons/ti";
import '../App.css'
import { Context } from '../App';



const NavBar = () => {
    const { uservalue } = useContext(Context)
    const { isAdminvalue } = useContext(Context)
    const [user] = uservalue
    const [is_admin] = isAdminvalue
  
   

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand style={{ color: 'aqua', fontSize: '25px', fontFamily: '-moz-initial', fontWeight: 'bolder' }}>MosheShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/categories" style={{ color: 'white', marginRight: '20px' }}><TiHome style={{ marginBottom: '5px' }} />
                            Shop
                        </Nav.Link>
                        <NavDropdown title={<span><FaUser style={{ marginBottom: '8px' }} />{user === 'user' ? 'Account' : user}</span>}>
                            <NavDropdown.Item>
                                <Link to="/login">
                                    <FaSignInAlt style={{ marginRight: '5px' }} /> {user === 'user' ? 'LogIn' : 'LogOut'}
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/register">
                                    <FaUserPlus style={{ marginRight: '5px' }} /> SignUp
                                </Link>
                            </NavDropdown.Item>
                            {user !== 'user' && (
                                <NavDropdown.Item>
                                    <Link to="/account">
                                        <FaUserPlus style={{ marginRight: '5px' }} /> Your profile
                                    </Link>
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
