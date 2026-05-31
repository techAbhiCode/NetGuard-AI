from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="NetGuard AI API")
model = joblib.load('nids_model.pkl')

class NetworkFlow(BaseModel):
    duration: float
    src_bytes: int
    dst_bytes: int

@app.post("/predict")
def predict_traffic(flow: NetworkFlow):
    input_data = pd.DataFrame([flow.model_dump()])
    
    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0].max() * 100
    
    status = "Attack" if prediction == 1 else "Normal"
    
    return {
        "status": status,
        "confidence": round(probability, 2)
    }