import React, { Component } from 'react';
import PocketService from '../../services/PocketService';
import { Bar } from 'react-chartjs-2';

import { BACKGROUND_COLOR, BORDER_COLOR, OPTIONS } from './constants';

class Statistics extends Component {
    state = { 
        loading: true,
        data: { datasets: [], labels: [] },
    }

    constructor(props) {
        super(props);

        this.statistics = React.createRef();
    }

    async componentDidMount() {
        const dataObj = await PocketService.getStatisticsData();

        this.setState({
            loading: false,
            data: this.getStatistics(dataObj)
        });
    }
    
    getStatistics = dataObj => {
        let result = {};
        
        for (let year in dataObj) {
            for (let month in dataObj[year]) {
                dataObj[year][month] = dataObj[year][month].reduce((acc, action) => acc + action.amount * (action.direction === 'plus' ? 1 : -1), 0);
            }
            
            result[year] = {
                datasets: [{
                    label: year,
                    data: Object.values(dataObj[year]),
                    backgroundColor: BACKGROUND_COLOR,
                    borderColor: BORDER_COLOR,
                    borderWidth: 1,
                }],
                labels: Object.keys(dataObj[year]),
            };
        }
        return result;
    }

    render() { 
        return ( 
            <div className="col-12">
                { this.state.loading && <div className="loading mx-auto col-md-8"></div> }
                { !this.state.loading &&
                    <div className="statistics" ref={ this.statistics }>
                        <h2 className="text-center">Monthly Statistics</h2>
                        { Object.keys(this.state.data).sort().reverse().map(year => 
                            <div className="mt-5" key={ year }>
                                <Bar 
                                    data={ this.state.data[year] } 
                                    options={ OPTIONS }
                                />
                            </div>
                            )
                        }
                    </div>
                }
            </div>            
        );
    }
}
 

export default Statistics;