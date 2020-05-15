import React, { useEffect, useState } from 'react';
import PocketService from '../../services/PocketService';
import { Bar } from 'react-chartjs-2';

import { BACKGROUND_COLOR, BORDER_COLOR, OPTIONS } from './constants';

const getStatistics = (dataObj, label) => {
    const tempDataObj = {},
        labels = [],
        dataPoints = [];

    for (const year in dataObj) {
        for (const month in dataObj[year]) {
            tempDataObj[year] = tempDataObj[year] || {};
            tempDataObj[year][month] = tempDataObj[year][month] || [];
            tempDataObj[year][month] = dataObj[year][month].reduce((acc, action) => acc + action.amount * (action.direction === 'plus' ? 1 : -1), 0);
        }

        const yearBalance = Object.values(tempDataObj[year]).reduce((acc, balance) => acc + balance);

        labels.push(year);
        dataPoints.push(yearBalance);
    }

    return {
        datasets: [{
            label,
            data: dataPoints,
            backgroundColor: BACKGROUND_COLOR,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
        }],
        labels,
    }
};

const YearlyStatistics = () => {
    const initialState = { datasets: [], labels: [] };
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(initialState);
    const [incomingData, setIncomingData] = useState(initialState);
    const [outgoingData, setOutgoingData] = useState(initialState);

    useEffect(() => {
        const load = async () => {
            const dataObj = await PocketService.getStatisticsData();
            const data = getStatistics(dataObj, 'Savings'),
                incomingData = getStatistics(PocketService.filterIncomingOutgingData(dataObj, true), 'Incoming'),
                outgoingData = getStatistics(PocketService.filterIncomingOutgingData(dataObj, false), 'Outgoing');

            setIsLoading(false);
            setData(data);
            setIncomingData(incomingData);
            setOutgoingData(outgoingData);
        };

        load();
    }, []);

    return (
        <div className="col-12">
            { isLoading && <div className="loading mx-auto col-md-8"></div> }
            { !isLoading &&
                <div className="statistics">
                    <h2 className="text-center">Yearly Statistics</h2>
                    <Bar
                        data={ data }
                        options={ OPTIONS }
                    />
                    <Bar
                        data={ incomingData }
                        options={ OPTIONS }
                    />
                    <Bar
                        data={ outgoingData }
                        options={ OPTIONS }
                    />
                </div>
            }
        </div>
    );
}


export default YearlyStatistics;
