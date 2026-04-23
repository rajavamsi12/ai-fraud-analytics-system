let chart1, chart2, chart3, chart4;

function initCharts() {
    const ctx1 = document.getElementById("c1").getContext("2d");
    const ctx2 = document.getElementById("c2").getContext("2d");
    const ctx3 = document.getElementById("c3").getContext("2d");
    const ctx4 = document.getElementById("c4").getContext("2d");

    // Doughnut (Fraud vs Normal)
    chart1 = new Chart(ctx1, {
        type: "doughnut",
        data: {
            labels: ["Normal", "Fraud"],
            datasets: [{
                data: [1, 0],
                backgroundColor: ["#16c784", "#ff4d4d"],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            plugins: { legend: { labels: { color: "#fff" } } },
            cutout: "65%"
        }
    });

    // Line Chart (Transaction trend)
    chart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Transaction Amount",
                data: [],
                borderColor: "#4cc9f0",
                backgroundColor: "rgba(76,201,240,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 3
            }]
        },
        options: {
            plugins: { legend: { labels: { color: "#fff" } } },
            scales: {
                x: { ticks: { color: "#aaa" } },
                y: { ticks: { color: "#aaa" } }
            }
        }
    });

    // Bar Chart (Count)
    chart3 = new Chart(ctx3, {
        type: "bar",
        data: {
            labels: ["Normal", "Fraud"],
            datasets: [{
                data: [1, 0],
                backgroundColor: ["#16c784", "#ff4d4d"],
                borderRadius: 8
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: "#aaa" } },
                y: { ticks: { color: "#aaa" } }
            }
        }
    });

    // Confidence Chart
    chart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Confidence"],
            datasets: [{
                data: [0],
                backgroundColor: "#4cc9f0",
                borderRadius: 10
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: { color: "#aaa" }
                },
                x: { ticks: { color: "#aaa" } }
            }
        }
    });
}


function updateCharts(result) {

    // Doughnut + Bar sync
    if (result.prediction === "Fraud") {
        chart1.data.datasets[0].data = [0, 1];
        chart3.data.datasets[0].data = [0, 1];
    } else {
        chart1.data.datasets[0].data = [1, 0];
        chart3.data.datasets[0].data = [1, 0];
    }

    // Line trend update
    chart2.data.labels.push(chart2.data.labels.length);
    chart2.data.datasets[0].data.push(result.confidence * 1000);

    // Confidence
    chart4.data.datasets[0].data = [result.confidence];

    chart1.update();
    chart2.update();
    chart3.update();
    chart4.update();
}

window.onload = initCharts;