import React, { Component } from 'react';
import { Button } from 'reactstrap';
//import PocketService from '../../services/PocketService';

class EditableAction extends Component {
    componentDidMount() {        
        this.setState({
            pocketName: this.props.action.pocketName,
            amount: this.props.action.amount,
            direction: this.props.action.direction,
            date: this.props.action.date
        });
    }

    handleDoubleClick = () => {
        if (!this.props.edited) {
            this.props.handleActionEdit(this.props.action);
        }
    }

    handleChange = () => {

    }

    handleSave = (e) => {
        // TODO save edited action
        console.log(this.state);
        this.props.handleActionEdit({});
    }

    handleCancel = () => {
        this.props.handleActionEdit({});
    }

    handleDelete = (e) => {
        // TODO delete edited action
        this.props.handleActionEdit({});
    }

    render() { 
        return (
            <tr className="editable-action" onDoubleClick={ this.handleDoubleClick }>
                <td>{!this.props.edited ? this.props.action.pocketName : <input type="text" name="pocketName" onChange={ this.handleChange } value={ this.state.pocketName } autoFocus></input>}</td>
                <td>{!this.props.edited ? this.props.action.amount : <input type="number" name="amount" onChange={ this.handleChange } value={ this.state.amount }></input>}</td>
                <td>{ this.props.action.direction }</td>
                <td>{ typeof this.props.action.movement !== 'undefined' ? String(this.props.action.movement) : 'false' }</td>
                <td>{ new Date(this.props.action.timestamp).toLocaleDateString() }</td>
                { this.props.edited && 
                    <td className="buttons">
                        <Button color="success" size="sm" onClick={ this.handleSave }>Save</Button>
                        <Button color="warning" size="sm" onClick={ this.handleCancel }>Cancel</Button>
                        <Button color="danger" size="sm" onClick={ this.handleDelete }>Delete</Button>
                    </td>
                }
            </tr>
        );
    }
}
 
export default EditableAction;