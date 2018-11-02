import React, { Component } from 'react';
import { pockectsRef } from '../../firebase';
import { Jumbotron, Table, Badge } from 'reactstrap';

class Home extends Component {
    state = { 
        pockets: [],
        total: 0,
        loading: true
    }
    
    componentWillMount() {
        pockectsRef.on('value', snapshot => {
            let array = [],
                resultObject = snapshot.val(),
                total = 0;

            array = Object.keys(resultObject).map(key => {
                total += resultObject[key].balance;
                return resultObject[key];
            });

            this.setState({ 
                pockets: array,
                total: total,
                loading: false
            });
        });
    }
    render() { 
        return (
            <div className="col-12">
                { this.state.loading && <div className="loading mx-auto col-md-8"></div> }
                { !this.state.loading &&
                    <div className="home">
                        <Jumbotron>
                            <h3>Your total balance is { this.state.total }</h3>
                        </Jumbotron>
                        <Table className="mx-auto col-md-8">
                            <thead>
                                <tr>
                                    <th>Pocket</th>
                                    <th>Balance</th>
                                    <th>Last Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.pockets.map( (pocket, index) => {
                                    return <tr key={ index }>
                                        <td>
                                            { pocket.name } <Badge color="info">{ Object.keys(pocket.actions).length }</Badge>
                                        </td>
                                        <td>{ pocket.balance }</td>
                                        <td>{ new Date(pocket.timestamp).toLocaleDateString() }</td>
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
 
export default Home;