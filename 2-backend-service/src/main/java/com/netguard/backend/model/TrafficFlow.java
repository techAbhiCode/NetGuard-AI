package com.netguard.backend.model;

public record TrafficFlow(String src_ip, double duration, int src_bytes, int dst_bytes) {
}