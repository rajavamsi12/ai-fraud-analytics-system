import pandas as pd

def preprocess_data(df):
    # Drop useless columns if exist
    drop_cols = ['nameOrig', 'nameDest', 'isFlaggedFraud']
    df = df.drop(columns=[c for c in drop_cols if c in df.columns], errors='ignore')

    # Encode transaction type
    df['type'] = df['type'].astype('category').cat.codes

    # Ensure no missing values
    df = df.fillna(0)

    return df