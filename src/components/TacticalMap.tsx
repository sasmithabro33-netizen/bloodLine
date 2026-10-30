import React, { useState } from 'react';
import { BERMUDA_LOCATIONS } from '../data/mockData';
import { TacticalMarker, MapLocation } from '../types/hud';
import { Crosshair, MapPin, Radio, Shield, Box, AlertTriangle, Layers } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface TacticalMapProps {
  markers: TacticalMarker[];
  onAddMarker: (x: number, y: number, type: 'waypoint' | 'enemy' | 'airdrop') => void;
  zoneRadius: number; // percentage radius of safe zone
  isExpanded?: boolean;
}

export const TacticalMap: React.FC<TacticalMapProps> = ({
  markers,
  onAddMarker,
  zoneRadius,
  isExpanded = false,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(BERMUDA_LOCATIONS[1]); // Default Peak
  const [activeLayer, setActiveLayer] = useState<'all' | 'danger' | 'loot'>('all');
  const [selectedTool, setSelectedTool] = useState<'waypoint' | 'enemy' | 'airdrop'>('waypoint');

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    playSound(selectedTool === 'enemy' ? 'alarm' : 'radio');
    onAddMarker(x, y, selectedTool);
  };

  return (
    <div className="bg-[#131418] border border-[#1B1D24] relative overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0A0A0C] border-b border-[#1B1D24] font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <Crosshair className="w-3.5 h-3.5 text-[#FF1E27]" />
          <span className="font-bold text-white uppercase tracking-wider">TACTICAL SATELLITE RADAR</span>
          <span className="text-[#858B9A] text-[10px]">[GRID: BERMUDA 2.0]</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[#D4A359] font-bold">LAT: 06°55'N</span>
          <span className="text-[#858B9A]">/</span>
          <span className="text-[#D4A359] font-bold">LON: 79°50'E</span>
        </div>
      </div>

      {/* Interactive Tool Selector Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#1B1D24]/60 border-b border-[#1B1D24] font-mono text-[10px]">
        <div className="flex items-center gap-1">
          <span className="text-[#858B9A] mr-1">PING TOOL:</span>
          <button
            onClick={() => {
              setSelectedTool('waypoint');
              playSound('click');
            }}
            className={`px-2 py-0.5 uppercase transition-colors ${
              selectedTool === 'waypoint' ? 'bg-[#FF1E27] text-white font-bold' : 'text-[#858B9A] hover:text-white'
            }`}
          >
            WayPoint
          </button>
          <button
            onClick={() => {
              setSelectedTool('enemy');
              playSound('click');
            }}
            className={`px-2 py-0.5 uppercase transition-colors ${
              selectedTool === 'enemy' ? 'bg-[#7A0010] text-[#FF1E27] border border-[#FF1E27] font-bold' : 'text-[#858B9A] hover:text-white'
            }`}
          >
            Enemy Ping
          </button>
          <button
            onClick={() => {
              setSelectedTool('airdrop');
              playSound('click');
            }}
            className={`px-2 py-0.5 uppercase transition-colors ${
              selectedTool === 'airdrop' ? 'bg-[#D4A359] text-black font-bold' : 'text-[#858B9A] hover:text-white'
            }`}
          >
            Airdrop Flare
          </button>
        </div>

        <div className="flex items-center gap-1">
          <Layers className="w-3 h-3 text-[#858B9A]" />
          <button
            onClick={() => {
              setActiveLayer(activeLayer === 'all' ? 'danger' : activeLayer === 'danger' ? 'loot' : 'all');
              playSound('click');
            }}
            className="text-[#D4A359] hover:underline uppercase"
          >
            Layer: {activeLayer}
          </button>
        </div>
      </div>

      {/* Main Map Canvas Display */}
      <div 
        onClick={handleMapClick}
        className={`relative w-full cursor-crosshair bg-[#0A0A0C] overflow-hidden select-none ${
          isExpanded ? 'h-[500px]' : 'h-[320px] lg:h-[380px]'
        }`}
      >
        {/* Tactical Coordinate Grid Overlay */}
        <div className="absolute inset-0 bg-tactical-grid opacity-60 pointer-events-none" />

        {/* Topographic Elevation Curves (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 stroke-[#858B9A]">
          <circle cx="50%" cy="48%" r="18%" fill="none" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50%" cy="48%" r="35%" fill="none" strokeWidth="0.5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="0.5" strokeDasharray="2 4" />
        </svg>

        {/* Dynamic Safe Zone Ring (White) */}
        <div
          style={{
            width: `${zoneRadius * 2}%`,
            height: `${zoneRadius * 2}%`,
            left: `${50 - zoneRadius}%`,
            top: `${48 - zoneRadius}%`,
          }}
          className="absolute rounded-full border-2 border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.4)] pointer-events-none transition-all duration-1000"
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white bg-black/70 px-1 border border-white/40">
            SAFE ZONE PHASE 3
          </div>
        </div>

        {/* Shrinking Danger Zone Ring (Electric Blue) */}
        <div
          style={{
            width: `${Math.min(zoneRadius * 2.8, 96)}%`,
            height: `${Math.min(zoneRadius * 2.8, 96)}%`,
            left: `${50 - Math.min(zoneRadius * 1.4, 48)}%`,
            top: `${48 - Math.min(zoneRadius * 1.4, 48)}%`,
          }}
          className="absolute rounded-full border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.25)] pointer-events-none transition-all duration-1000"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-400 uppercase tracking-widest">
            STORM PERIMETER
          </div>
        </div>

        {/* Rotating Radar Sweep Line */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[120%] h-[120%] animate-radar pointer-events-none">
            <div className="w-1/2 h-full bg-gradient-to-l from-[#FF1E27]/15 to-transparent origin-right" />
          </div>
        </div>

        {/* Bermuda Key Named Locations */}
        {BERMUDA_LOCATIONS.map((loc) => {
          if (activeLayer === 'danger' && loc.dangerLevel !== 'Extreme') return null;
          if (activeLayer === 'loot' && loc.lootTier !== 'High') return null;

          const isSelected = selectedLocation?.id === loc.id;
          return (
            <div
              key={loc.id}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLocation(loc);
                playSound('click');
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
            >
              <div
                className={`w-2.5 h-2.5 rotate-45 transition-all ${
                  isSelected
                    ? 'bg-[#FF1E27] scale-150 shadow-[0_0_10px_#FF1E27]'
                    : loc.dangerLevel === 'Extreme'
                    ? 'bg-[#FF1E27]/70 border border-[#FF1E27]'
                    : 'bg-[#858B9A]/60 border border-[#1B1D24]'
                }`}
              />
              <span
                className={`absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-mono font-bold tracking-tight px-1 ${
                  isSelected
                    ? 'bg-[#FF1E27] text-white shadow-sm'
                    : 'text-[#858B9A] group-hover:text-white bg-[#0A0A0C]/80'
                }`}
              >
                {loc.name}
              </span>
            </div>
          );
        })}

        {/* Dynamic Interactive Tactical Markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center"
          >
            {marker.type === 'bloodreign' && (
              <div className="flex flex-col items-center">
                <div className="w-3.5 h-3.5 bg-[#FF1E27] chamfer-tr flex items-center justify-center shadow-[0_0_12px_#FF1E27] animate-pulse">
                  <Shield className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[8px] font-mono font-bold text-white bg-black/80 px-1 mt-0.5">
                  {marker.label}
                </span>
              </div>
            )}

            {marker.type === 'enemy' && (
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-red-600 border border-white flex items-center justify-center animate-ping">
                  <Crosshair className="w-2 h-2 text-white" />
                </div>
                <span className="text-[8px] font-mono font-bold text-red-400 bg-black/90 px-1 border border-red-800">
                  {marker.label}
                </span>
              </div>
            )}

            {marker.type === 'airdrop' && (
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-[#D4A359] chamfer-chip flex items-center justify-center shadow-[0_0_12px_#D4A359]">
                  <Box className="w-2.5 h-2.5 text-black" />
                </div>
                <div className="h-6 w-[1px] bg-gradient-to-t from-[#D4A359] to-transparent animate-pulse" />
                <span className="text-[8px] font-mono font-bold text-[#D4A359] bg-black/90 px-1">
                  CRATE DROP
                </span>
              </div>
            )}

            {marker.type === 'waypoint' && (
              <div className="flex flex-col items-center">
                <MapPin className="w-4 h-4 text-[#FF1E27] drop-shadow-[0_0_6px_#FF1E27]" />
                <span className="text-[8px] font-mono text-white bg-black/90 px-1 border border-[#FF1E27]/60">
                  {marker.label}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Location Tactical Intel Footer */}
      {selectedLocation && (
        <div className="p-3 bg-[#0E0E10] border-t border-[#1B1D24] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white uppercase">{selectedLocation.name}</span>
            <span className="text-[#858B9A]">|</span>
            <span className="text-[11px] text-[#858B9A]">Loot: <span className="text-white font-bold">{selectedLocation.lootTier}</span></span>
            <span className="text-[#858B9A]">|</span>
            <span className="text-[11px] text-[#858B9A]">Danger: <span className="text-[#FF1E27] font-bold">{selectedLocation.dangerLevel}</span></span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-[#858B9A]">ELEVATION: {selectedLocation.elevation}</span>
            {selectedLocation.vehicleSpawn && (
              <span className="text-[#D4A359] border border-[#D4A359]/40 px-1 bg-[#D4A359]/10">
                [VEHICLE SPAWN ACTIVE]
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
