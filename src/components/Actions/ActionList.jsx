import React, { Component } from 'react';
import PocketService from '../../services/PocketService';
import { Table } from 'reactstrap';

class ActionList extends Component {
    state = { 
        actions: [],
        loading: true
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

    render() { 
        return (
            <div className="col-12">
                { this.state.loading && <div className="loading mx-auto col-md-8"></div> }
                { !this.state.loading &&
                    <div className="action-list">
                        <h2 className="text-center">Action List</h2>
                        <Table className="mx-auto col-md-8">
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
                                this.state.actions.map( (action, index) => {
                                    return <tr key={ index }>
                                        <td>{ action.pocketName }</td>
                                        <td>{ action.amount }</td>
                                        <td>{ action.direction }</td>
                                        <td>{ typeof action.movement !== 'undefined' ? String(action.movement) : 'false' }</td>
                                        <td>{ new Date(action.timestamp).toLocaleDateString() }</td>
                                    </tr>
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