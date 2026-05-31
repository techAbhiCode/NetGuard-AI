package com.netguard.backend.service;

import com.netguard.backend.model.PredictionResponse;
import com.netguard.backend.model.TrafficFlow;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {
    private final String PYTHON_API_URL = "http://127.0.0.1:8000/predict";
    private final RestTemplate restTemplate = new RestTemplate();

    public PredictionResponse analyzeTraffic(TrafficFlow flow) {
        // Python ko sirf math numbers bhejenge, IP address nahi
        Map<String, Object> pythonData = new HashMap<>();
        pythonData.put("duration", flow.duration());
        pythonData.put("src_bytes", flow.src_bytes());
        pythonData.put("dst_bytes", flow.dst_bytes());

        return restTemplate.postForObject(PYTHON_API_URL, pythonData, PredictionResponse.class);
    }
}