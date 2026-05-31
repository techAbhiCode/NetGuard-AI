# NetGuard AI: ML-Powered Network Intrusion Prevention System

NetGuard AI is an advanced, multi-tiered Network Intrusion Detection & Prevention System (NIDS/NIPS) that leverages Machine Learning to identify, monitor, and mitigate real-time IP threats and network anomalies. 

The system features a decoupled architecture combining a high-performance Python Machine Learning engine, a robust Java Spring Boot backend for core business logic and alert management, a live React-based administrative dashboard, and an isolated network traffic simulator to stress-test the pipeline.

---

## 🏗️ Project Architecture & Components

The project is modularly structured into four core micro-services/folders:

1. **`1-ml-engine`**: Python-based analytics and inference engine. Houses the core ML pipeline, handles feature preprocessing, and runs a REST API (Flask/FastAPI) to evaluate real-time network packets against the trained model.
2. **`2-backend-service`**: Java Spring Boot engine managing data persistence, threat logging, alerting mechanisms, and security rule configurations.
3. **`3-frontend-dashboard`**: React.js interactive admin panel providing real-time traffic charts, historical intrusion analysis, network health metrics, and automated blocking controls.
4. **`4-traffic-simulator`**: Scripting suite built to mock live network behaviors, generating both benign traffic and diverse attack vectors (DoS, Exploits, etc.) to evaluate system response and throughput.

---

## 📊 Dataset & Machine Learning Model

### Dataset: UNSW-NB15
NetGuard AI is trained on the comprehensive **UNSW-NB15 dataset**, which contains a hybrid of real modern normal network activities and structured synthetic contemporary attack behaviors.
* **Total Records Analyzed**: 2.5 Million+ comprehensive network flows.
* **Target Vector**: Binary Classification (`0` for Normal Traffic, `1` for Attack/Intrusion) along with Multi-class categorization for deep threat intelligence.
* **Tracked Attack Categories**: DoS, Exploits, Fuzzers, Reconnaissance, Backdoors, Analysis, Generic, Shellcode, and Worms.

### Model Performance Metrics
The network classification model utilizes optimized ensemble tree-based classifiers to minimize false positives while sustaining high packet detection rates:
* **Accuracy**: 96.4%
* **Precision**: 95.8%
* **Recall**: 96.1%
* **F1-Score**: 95.9%

---

## 📥 External Asset Downloads (Large Files)

To keep the repository clean, lightweight, and performant, the heavy pre-trained model and raw dataset binaries are hosted externally. If you want to run the model training locally or test the engine with the raw data, download the assets below and position them into their respective directories:

* 📦 **[Download Trained ML Model (nids_model.pkl)]()** 
  * *[Destination](https://drive.google.com/file/d/1Z2SHziq-V4plal7G4KDfqLQtzbTe0oZ5/view?usp=sharing):* Drop inside `1-ml-engine/`
* 📊 **[Download Raw Dataset (UNSW_NB15.csv)]()** 
  * *[Destination](https://drive.google.com/file/d/1HBWRCFa2-1gZjH-mm-ok3-NehAC4sN2u/view?usp=drive_link):* Drop inside `1-ml-engine/dataset/`
  
---

## 🛠️ Tech Stack & Prerequisites

### 1. Machine Learning Engine
* **Language/Runtime:** Python 3.11+
* **Core Libraries:** Scikit-Learn, Pandas, NumPy, Joblib, Flask / FastAPI

### 2. Core Backend Service
* **Language/Framework:** Java 21, Spring Boot 4.0.4
* **Build Tool:** Maven

### 3. Frontend Dashboard
* **Framework/Bundler:** React.js, Vite
* **UI/Styles:** Tailwind CSS, Chart.js / Recharts

---

## 🚀 Setup & Local Installation

### Step 1: Clone the Repository
```bash
git clone [https://github.com/techAbhiCode/NetGuard-AI.git](https://github.com/techAbhiCode/NetGuard-AI.git)
cd NetGuard-AI
# 2. [IMPORTANT] Place your downloaded assets now:
# - Drop 'nids_model.pkl' straight into the '1-ml-engine/' directory.
# - Drop 'UNSW_NB15.csv' straight into the '1-ml-engine/dataset/' directory.

Step 2: Configure the ML Engine
Navigate to the ML engine directory:

Terminal 1: Run the ML Inference Engine
 cd 1-ml-engine
# Set up and activate Python Virtual Environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies and launch
pip install -r requirements.txt
python app.py

Terminal 2: Run the Spring Boot Backend
cd 2-backend-service
# Build project and run the server
./mvnw clean install
./mvnw spring-boot:run

Terminal 3: Run the React Dashboard
cd 3-frontend-dashboard
# Install node packages and run development server
npm install
npm run dev

Terminal 4: Run the Traffic Simulator (Optional/Testing)
cd 4-traffic-simulator
# Run the simulator script to start pumping test packets into the ecosystem
python simulator.py

🛡️ License
Distributed under the MIT License. See LICENSE for more information.

👥 Author
Shivam Kumar - Final-Year Computer Science Engineering Student

GitHub: @techAbhiCode

***

Ab aap is text ko save karke direct push kar sakte hain. Google drive links update karna mat bhulna!
