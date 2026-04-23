import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

from backend.utils.preprocess import preprocess_data

# =========================
# LOAD DATASET (ROBUST PATH)
# =========================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
file_path = os.path.join(BASE_DIR, 'backend', 'data', 'fraud_data.csv')

print("Loading dataset from:", file_path)

df = pd.read_csv(file_path)

# =========================
# SAMPLE DATA (FASTER TRAINING)
# =========================
df = df.sample(300000, random_state=42)

print("Dataset loaded. Shape:", df.shape)

# =========================
# PREPROCESSING
# =========================
df = preprocess_data(df)

# =========================
# FEATURES & TARGET
# =========================
X = df.drop('isFraud', axis=1)
y = df['isFraud']

# =========================
# TRAIN TEST SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# =========================
# RANDOM FOREST MODEL
# =========================
print("\nTraining Random Forest...")

rf = RandomForestClassifier(
    n_estimators=100,
    class_weight='balanced',
    random_state=42,
    n_jobs=-1
)

rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)

# =========================
# XGBOOST MODEL
# =========================
print("Training XGBoost...")

scale_pos_weight = y.value_counts()[0] / y.value_counts()[1]

xgb = XGBClassifier(
    n_estimators=100,
    scale_pos_weight=scale_pos_weight,
    use_label_encoder=False,
    eval_metric='logloss',
    random_state=42
)

xgb.fit(X_train, y_train)
xgb_pred = xgb.predict(X_test)

# =========================
# EVALUATION FUNCTION
# =========================
def evaluate(name, y_true, y_pred):
    acc = round(accuracy_score(y_true, y_pred) * 100, 2)
    prec = round(precision_score(y_true, y_pred) * 100, 2)
    rec = round(recall_score(y_true, y_pred) * 100, 2)
    f1 = round(f1_score(y_true, y_pred) * 100, 2)

    print(f"\n{name} Performance:")
    print(f"Accuracy : {acc}%")
    print(f"Precision: {prec}%")
    print(f"Recall   : {rec}%")
    print(f"F1 Score : {f1}%")

    return f1


# =========================
# EVALUATE MODELS
# =========================
rf_f1 = evaluate("Random Forest", y_test, rf_pred)
xgb_f1 = evaluate("XGBoost", y_test, xgb_pred)

# =========================
# SAVE BEST MODEL
# =========================
model_save_path = os.path.join(os.path.dirname(__file__), 'model.pkl')

if xgb_f1 >= rf_f1:
    joblib.dump(xgb, model_save_path)
    print("\n✅ Best Model: XGBoost saved")
else:
    joblib.dump(rf, model_save_path)
    print("\n✅ Best Model: Random Forest saved")

print("Model path:", model_save_path)