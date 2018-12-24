import React, { Component } from 'react';
import PocketService from '../../services/PocketService';
import BarChart from 'react-bar-chart';
import { Alert } from 'reactstrap';

const margin = { top: 20, right: 20, bottom: 30, left: 60 };

class YearlyStatistics extends Component {
    state = { 
        loading: true,
        data: [],
        width: 0,
        saving: 0
    }

    constructor(props) {
        super(props);

        this.statistics = React.createRef();

        PocketService.getAllActions(true).then(actions => {
            let data = this.getStatistics(actions);
            
            this.setState({
                loading: false,
                data: data                
            });
        }).then(() => {
            this.setState({ width: this.statistics.current.offsetWidth });
        });
    }

    handleWindowResize = () => {
        this.setState({ width: this.statistics.current.offsetWidth });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    getStatistics = (actions) => {
        let dataObj = {},
            result = [];

        for (let action of actions) {
            let date = new Date(action.timestamp),
                year = date.getFullYear(),
                month = date.getMonth();

            dataObj[year] = dataObj[year] || {}; 
            dataObj[year][month] = dataObj[year][month] || [];
            dataObj[year][month].push(action);
        }
        
        for (let year in dataObj) {
            for (let month in dataObj[year]) {
                dataObj[year][month] = dataObj[year][month].reduce((acc, action) => acc + action.amount * (action.direction === 'plus' ? 1 : -1), 0);
            }

            let yearBalance = Object.values(dataObj[year]).reduce((acc, balance) => acc + balance);
            result.push({
                text: year,
                value: yearBalance > 0 ? yearBalance : 0
            })
        }                
        
        return result;
    }

    handleBarClick = element => {
        if (this.state.saving === 0) {
            this.setState({ saving: element.value });
            setTimeout(() => {
                this.setState({ saving: 0 });
            }, 2000);
        }
    }

    render() { 
        return ( 
            <div className="col-12">
                { this.state.loading && <div className="loading mx-auto col-md-8"></div> }
                { !this.state.loading &&
                    <div className="statistics" ref={ this.statistics }>
                        <h2 className="text-center">Yearly Statistics</h2>
                            <BarChart ylabel='Savings'
                                width={ this.state.width }
                                height={ 500 }
                                margin={ margin }
                                data={ this.state.data }
                                onBarClick={ this.handleBarClick } />
                    </div>
                }
                { this.state.saving > 0  && <Alert className="saving" color="success"><b>{ this.state.saving }</b> saving in the selected year!</Alert> }
            </div>            
        );
    }
}
 

export default YearlyStatistics;