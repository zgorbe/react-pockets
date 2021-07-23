import React, { Component } from 'react';
import { pockectsRef } from '../../firebase';
import { Jumbotron, Table, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = {
        pockets: [],
        total: 0,
        loading: true
    }

    constructor(props) {
        super(props);

        pockectsRef.on('value', snapshot => {
            let array = [],
                resultObject = snapshot.val(),
                total = 0;

            array = Object.keys(resultObject).map(key => {
                total += resultObject[key].balance;
                const pocket = resultObject[key];
                pocket.pocketId = key;
                return pocket;
            });

            this.setState({
                pockets: array,
                total: total,
                loading: false
            });
        });
    }

    componentWillUnmount() {
        pockectsRef.off();
    }

    render() {
        return (
            <div className="col-12">
                { this.state.loading && <div className="loading mx-auto col-md-8"></div> }
                { !this.state.loading &&
                    <div className="home">
                        <Jumbotron>
                            <h3>Your total balance is { this.state.total.toLocaleString() }</h3>
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
                                this.state.pockets.map( pocket => {
                                    return <tr key={ pocket.pocketId }>
                                        <td>
                                            <Link
                                                to={`/actions/${pocket.pocketId}`}
                                                className="mr-1"
                                            >
                                                { pocket.name }
                                            </Link>
                                            <Badge color="info">
                                                { pocket.actions ? Object.keys(pocket.actions).length : 0 }
                                            </Badge>
                                        </td>
                                        <td>{ pocket.balance.toLocaleString() }</td>
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
