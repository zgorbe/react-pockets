import React, { Component } from 'react';
import PocketService from '../../services/PocketService';
import BarChart from 'react-bar-chart';
import { Alert } from 'reactstrap';

const margin = { top: 20, right: 20, bottom: 30, left: 60 };

class YearlyStatistics extends Component {
    state = { 
        loading: true,
        data: [],
        incomingData: [],
        outgoingData: [],
        width: 0,
        saving: 0
    }

    constructor(props) {
        super(props);

        this.statistics = React.createRef();

        PocketService.getStatisticsData().then(dataObj => {
            let data = this.getStatistics(dataObj),
                incomingData = this.getStatistics(PocketService.filterIncomingOutgingData(dataObj, true)),
                outgoingData = this.getStatistics(PocketService.filterIncomingOutgingData(dataObj, false));

            this.setState({
                loading: false,
                data: data,
                incomingData: incomingData,
                outgoingData: outgoingData            
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

    getStatistics = dataObj => {
        let result = [],
            tempDataObj = {};

        for (let year in dataObj) {
            for (let month in dataObj[year]) {
                tempDataObj[year] = tempDataObj[year] || {}; 
                tempDataObj[year][month] = tempDataObj[year][month] || [];
                tempDataObj[year][month] = dataObj[year][month].reduce((acc, action) => acc + action.amount * (action.direction === 'plus' ? 1 : -1), 0);
            }

            let yearBalance = Object.values(tempDataObj[year]).reduce((acc, balance) => acc + balance);
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
                             <BarChart ylabel='Incoming'
                                width={ this.state.width }
                                height={ 500 }
                                margin={ margin }
                                data={ this.state.incomingData }
                                onBarClick={ this.handleBarClick } />
                             <BarChart ylabel='Outgoing'
                                width={ this.state.width }
                                height={ 500 }
                                margin={ margin }
                                data={ this.state.outgoingData }
                                onBarClick={ this.handleBarClick } />
                    </div>
                }
                { this.state.saving > 0  && <Alert className="saving" color="success"><b>{ this.state.saving }</b> saving in the selected year!</Alert> }
            </div>            
        );
    }
}
 

export default YearlyStatistics;