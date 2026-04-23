function loadHistory(){
    let data = JSON.parse(localStorage.getItem("history")) || [];
    let tbody = document.querySelector("#historyTable tbody");

    tbody.innerHTML = "";

    data.forEach(row=>{
        tbody.innerHTML += `
        <tr>
        <td>${row.time}</td>
        <td>${row.amount}</td>
        <td>${row.type}</td>
        <td>${row.result}</td>
        <td>${row.confidence}%</td>
        </tr>
        `;
    });
}

function downloadCSV(){
    let data = JSON.parse(localStorage.getItem("history")) || [];
    let csv = "Time,Amount,Type,Result,Confidence\n";

    data.forEach(r=>{
        csv += `${r.time},${r.amount},${r.type},${r.result},${r.confidence}\n`;
    });

    let blob = new Blob([csv]);
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "history.csv";
    a.click();
}

loadHistory();