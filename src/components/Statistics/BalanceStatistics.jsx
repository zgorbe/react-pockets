import React, { useEffect, useState } from 'react';
import PocketService from '../../services/PocketService';
import { Line } from 'react-chartjs-2';

import { BACKGROUND_COLOR, BORDER_COLOR, OPTIONS } from './constants';


const getBalanceData = dataObj => {
    for (let year in dataObj) {
        for (let month in dataObj[year]) {
            dataObj[year][month] = dataObj[year][month].reduce((acc, action) => acc + action.amount * (action.direction === 'plus' ? 1 : -1), 0);
        }
    }
    console.log(dataObj);
    return { 
        datasets: [ 
            {
                label: ['Balance'],
                backgroundColor: BACKGROUND_COLOR,
                borderColor: BORDER_COLOR,
                data: [15, -10, 20],
            }
        ],
        labels: ['a', 'b', 'c'],
    };
}

const BalanceStatistics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        let dataObj;
        
        const load = async () => {
            dataObj = await PocketService.getStatisticsData();
            
            setData(getBalanceData(dataObj));
            setIsLoading(false);
        }
        
        load();
    }, []);

    return ( 
        <div className="col-12">
            { isLoading && <div className="loading mx-auto col-md-8"></div> }
            { !isLoading &&
                <div className="statistics">
                    <h2 className="text-center">Balance Statistics</h2>
                    
                        <div className="mt-5">
                            <Line 
                                data={ data } 
                                options={ OPTIONS }
                            />
                        </div>
                </div>
            }
        </div>            
    );
}

 

export default BalanceStatistics;