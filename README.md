 python app.py 
 python -m http.server 8000
 http://localhost:8000/index.html




# 🚀 AI FRAUD ANALYTICS SYSTEM — STEP-BY-STEP (COPY & RUN)

👉 Copy each step and run **one by one** (NOT mixed)

---

# ✅ STEP 1 — OPEN PROJECT FOLDER

Open CMD and run:

```bash
cd Desktop\ai-fraud-analytics-system
```

---

# ✅ STEP 2 — GO TO BACKEND

```bash
cd backend
```

---

# ✅ STEP 3 — INSTALL ALL LIBRARIES

```bash
python -m pip install pandas numpy scikit-learn xgboost joblib flask flask-cors
```

---

# ✅ STEP 4 — TRAIN MODEL

```bash
python model\train_model.py
```

✔ After this, file will be created:

```
backend/model/model.pkl
```

---

# ✅ STEP 5 — RUN BACKEND SERVER

```bash
python app.py
```

✔ You should see:

```
Running on http://127.0.0.1:5000
```

👉 DO NOT CLOSE THIS WINDOW

---

# ✅ STEP 6 — OPEN NEW CMD WINDOW

👉 Open another CMD (important)

---

# ✅ STEP 7 — GO TO FRONTEND

```bash
cd Desktop\ai-fraud-analytics-system\frontend
```

---

# ✅ STEP 8 — RUN FRONTEND SERVER

```bash
python -m http.server 8000
```

✔ You should see:

```
Serving HTTP on port 8000
```

---

# ✅ STEP 9 — OPEN PROJECT

Open browser and go to:

```
http://localhost:8000/index.html
```

---

# ✅ STEP 10 — TEST SYSTEM

Click:

```
Analyze
```

✔ You will see:

* Fraud / Normal
* Confidence %
* Risk Score
* Charts working

---

# ⚠️ IMPORTANT RULES

✔ Always run BOTH:

* Backend (Step 5)
* Frontend (Step 8)

✔ Do NOT close backend terminal

---

# 🚨 COMMON ERRORS + FIX

---

## ❌ Python not recognized

✔ Reinstall Python and enable PATH

---

## ❌ pip not working

```bash
python -m pip install pandas numpy scikit-learn xgboost joblib flask flask-cors
```

---

## ❌ model.pkl not found

Run again:

```bash
python model\train_model.py
```

---

## ❌ Port already in use

```bash
python -m http.server 9000
```

Open:

```
http://localhost:9000/index.html
```

---

# 🎯 FINAL RESULT

✔ Backend running
✔ Frontend running
✔ Model trained
✔ Full system working

---
