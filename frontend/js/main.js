async function analyze() {
    const btn = document.getElementById("btn");
    btn.innerText = "Analyzing...";
    btn.disabled = true;

    const data = {
        step: Number(document.getElementById("step").value),
        type: Number(document.getElementById("type").value),
        amount: Number(document.getElementById("amount").value),
        oldbalanceOrg: Number(document.getElementById("oldbalanceOrg").value),
        newbalanceOrig: Number(document.getElementById("newbalanceOrig").value),
        oldbalanceDest: Number(document.getElementById("oldbalanceDest").value),
        newbalanceDest: Number(document.getElementById("newbalanceDest").value)
    };

    try {
        const res = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        // RESULT
        document.getElementById("result").innerText = "Result: " + result.prediction;
        document.getElementById("conf").innerText = "Confidence: " + result.confidence + "%";
        document.getElementById("risk").innerText = "Risk Score: " + result.risk_score;

        document.getElementById("ai").innerText = result.explanation;

        // ALERT COLOR
        const alertBox = document.getElementById("alertBox");

if (result.prediction === "Fraud") {
    alertBox.innerHTML = "⚠️ Suspicious Transaction";

    alertBox.style.background = "linear-gradient(90deg, #7f1d1d, #991b1b)";
    alertBox.style.color = "#fca5a5"; // soft red text (premium look)
    alertBox.style.border = "1px solid rgba(239,68,68,0.2)";
    alertBox.style.boxShadow = "0 4px 20px rgba(127,29,29,0.5)";
} else {
    alertBox.innerHTML = "✔ Normal Transaction";

    alertBox.style.background = "linear-gradient(90deg, #14532d, #166534)";
    alertBox.style.color = "#bbf7d0";
    alertBox.style.border = "1px solid rgba(34,197,94,0.2)";
    alertBox.style.boxShadow = "0 4px 20px rgba(20,83,45,0.5)";
}

alertBox.style.padding = "12px 16px";
alertBox.style.borderRadius = "10px";
alertBox.style.marginTop = "12px";
alertBox.style.fontWeight = "500";
alertBox.style.letterSpacing = "0.3px";
alertBox.style.transition = "all 0.3s ease";

        // 🔥 UPDATE CHARTS WITH REAL DATA
        updateCharts(result);

        // 🔥 LOAD METRICS AGAIN
        loadMetrics();

    } catch (err) {
        alert("Backend connection error");
    }

    btn.innerText = "Analyze";
    btn.disabled = false;
}


async function loadMetrics(){
    const res = await fetch("http://127.0.0.1:5000/metrics");
    const m = await res.json();

    document.getElementById("acc").innerText = m.accuracy + "%";
    document.getElementById("prec").innerText = m.precision + "%";
    document.getElementById("rec").innerText = m.recall + "%";
    document.getElementById("f1").innerText = m.f1 + "%";
}

window.onload = () => {
    loadMetrics();
};