import React, { Component } from 'react';
import PocketService from '../../services/PocketService';
import BarChart from 'react-bar-chart';

const margin = { top: 20, right: 20, bottom: 30, left: 60 };

class Statistics extends Component {
    state = { 
        loading: true,
        data: [],
        width: 0,
        year: 2018
    }

    constructor(props) {
        super(props);

        this.statistics = React.createRef();

        PocketService.getAllActions(true).then(actions => {
            let data = this.getStatistics(actions, this.state.year);
            
            this.setState({
                loading: false,
                data: data                
            });
        }).then(() => {
            this.setState({ width: this.statistics.current.offsetWidth });
        });
    }

    componentDidMount() {
        window.onresize = () => {
            this.setState({ width: this.statistics.current.offsetWidth });
        };
    }

    getStatistics = (actions, year) => {
        let dataObj = {},
            result = [];

        for (let action of actions) {
            let date = new Date(action.timestamp),
                key = date.getFullYear() + '-' + (date.getMonth() + 1),
                data = dataObj[key];

            if (date.getFullYear() !== year) {
                continue;
            }

            if (!data) {
                dataObj[key] = [];
            }

            dataObj[key].push(action);
        }

        for (let key in dataObj) {
            dataObj[key] = dataObj[key].reduce((acc, action) => acc + action.amount * (action.direction === 'plus' ? 1 : -1), 0);
        }

        for (let key in dataObj) {
            result.push({
                text: key,
                value: dataObj[key] < 0 ? 0 : dataObj[key]
            });
        }
        
        return result;
    }

    handleBarClick = (element) => {
        console.log(element);
    }

    render() { 
        return ( 
            <div className="col-12">
                { this.state.loading && <div className="loading mx-auto col-md-8"></div> }
                { !this.state.loading &&
                    <div className="statistics" ref={ this.statistics }>
                        <h2 className="text-center">Monthly Statistics</h2>
                        <BarChart ylabel='Savings'
                            width={ this.state.width }
                            height={ 500 }
                            margin={ margin }
                            data={ this.state.data }
                            onBarClick={ this.handleBarClick } />
                    </div>
                }
            </div>            
        );
    }
}
 

export default Statistics;