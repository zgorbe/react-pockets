import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback, UncontrolledAlert } from 'reactstrap';
import CancelButton from './CancelButton';
import PocketService from '../../services/PocketService';

class CreateAction extends Component {
    state = { 
        pocketId: '',
        amount: 0,
        direction: 'plus',
        loading: true,
        pockets: [],
        error: ''
    }

    constructor(props) {
        super(props);

        this.amountInput = React.createRef();
        PocketService.getPockets().then(pockets => {
            if (pockets.length) {
                this.setState({
                    pocketId: pockets[0].id,
                    pockets: pockets,
                    loading: false
                });
            }
        });
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
            PocketService.addAction(this.state.pocketId, parseInt(this.state.amount, 10), this.state.direction).then(
                () => {
                    this.props.history.push('/');
                },
                error => {
                    this.setState({
                        error: error,
                        amountError: '' 
                    });
                }
            );
        }
    }

    render() { 
        return ( 
            <Container className="action-form">
                <h2 className="text-center">Create Action</h2>
                { this.state.loading && <div className="col-md-12 loading"></div> }
                { !this.state.loading && 
                <Form className="form mx-auto col-md-6">
                    <Col>
                        { !!this.state.error.length && <UncontrolledAlert color="danger">{ this.state.error }</UncontrolledAlert> }
                        <FormGroup>
                            <Label for="pocketId">Pocket:</Label>
                            <Input type="select" name="pocketId" id="pocketId" onChange={ this.handleChange }>
                                {
                                    this.state.pockets.map((pocket) => {
                                        return <option value={ pocket.id } key={ pocket.id }>{ pocket.name }</option>
                                    })
                                }
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
                }
            </Container>
        );
    }
}
export default CreateAction;