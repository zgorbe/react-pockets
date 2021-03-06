import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem    
} from 'reactstrap';

class Menu extends Component {
    state = {  }
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() { 
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Pockets</NavbarBrand>
                <NavbarToggler onClick={ this.toggle } />
                <Collapse isOpen={ this.state.isOpen } navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#/">Home</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Actions
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="#/create-action">Create Action</DropdownItem>
                                <DropdownItem href="#/create-movement">Create Movement</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="#/actions">All Actions</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Statistics
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="#/stats">Monthly Statistics</DropdownItem>
                                <DropdownItem href="#/yearly-stats">Yearly Statistics</DropdownItem>
                                <DropdownItem href="#/balance-stats">Balance Statistics</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>                        
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