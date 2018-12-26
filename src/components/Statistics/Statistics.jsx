import React, { Component } from 'react';
import PocketService from '../../services/PocketService';
import BarChart from 'react-bar-chart';
import { Alert } from 'reactstrap';

const margin = { top: 20, right: 20, bottom: 30, left: 60 };

class Statistics extends Component {
    state = { 
        loading: true,
        data: [],
        width: 0,
        saving: 0
    }

    constructor(props) {
        super(props);

        this.statistics = React.createRef();

        PocketService.getStatisticsData().then(dataObj => {
            let data = this.getStatistics(dataObj);
            
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

    getStatistics = dataObj => {
        let result = {};
        
        for (let year in dataObj) {
            for (let month in dataObj[year]) {
                dataObj[year][month] = dataObj[year][month].reduce((acc, action) => acc + action.amount * (action.direction === 'plus' ? 1 : -1), 0);
            }

            result[year] = result[year] || [];
            
            for (let month in dataObj[year]) {
                result[year].push({
                    text: month,
                    value: dataObj[year][month] < 0 ? 0 : dataObj[year][month]
                });
            }
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
                        <h2 className="text-center">Monthly Statistics</h2>
                        { Object.keys(this.state.data).sort().reverse().map((year, index) => {
                            return <div key={ index }>
                                <h3>{ year }</h3>
                                <BarChart ylabel='Savings'
                                    width={ this.state.width }
                                    height={ 500 }
                                    margin={ margin }
                                    data={ this.state.data[year] }
                                    onBarClick={ this.handleBarClick } />
                            </div>
                            })
                        }
                    </div>
                }
                { this.state.saving > 0  && <Alert className="saving" color="success"><b>{ this.state.saving }</b> saving in the selected month!</Alert> }
            </div>            
        );
    }
}
 

export default Statistics;