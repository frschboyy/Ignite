// Get context with jQuery - using jQuery's .get() method.
// Select the canvas element for the chart
var canvas = document.getElementById('marketChart');

// Dynamically set canvas width and height to fit the container
function resizeCanvas() {
    const container = document.querySelector('.chart-container'); // Assuming .chart-container wraps the chart
    canvas.width = container.offsetWidth; // Match container width
    canvas.height = container.offsetHeight; // Match container height
}

// Initial canvas resize
resizeCanvas();

// Create the chart
var ctx = canvas.getContext('2d');
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
        maintainAspectRatio: false, // Allows the chart to stretch to fit its container
        layout: {
            padding: {
                bottom: 40
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 50
                },
                onClick: (e) => e.stopPropagation()
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

// Handle window resize events to update the canvas size
window.addEventListener('resize', () => {
    resizeCanvas();
    marketChart.resize(); // Force the chart to resize after canvas adjustment
});