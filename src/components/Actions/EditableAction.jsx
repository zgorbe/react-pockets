import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PocketService from '../../services/PocketService';

class EditableAction extends Component {
    state = { 
        pocketNameFieldEdit: false,
        amountFieldEdit: false
    }
    componentDidMount() {        
        this.setState({
            pocketName: this.props.action.pocketName,
            amount: this.props.action.amount
        });
    }

    handleDoubleClick = (e) => {
        if (!this.props.edited) {
            this.props.handleActionEdit(this.props.action);
        }
        this.setState({
            [e.target.getAttribute('name') + 'FieldEdit']: true
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.getAttribute('name')]: e.target.value
        });
    }
    
    handleBlur = (e) => {
        PocketService.updateAction(
            this.props.action.key,
            this.props.action.pocket,
            this.state.pocketName, 
            this.state.amount
        );
        this.props.handleActionEdit({});
        this.setState({
            pocketNameFieldEdit: false,
            amountFieldEdit: false 
        });
    }

    handleDelete = (e) => {
        PocketService.deleteAction(this.props.action.key, this.props.action.pocket);
        this.props.handleActionEdit({});
    }

    render() { 
        return (
            <tr className="editable-action">
                <td className="pocket-name" name="pocketName" onDoubleClick={ this.handleDoubleClick }>
                    {!this.state.pocketNameFieldEdit ? this.props.action.pocketName : <input type="text" name="pocketName" onChange={ this.handleChange } onBlur={ this.handleBlur } value={ this.state.pocketName } autoFocus></input>}
                </td>
                <td className="pocket-amount" name="amount" onDoubleClick={ this.handleDoubleClick }>
                    {!this.state.amountFieldEdit ? this.props.action.amount : <input type="number" name="amount" onChange={ this.handleChange } onBlur={ this.handleBlur } value={ this.state.amount } autoFocus></input>}
                </td>
                <td>{this.props.action.direction}</td>
                <td>{ typeof this.props.action.movement !== 'undefined' ? String(this.props.action.movement) : 'false' }</td>
                <td>{ new Date(this.props.action.timestamp).toLocaleDateString() }</td>
            </tr>
        );
    }
}

EditableAction.propTypes = {
    action: PropTypes.object.isRequired,
    edited: PropTypes.bool.isRequired,
    handleActionEdit: PropTypes.func.isRequired
}

export default EditableAction;