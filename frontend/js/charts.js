/* UPDATED js/charts.js */

let chart1, chart2, chart3, chart4, chart5, chart6;

/* =========================
   INIT CHARTS
========================= */
function initCharts() {
    const ctx1 = document.getElementById("c1").getContext("2d");
    const ctx2 = document.getElementById("c2").getContext("2d");
    const ctx3 = document.getElementById("c3").getContext("2d");
    const ctx4 = document.getElementById("c4").getContext("2d");
    const ctx5 = document.getElementById("c5").getContext("2d");
    const ctx6 = document.getElementById("c6").getContext("2d");

    /* 1. Doughnut Chart (Normal vs Fraud) */
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
            plugins: {
                legend: {
                    labels: {
                        color: "#fff"
                    }
                }
            },
            cutout: "65%"
        }
    });

    /* 2. Transaction Amount Graph */
    chart2 = new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["Transaction Amount"],
            datasets: [{
                label: "Transaction Amount",
                data: [0],
                borderColor: "#4cc9f0",
                backgroundColor: "rgba(76,201,240,0.3)",
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#fff"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#aaa"
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#aaa"
                    }
                }
            }
        }
    });

    /* 3. Fraud Detection Bar Graph */
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
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#aaa"
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#aaa"
                    }
                }
            }
        }
    });

    /* 4. Confidence Graph */
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
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        color: "#aaa"
                    }
                },
                x: {
                    ticks: {
                        color: "#aaa"
                    }
                }
            }
        }
    });

    /* 5. 100 Transactions Profit/Loss */
chart5 = new Chart(ctx5, {
    type: "line",
    data: {
        labels: [
            "10", "20", "30", "40", "50",
            "60", "70", "80", "90", "100"
        ],
        datasets: [{
            label: "100 Transactions Profit / Loss",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: "#f39c12",
            backgroundColor: "rgba(243, 156, 18, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "#fff"
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#aaa"
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#aaa"
                }
            }
        }
    }
});

    /* 6. 1000 Transactions Profit/Loss */
chart6 = new Chart(ctx6, {
    type: "line",
    data: {
        labels: [
            "100", "200", "300", "400", "500",
            "600", "700", "800", "900", "1000"
        ],
        datasets: [{
            label: "1000 Transactions Profit / Loss",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: "#9b59b6",
            backgroundColor: "rgba(155, 89, 182, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "#fff"
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#aaa"
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#aaa"
                }
            }
        }
    }
});
}
/* =========================
   UPDATE CHARTS
========================= */
function updateCharts(result) {

    /* Doughnut + Fraud Bar */
    if (result.prediction === "Fraud") {
        chart1.data.datasets[0].data = [0, 1];
        chart3.data.datasets[0].data = [0, 1];
    } else {
        chart1.data.datasets[0].data = [1, 0];
        chart3.data.datasets[0].data = [1, 0];
    }

    /* Transaction Amount Graph */
    chart2.data.labels = ["Transaction Amount"];
    chart2.data.datasets[0].data = [
        Number(result.transaction_amount)
    ];

    /* Confidence Graph */
    chart4.data.datasets[0].data = [
        Number(result.confidence)
    ];
 /* Graph 5 + Graph 6 Profit / Loss Logic */
let amount = Number(result.transaction_amount);

/* 
Graph 5:
10 → 100 transactions
Example:
7000 → 70000 → 140000 → ... → 700000
*/
chart5.data.datasets[0].data = [
    amount * 10,
    amount * 20,
    amount * 30,
    amount * 40,
    amount * 50,
    amount * 60,
    amount * 70,
    amount * 80,
    amount * 90,
    amount * 100
];

/* 
Graph 6:
100 → 1000 transactions
Example:
7000 → 700000 → 1400000 → ... → 7000000
*/
chart6.data.datasets[0].data = [
    amount * 100,
    amount * 200,
    amount * 300,
    amount * 400,
    amount * 500,
    amount * 600,
    amount * 700,
    amount * 800,
    amount * 900,
    amount * 1000
];

    chart1.update();
    chart2.update();
    chart3.update();
    chart4.update();
    chart5.update();
    chart6.update();
}

window.onload = function () {
    initCharts();
};