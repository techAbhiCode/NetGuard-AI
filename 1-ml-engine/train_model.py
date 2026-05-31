import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

print("1. Loading Real UNSW-NB15 Raw Dataset...")
# Raw file mein total 49 columns hote hain, hum unke naam de rahe hain taaki error na aaye
columns = ['srcip', 'sport', 'dstip', 'dsport', 'proto', 'state', 'dur', 'sbytes', 'dbytes',
           'sttl', 'dttl', 'sloss', 'dloss', 'service', 'Sload', 'Dload', 'Spkts', 'Dpkts',
           'swin', 'dwin', 'stcpb', 'dtcpb', 'smeansz', 'dmeansz', 'trans_depth', 'res_bdy_len',
           'Sjit', 'Djit', 'Stime', 'Ltime', 'Sintpkt', 'Dintpkt', 'tcprtt', 'synack', 'ackdat',
           'is_sm_ips_ports', 'ct_state_ttl', 'ct_flw_http_mthd', 'is_ftp_login', 'ct_ftp_cmd',
           'ct_srv_src', 'ct_srv_dst', 'ct_dst_ltm', 'ct_src_ltm', 'ct_src_dport_ltm',
           'ct_dst_sport_ltm', 'ct_dst_src_ltm', 'attack_cat', 'Label']

try:
    # low_memory=False isliye taaki large file aasaani se read ho jaye
    df = pd.read_csv('dataset/UNSW_NB15.csv', header=None, names=columns, low_memory=False)
except FileNotFoundError:
    print("Error: 'UNSW_NB15.csv' file nahi mili! Check karo ki file same folder mein hai ya nahi.")
    exit()

print("2. Extracting core features...")
# Hum 49 mein se sirf apne kaam ke 4 columns nikalenge
data = df[['dur', 'sbytes', 'dbytes', 'Label']].copy()

# Column names ko hamare FastAPI aur Spring Boot model se match karna
data.rename(columns={'dur': 'duration', 'sbytes': 'src_bytes', 'dbytes': 'dst_bytes', 'Label': 'label'}, inplace=True)

# Data ko clean karna (Agar pehli row mein text headers aagaye hon toh unhe hatana)
data['label'] = pd.to_numeric(data['label'], errors='coerce')
data = data.dropna()
data['label'] = data['label'].astype(int)

X = data[['duration', 'src_bytes', 'dst_bytes']]
y = data['label']

print(f"3. Training AI Brain on {len(data)} actual network packets...")
# n_estimators=50 rakha hai taaki training jaldi ho aur RAM kam use ho
model = RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=-1)
model.fit(X, y)

print("4. Saving the Production Model...")
joblib.dump(model, 'nids_model.pkl')
print("Success! Asli AI model ready hai aur save ho gaya hai. 🚀")