import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import CancelButton from './CancelButton';
import PocketService from '../../services/PocketService';

class CreateAction extends Component {
    state = { 
        pocket: 'A',
        amount: '0',
        direction: 'plus'
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
    
    handleCreateAction = () => {
        if (this._validate()) {
            PocketService.addAction(this.state.pocket, this.state.amount, this.state.direction);
            this.props.history.push('/');
        }
    }

    render() { 
        return ( 
            <Container className="action-form">
                <h2 className="text-center">Create Action</h2>
                <Form className="form mx-auto col-md-6">
                    <Col>
                        <FormGroup>
                            <Label for="pocket">Pocket:</Label>
                            <Input type="select" name="pocket" id="pocket" onChange={ this.handleChange }>
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
                        <FormGroup>
                            <Label for="direction">Direction:</Label>
                            <Input type="select" name="direction" id="direction" onChange={ this.handleChange }>
                                <option>plus</option>
                                <option>minus</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="text-center">
                            <Button color="info" onClick={ this.handleCreateAction }>Create Action</Button>
                            <CancelButton></CancelButton>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }
}
export default CreateAction;