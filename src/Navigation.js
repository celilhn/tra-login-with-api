import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{
    constructor(props) {
        super(props);
        this.state = {value: '', resultMessage: '', hiddenn: true, aauthorize: false};
   
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        event.preventDefault();
      }
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                    Home
                </NavLink>

                <NavLink className="d-inline p-2 bg-dark text-white" to="/department" onClick={this.handleChange}>
                    Dashboard
                </NavLink>

                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}