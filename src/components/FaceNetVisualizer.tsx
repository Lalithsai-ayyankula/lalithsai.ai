import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Server, Database, Activity, RefreshCw, Zap } from 'lucide-react';

interface AttendanceLog {
  id: string;
  studentId: string;
  name: string;
  distance: number;
  confidence: number;
  latencyMs: number;
  timestamp: string;
  status: 'VERIFIED' | 'REJECTED';
}

const SAMPLE_LOGS: AttendanceLog[] = [
  { id: "log-1", studentId: "STU-8492", name: "Ananya Sharma", distance: 0.38, confidence: 96.2, latencyMs: 84, timestamp: "09:00:12 AM", status: "VERIFIED" },
  { id: "log-2", studentId: "STU-2931", name: "Rahul Varma", distance: 0.44, confidence: 93.8, latencyMs: 92, timestamp: "09:00:19 AM", status: "VERIFIED" },
  { id: "log-3", studentId: "STU-5520", name: "Sai Krishna", distance: 0.32, confidence: 97.4, latencyMs: 78, timestamp: "09:00:24 AM", status: "VERIFIED" },
  { id: "log-4", studentId: "UNKNOWN", name: "Unregistered Subject", distance: 0.79, confidence: 42.1, latencyMs: 89, timestamp: "09:00:31 AM", status: "REJECTED" },
];

export const FaceNetVisualizer: React.FC = () => {
  const [logs, setLogs] = useState<AttendanceLog[]>(SAMPLE_LOGS);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeDistance, setActiveDistance] = useState<number>(0.36);

  const simulateVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const isMatch = Math.random() > 0.15;
      const distance = isMatch ? Number((0.28 + Math.random() * 0.25).toFixed(2)) : Number((0.68 + Math.random() * 0.25).toFixed(2));
      const confidence = Number((100 - distance * 60).toFixed(1));
      const latency = Math.floor(Math.random() * 40) + 75;

      const newLog: AttendanceLog = {
        id: `log-${Date.now()}`,
        studentId: isMatch ? `STU-${Math.floor(1000 + Math.random() * 9000)}` : "UNKNOWN",
        name: isMatch ? "Registered Student" : "Unverified Subject",
        distance,
        confidence,
        latencyMs: latency,
        timestamp: new Date().toLocaleTimeString(),
        status: isMatch ? 'VERIFIED' : 'REJECTED',
      };

      setActiveDistance(distance);
      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
      setIsVerifying(false);
    }, 600);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-cyan-500/20 p-5 md:p-7 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Server className="w-3.5 h-3.5" />
            <span>FastAPI Microservice & 128-D FaceNet Embedding Engine</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-white font-display">
            Biometric Attendance API & Verification Space
          </h4>
        </div>

        <button
          id="trigger-facenet-verify"
          onClick={simulateVerification}
          disabled={isVerifying}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Zap className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
          {isVerifying ? 'Verifying Embedding...' : 'Send Test Face Vector'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
        {/* Metric Space Inspector */}
        <div className="lg:col-span-5 rounded-xl bg-slate-950/80 border border-slate-800 p-4">
          <span className="text-xs font-mono text-slate-300 font-semibold uppercase flex items-center justify-between">
            <span>Euclidean Distance Metric</span>
            <span className="text-cyan-400 text-[11px]">Threshold: 0.60</span>
          </span>

          <div className="my-4 p-4 rounded-lg bg-slate-900/70 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Calculated Distance (d):</span>
              <span className={`font-bold ${activeDistance <= 0.6 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {activeDistance}
              </span>
            </div>

            {/* Range Track */}
            <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
              {/* Threshold Marker */}
              <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-rose-500 z-10" />
              {/* Distance indicator */}
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  activeDistance <= 0.6 ? 'bg-emerald-400' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, activeDistance * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="text-emerald-400">0.00 (Identical)</span>
              <span className="text-rose-400">0.60 (Match Threshold)</span>
              <span>1.00+</span>
            </div>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-900/50 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">DATASET ACCURACY</span>
              <strong className="text-white text-sm">94.0%</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">500+ Face Set</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900/50 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">MANUAL REDUCTION</span>
              <strong className="text-cyan-400 text-sm">~85%</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">Automated logging</span>
            </div>
          </div>
        </div>

        {/* Real-time MongoDB Attendance Stream */}
        <div className="lg:col-span-7 rounded-xl bg-slate-950/80 border border-slate-800 p-4">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono">
            <span className="text-slate-300 font-semibold flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              MongoDB Ingestion Log Stream (FastAPI Async)
            </span>
            <span className="text-slate-500 text-[10px]">Indexed by timestamp</span>
          </div>

          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs font-mono transition-all hover:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'VERIFIED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {log.status}
                  </span>
                  <div>
                    <span className="text-white font-semibold block">{log.name}</span>
                    <span className="text-[10px] text-slate-500">{log.studentId} • {log.timestamp}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-cyan-300 text-xs block font-bold">{log.latencyMs}ms</span>
                  <span className="text-[10px] text-slate-400">d={log.distance} ({log.confidence}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
