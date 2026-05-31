import requests
import time
import random

URL = "http://localhost:8080/api/v1/network/analyze"

print("Starting Nexus NIPS Live Simulator (Production Grade)...")

while True:
    is_attack = random.random() < 0.25 # 25% chance of attack
    
    if is_attack:
        # Asli DoS Attack Signature (Chote time mein bohot zyada source bytes, 0 destination bytes)
        flow_data = {
            "src_ip": "192.168.1.99",  # Attacker IP
            "duration": round(random.uniform(0.001, 0.05), 3),
            "src_bytes": random.randint(25000, 50000), 
            "dst_bytes": 0
        }
        print(f"[!] 🚨 EXECUTING ATTACK from {flow_data['src_ip']} (Payload: {flow_data['src_bytes']} bytes)")
    else:
        # Asli Normal Traffic (Employee browsing internet)
        flow_data = {
            "src_ip": f"192.168.1.{random.randint(10, 50)}",
            "duration": round(random.uniform(0.1, 1.5), 3),
            "src_bytes": random.randint(100, 800),
            "dst_bytes": random.randint(500, 3000)
        }
        print(f"[*] Normal Traffic from {flow_data['src_ip']}")

    try:
        response = requests.post(URL, json=flow_data)
        result = response.json()
        print(f"    -> System Action: {result['status']}\n")
    except Exception as e:
        print("    -> Connection Failed! Backend on nahi hai.\n")

    time.sleep(2.5) # Har 2.5 second mein packet bhejega