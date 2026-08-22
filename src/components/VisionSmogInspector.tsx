import React, { useState, useEffect } from 'react';
import { Eye, AlertTriangle, Video, Wind, Car, Sliders, CheckCircle2 } from 'lucide-react';

export const VisionSmogInspector: React.FC = () => {
  const [vehicleCount, setVehicleCount] = useState<number>(14);
  const [laplacianVariance, setLaplacianVariance] = useState<number>(142); // Sharpness (lower = hazier/more smog)
  const [hsvSaturation, setHsvSaturation] = useState<number>(68);

  // Compute Pollution Index (0 to 100)
  // Higher vehicles + lower sharpness (blur from smog) + lower saturation = higher pollution
  const computedPollutionIndex = Math.min(
    100,
    Math.max(
      10,
      Math.round(vehicleCount * 2.8 + (250 - laplacianVariance) * 0.22 + (100 - hsvSaturation) * 0.25)
    )
  );

  const isAlert = computedPollutionIndex > 70;

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-emerald-500/20 p-5 md:p-7 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <Eye className="w-3.5 h-3.5" />
            <span>Dual-Pipeline Computer Vision Fusion (YOLOv8 + Spatial Metrics)</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-white font-display">
            Perimeter Air Quality & Traffic Estimator
          </h4>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">RTSP FEED: SIMULATED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
        {/* Interactive Controls & Sensor Fusion Sliders */}
        <div className="lg:col-span-6 rounded-xl bg-slate-950/80 border border-slate-800 p-5">
          <span className="text-xs font-mono text-slate-300 font-semibold uppercase flex items-center gap-2 mb-4">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            Simulate Video Stream Inputs
          </span>

          <div className="space-y-4 text-xs font-mono">
            {/* 1. Vehicle Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-cyan-400" />
                  YOLOv8 Detected Vehicles (Traffic Density):
                </span>
                <span className="text-cyan-300 font-bold">{vehicleCount} vehicles</span>
              </div>
              <input
                id="slider-vehicle-count"
                type="range"
                min="0"
                max="30"
                value={vehicleCount}
                onChange={(e) => setVehicleCount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* 2. Laplacian Variance (Image Blur / Atmospheric Haze) */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-indigo-400" />
                  Laplacian Sharpness Variance (Atmospheric Smog):
                </span>
                <span className="text-indigo-300 font-bold">{laplacianVariance} var</span>
              </div>
              <input
                id="slider-laplacian-var"
                type="range"
                min="40"
                max="250"
                value={laplacianVariance}
                onChange={(e) => setLaplacianVariance(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Dense Smog / Blur (40)</span>
                <span>Clear Air (250)</span>
              </div>
            </div>

            {/* 3. HSV Saturation */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-slate-300">
                <span>HSV Color Saturation Metric:</span>
                <span className="text-emerald-300 font-bold">{hsvSaturation}%</span>
              </div>
              <input
                id="slider-hsv-sat"
                type="range"
                min="20"
                max="100"
                value={hsvSaturation}
                onChange={(e) => setHsvSaturation(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Real-Time Fused Pollution Index Gauge & Alert Status */}
        <div className="lg:col-span-6 rounded-xl bg-slate-950/80 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Computed Pollution Index (CPI)</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                  isAlert
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {isAlert ? (
                  <>
                    <AlertTriangle className="w-3 h-3" /> THRESHOLD ALERT TRIGGERED
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> NORMAL AIR QUALITY
                  </>
                )}
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className={`text-4xl font-bold font-mono ${isAlert ? 'text-rose-400' : 'text-emerald-400'}`}>
                {computedPollutionIndex}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100 Index Score</span>
            </div>

            {/* Gauge Progress Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden my-3">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isAlert
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                }`}
                style={{ width: `${computedPollutionIndex}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between text-slate-300 font-mono">
              <span>Traffic Component: <strong className="text-white">{(vehicleCount * 2.8).toFixed(1)}</strong></span>
              <span>Atmospheric Haze: <strong className="text-white">{((250 - laplacianVariance) * 0.22).toFixed(1)}</strong></span>
            </div>
            <p className="text-slate-500 text-[10px] pt-1 border-t border-slate-800">
              Zero physical sensors required — pure vision algorithmic fusion running on Flask/Streamlit service layer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
