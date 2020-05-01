export const BACKGROUND_COLOR = 'rgba(40, 80, 160, 0.1)';
export const BORDER_COLOR = 'rgba(20, 40, 80, 0.1)';

export const OPTIONS = {
    tooltips: {
        callbacks: {
            title: (tooltipItems, data) => `${data.datasets[0].label} ${data.labels[tooltipItems[0].index]}`,
            label: (tooltipItems, data) => data.datasets[0].data[tooltipItems.index].toLocaleString()
        }
    },
    scales: {
        yAxes: [{
            ticks: {
                callback: value => value.toLocaleString()
            }
        }]
    }
};