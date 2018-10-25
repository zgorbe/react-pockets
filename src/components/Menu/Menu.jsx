import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class Menu extends Component {
    state = {  }
    render() { 
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#/actions">Actions</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#/login">Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar> 
         );
    }
}
 
export default Menu;