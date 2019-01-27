import React, { Component } from 'react';
import PocketService from '../../services/PocketService';
import { Table } from 'reactstrap';
import EditableAction from './EditableAction';

class ActionList extends Component {
    state = { 
        actions: [],
        loading: true,
        editedAction: {}
    }

    constructor(props) {
        super(props);
        
        PocketService.getAllActions().then(actions => {
            this.setState({
                actions: actions,
                loading: false
            });
        });
    }

    handleActionEdit = (action) => {
        this.setState({
            editedAction: action
        });
    }

    render() { 
        const { loading, actions } = this.state;
        return (
            <div className="col-12">
                { loading && <div className="loading mx-auto col-md-8"></div> }
                { !loading &&
                    <div className="action-list">
                        <h2 className="text-center">Action List</h2>
                        <Table className="mx-auto col-md-8" striped>
                            <thead>
                                <tr>
                                    <th>Pocket</th>
                                    <th>Amount</th>
                                    <th>Direction</th>
                                    <th>Movement</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                actions.map( action => {
                                    return <EditableAction 
                                                action={ action } 
                                                key={ action.key } 
                                                edited={ this.state.editedAction.key === action.key }
                                                handleActionEdit={ this.handleActionEdit }></EditableAction>
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        );
    }
}
 
export default ActionList;