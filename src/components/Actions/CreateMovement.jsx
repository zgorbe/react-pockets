import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import CancelButton from './CancelButton';
import PocketService from '../../services/PocketService';

class CreateMovement extends Component {
    state = { 
        sourcePocket: 'A',
        destinationPocket: 'O',
        amount: '0'
    }

    constructor(props) {
        super(props);

        this.amountInput = React.createRef();
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    _validate = () => {
        let amount = parseInt(this.state.amount, 10);

        if (amount) {
            return true;
        } else {
            this.setState({ amountError: 'Invalid value for amount!' });
            this.amountInput.current.focus(); // TODO: focus is not working
            return false;
        }
    }
    
    handleCreateMovement = () => {
        if (this._validate()) {
            PocketService.addMovement(this.state.sourcePocket, this.state.destinationPocket, this.state.amount);
            this.props.history.push('/');
        }
    }

    render() { 
        return ( 
            <Container className="action-form">
                <h2 className="text-center">Create Movement</h2>
                <Form className="form mx-auto col-md-6">
                    <Col>
                        <FormGroup>
                            <Label for="sourcePocket">Source Pocket:</Label>
                            <Input type="select" name="sourcePocket" id="sourcePocket" onChange={ this.handleChange }>
                                <option>A</option>
                                <option>O</option>
                                <option>H</option>
                                <option>L</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="destinationPocket">Source Pocket:</Label>
                            <Input type="select" name="destinationPocket" id="destinationPocket" onChange={ this.handleChange } defaultValue="O">
                                <option>A</option>
                                <option>O</option>
                                <option>H</option>
                                <option>L</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="amount">Amount:</Label>
                            <Input invalid={ !!this.state.amountError } ref={ this.amountInput } type="number" name="amount" id="amount" onChange={ this.handleChange } />
                            <FormFeedback>{ this.state.amountError }</FormFeedback>
                        </FormGroup>
                        <FormGroup className="text-center">
                            <Button color="info" onClick={ this.handleCreateMovement }>Create Movement</Button>
                            <CancelButton></CancelButton>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }
}
export default CreateMovement;