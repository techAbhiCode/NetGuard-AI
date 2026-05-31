package com.netguard.backend.controller;

import com.netguard.backend.model.PredictionResponse;
import com.netguard.backend.model.TrafficFlow;
import com.netguard.backend.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/v1/network")
@CrossOrigin(origins = "*")
public class TrafficController {

    @Autowired
    private AIService aiService;

    private List<Map<String, Object>> trafficLogs = new ArrayList<>();
    private Set<String> blacklistedIps = new HashSet<>();

    @PostMapping("/analyze")
    public PredictionResponse analyzeAndLogTraffic(@RequestBody TrafficFlow flow) {
        
        // Agar IP already list mein hai, toh reject (Yeh fallback hai)
        if (blacklistedIps.contains(flow.src_ip())) {
            return new PredictionResponse("Blocked by System Firewall", 100.0);
        }

        // AI Se check karwao
        PredictionResponse response = aiService.analyzeTraffic(flow);
        
        // AGAR ATTACK HAI -> EXECUTE OS LEVEL BLOCK!
        if ("Attack".equals(response.status())) {
            blacklistedIps.add(flow.src_ip());
            blockIpAtOsLevel(flow.src_ip()); 
        }
        
        // Logs save 
        Map<String, Object> log = new HashMap<>();
        log.put("time", LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        log.put("bytes", flow.src_bytes());
        log.put("status", response.status());
        trafficLogs.add(log);
        if(trafficLogs.size() > 20) trafficLogs.remove(0);
        
        return response;
    }

    @GetMapping("/logs")
    public List<Map<String, Object>> getLiveLogs() { return trafficLogs; }

    @GetMapping("/blacklist")
    public Set<String> getBlacklistedIps() { return blacklistedIps; }

    @PostMapping("/unblock/{ip}")
    public String unblockIp(@PathVariable String ip) {
        blacklistedIps.remove(ip);
        unblockIpAtOsLevel(ip); // OS Firewall se bhi hatana padega
        return "IP " + ip + " Unblocked Successfully";
    }
    // For Checking if the IP is blocked or not (Optional)
    @GetMapping("/isBlocked/{ip}")
    public String isIpBlocked(@PathVariable String ip) {
        return blacklistedIps.contains(ip) ? "Blocked" : "Allowed";
    }

    //Actually the IP is Blocked or Not SO that Implemented This OS Level Ip Blocking Logic TO get the real time IP Blocking and Unblocking in Windows Firewall.
    // ==========================================================
    // 🛡️ THE HARDCORE OS-LEVEL FIREWALL LOGIC (WINDOWS) 🛡️  
    // ==========================================================
    
    private void blockIpAtOsLevel(String ip) {
        try {
            String ruleName = "NetGuard_Block_" + ip;
            // Yeh command Windows Defender Firewall mein naya rule banati hai
            String command = "netsh advfirewall firewall add rule name=\"" + ruleName + "\" dir=in action=block remoteip=" + ip;
            Runtime.getRuntime().exec(command);
            System.out.println("🚨 HARDWARE BLOCK EXECUTED FOR: " + ip);
        } catch (IOException e) {
            System.err.println("Failed to execute OS block command.");
            e.printStackTrace();
        }
    }

    private void unblockIpAtOsLevel(String ip) {
        try {
            String ruleName = "NetGuard_Block_" + ip;
            // Yeh command Windows Firewall se us rule ko delete karti hai
            String command = "netsh advfirewall firewall delete rule name=\"" + ruleName + "\"";
            Runtime.getRuntime().exec(command);
            System.out.println("✅ HARDWARE UNBLOCK EXECUTED FOR: " + ip);
        } catch (IOException e) {
            System.err.println("Failed to execute OS unblock command.");
            e.printStackTrace();
        }
    }
}