// Get context with jQuery - using jQuery's .get() method.
var ctx = document.getElementById('marketChart').getContext('2d');
var marketChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Arusha Town', 'Arusha Remote', 'Neighboring Regions', 'Across Borders'],
        datasets: [{
            label: 'Market Distribution',
            data: [58, 23, 10, 9],
            backgroundColor: [
                '#FF4C4C',
                '#4C9CFF',
                '#FFDC4C',
                '#4CFFB0'
            ],
            borderColor: [
                '#FF4C4C',
                '#4C9CFF',
                '#FFDC4C',
                '#4CFFB0'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        layout: {
            padding: {
                bottom: 40  // Adds 30 pixels of padding below the chart
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 50  // Adds padding between legend items and the chart
                },
                onClick: (e) => e.stopPropagation()  // Prevents default click behavior
            },
            datalabels: {
                color: '#fff',
                formatter: function(value, context) {
                    return context.chart.data.labels[context.dataIndex];
                }
            }
        }
    }
});