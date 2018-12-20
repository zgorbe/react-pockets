import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback, UncontrolledAlert } from 'reactstrap';
import CancelButton from './CancelButton';
import PocketService from '../../services/PocketService';

class CreateMovement extends Component {
    state = { 
        sourcePocketId: '',
        destinationPocketId: '',
        amount: 0,
        loading: true,
        pockets: [],
        error: ''
    }

    constructor(props) {
        super(props);

        this.amountInput = React.createRef();
        PocketService.getPockets().then((pockets) => {
            if (pockets.length > 1) {
                this.setState({
                    sourcePocketId: pockets[0].id,
                    destinationPocketId: pockets[0].id,
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
    
    handleCreateMovement = () => {
        if (this._validate()) {
            PocketService.addMovement(
                this.state.sourcePocketId, 
                this.state.destinationPocketId, 
                parseInt(this.state.amount, 10)).then(
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
                <h2 className="text-center">Create Movement</h2>
                { this.state.loading && <div className="col-md-12 loading"></div> }
                { !this.state.loading && 
                <Form className="form mx-auto col-md-6">
                    <Col>
                        { !!this.state.error.length && <UncontrolledAlert color="danger">{ this.state.error }</UncontrolledAlert> }
                        <FormGroup>
                            <Label for="sourcePocketId">Source Pocket:</Label>
                            <Input type="select" name="sourcePocketId" id="sourcePocketId" onChange={ this.handleChange }>
                                {
                                    this.state.pockets.map(pocket => {
                                        return <option value={ pocket.id } key={ pocket.id }>{ pocket.name }</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="destinationPocketId">Destination Pocket:</Label>
                            <Input type="select" name="destinationPocketId" id="destinationPocketId" onChange={ this.handleChange }>
                                {
                                    this.state.pockets.map(pocket => {
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
                        <FormGroup className="text-center">
                            <Button color="info" onClick={ this.handleCreateMovement }>Create Movement</Button>
                            <CancelButton></CancelButton>
                        </FormGroup>
                    </Col>
                </Form>
                }
            </Container>
        );
    }
}
export default CreateMovement;