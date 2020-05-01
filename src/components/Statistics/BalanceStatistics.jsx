import React, { useEffect, useState } from 'react';
import PocketService from '../../services/PocketService';
import { Line } from 'react-chartjs-2';

import { BACKGROUND_COLOR, BORDER_COLOR, OPTIONS } from './constants';

const getDataForYear = (yearData, year) => { 
    return { 
        datasets: [ 
            {
                label: [year],
                backgroundColor: BACKGROUND_COLOR,
                borderColor: BORDER_COLOR,
                data: yearData.data,
            }
        ],
        labels: yearData.labels,
    };
};

const BalanceStatistics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const load = async () => {
            const dataObj = await PocketService.getBalanceData();

            setData(dataObj);
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
                        { Object.keys(data).sort().reverse().map(year => 
                            <div key={ year }>
                                <div className="mt-5">
                                    <Line 
                                        data={ getDataForYear(data[year], year) } 
                                        options={ OPTIONS }
                                    />
                                </div>
                            </div>
                        )}                    
                </div>
            }
        </div>            
    );
}

export default BalanceStatistics;