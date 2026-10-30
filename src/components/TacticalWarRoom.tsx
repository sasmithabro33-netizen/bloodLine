import React, { useState } from 'react';
import { BERMUDA_LOCATIONS } from '../data/mockData';
import { MapLocation } from '../types/hud';
import { Users, Shield, Copy, Check, Sliders, MapPin, Play, Radio, Lock } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface TacticalWarRoomProps {
  onLaunchMatch: () => void;
}

export const TacticalWarRoom: React.FC<TacticalWarRoomProps> = ({ onLaunchMatch }) => {
  const [roomId, setRoomId] = useState('BR-SA-7709');
  const [roomPassword, setRoomPassword] = useState('7709');
  const [selectedMap, setSelectedMap] = useState('Bermuda 2.0');
  const [serverRegion, setServerRegion] = useState('South Asia (Colombo / 14ms)');
  const [copied, setCopied] = useState(false);

  // Drop strategy state
  const [primaryDrop, setPrimaryDrop] = useState<MapLocation>(BERMUDA_LOCATIONS[0]); // Clock Tower
  const [rotationTarget, setRotationTarget] = useState<MapLocation>(BERMUDA_LOCATIONS[1]); // Peak

  // 12 Squad Slots data
  const [squadSlots, setSquadSlots] = useState([
    { slot: 1, team: 'Bengal Tigers Esports', tag: 'BTE', ping: 19, ready: true },
    { slot: 2, team: 'Himalayan Wolves', tag: 'HW', ping: 24, ready: true },
    { slot: 3, team: 'Colombo Vipers', tag: 'CV', ping: 14, ready: true },
    { slot: 4, team: 'TEAM BLOODREIGN [HOST]', tag: 'BR', ping: 12, ready: true, locked: true },
    { slot: 5, team: 'Deccan Apex Squad', tag: 'DAS', ping: 22, ready: true },
    { slot: 6, team: 'Royal Lions Esports', tag: 'RLE', ping: 15, ready: true },
    { slot: 7, team: 'Rawalpindi Reapers', tag: 'RPR', ping: 28, ready: false },
    { slot: 8, team: 'Indo-Lanka Titans', tag: 'ILT', ping: 18, ready: true },
    { slot: 9, team: 'Delta Syndicate', tag: 'DS', ping: 21, ready: true },
    { slot: 10, team: 'Karachi Knights', tag: 'KK', ping: 26, ready: false },
    { slot: 11, team: 'Southern Storm', tag: 'SS', ping: 25, ready: true },
    { slot: 12, team: 'Maldives Marauders', tag: 'MM', ping: 31, ready: true },
  ]);

  const toggleSlotReady = (slotNum: number) => {
    playSound('click');
    setSquadSlots((prev) =>
      prev.map((s) => (s.slot === slotNum ? { ...s, ready: !s.ready } : s))
    );
  };

  const handleCopyCredentials = () => {
    navigator.clipboard.writeText(`ROOM ID: ${roomId} | PASSWORD: ${roomPassword} | MAP: ${selectedMap}`);
    setCopied(true);
    playSound('radio');
    setTimeout(() => setCopied(false), 2000);
  };

  const readyCount = squadSlots.filter((s) => s.ready).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner: Custom Scrim Room Host Console */}
      <div className="bg-[#131418] border border-[#1B1D24] p-6 relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF1E27] via-[#D4A359] to-transparent" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1B1D24] border border-[#FF1E27] flex items-center justify-center chamfer-both">
              <Users className="w-8 h-8 text-[#FF1E27]" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF1E27] uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5" />
                <span>OFFICIAL TOURNAMENT CUSTOM LOBBY</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-white uppercase tracking-tight mt-0.5">
                SCRIMS & WAR ROOM CONSOLE
              </h1>
              <p className="text-xs text-[#858B9A] font-mono mt-0.5">
                TIER-1 PRO SCRIM PRACTICE · SQUAD BATTLE ROYALE · 12 TEAMS
              </p>
            </div>
          </div>

          {/* Room Parameters & Credentials */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="px-3.5 py-2 bg-[#0A0A0C] border border-[#1B1D24]">
              <span className="text-[#858B9A] text-[10px] block">ROOM ID:</span>
              <span className="text-white font-bold">{roomId}</span>
            </div>

            <div className="px-3.5 py-2 bg-[#0A0A0C] border border-[#1B1D24]">
              <span className="text-[#858B9A] text-[10px] block">PASSWORD:</span>
              <span className="text-[#D4A359] font-bold">{roomPassword}</span>
            </div>

            <button
              onClick={handleCopyCredentials}
              className="px-3.5 py-2 bg-[#1B1D24] hover:bg-[#FF1E27] text-white border border-[#1B1D24] transition-colors flex items-center gap-1.5 uppercase font-bold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY CREDS'}</span>
            </button>

            <button
              onClick={() => {
                playSound('frag');
                onLaunchMatch();
              }}
              className="px-5 py-2 bg-[#FF1E27] text-white font-mono font-bold text-xs uppercase chamfer-tr hover:shadow-[0_0_20px_#FF1E27] transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>LAUNCH BATTLE ({readyCount}/12 READY)</span>
            </button>
          </div>
        </div>

        {/* Lobby Configuration Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#1B1D24] mt-6 font-mono text-xs">
          <div>
            <label className="text-[10px] text-[#858B9A] uppercase block mb-1">SELECT MAP:</label>
            <select
              value={selectedMap}
              onChange={(e) => {
                setSelectedMap(e.target.value);
                playSound('click');
              }}
              className="w-full bg-[#0A0A0C] border border-[#1B1D24] text-white px-3 py-2 focus:border-[#FF1E27] outline-none"
            >
              <option value="Bermuda 2.0">Bermuda 2.0 (Official Competitive)</option>
              <option value="Purgatory">Purgatory (High Elevation Tactical)</option>
              <option value="Kalahari">Kalahari (Desert Close-Quarter Combat)</option>
              <option value="Alpine">Alpine (Snow Biome Multi-tier)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-[#858B9A] uppercase block mb-1">SERVER REGION:</label>
            <select
              value={serverRegion}
              onChange={(e) => {
                setServerRegion(e.target.value);
                playSound('click');
              }}
              className="w-full bg-[#0A0A0C] border border-[#1B1D24] text-white px-3 py-2 focus:border-[#FF1E27] outline-none"
            >
              <option value="South Asia (Colombo / 14ms)">South Asia (Colombo / 14ms Ping)</option>
              <option value="Singapore (SG-1 / 18ms)">Singapore (SG-1 / 18ms Ping)</option>
              <option value="India Mumbai (IN-2 / 22ms)">India Mumbai (IN-2 / 22ms Ping)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-[#858B9A] uppercase block mb-1">MATCH PRESET:</label>
            <div className="px-3 py-2 bg-[#0A0A0C] border border-[#1B1D24] text-[#D4A359] font-bold flex items-center justify-between">
              <span>ESPORTS COMPETITIVE V5.2</span>
              <span className="text-[10px] text-[#858B9A]">NO REVIVE CARDS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 12 Squad Slots & Tactical Drop Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 12 Squad Slot Matrix (7 Columns) */}
        <div className="lg:col-span-7 bg-[#131418] border border-[#1B1D24] p-5 flex flex-col gap-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-[#1B1D24] text-xs">
            <span className="font-bold text-white uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#FF1E27]" />
              SQUAD SLOTS OCCUPANCY [12 SQUADS / 48 PLAYERS]
            </span>
            <span className="text-[10px] text-[#D4A359]">
              {readyCount} SQUADS READY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-1">
            {squadSlots.map((squad) => (
              <div
                key={squad.slot}
                onClick={() => !squad.locked && toggleSlotReady(squad.slot)}
                className={`p-3 border transition-all flex items-center justify-between ${
                  squad.locked
                    ? 'bg-[#7A0010]/30 border-[#FF1E27]'
                    : squad.ready
                    ? 'bg-[#0A0A0C] border-[#1B1D24] hover:border-emerald-600/50 cursor-pointer'
                    : 'bg-[#0A0A0C] border-[#1B1D24] opacity-60 hover:opacity-100 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                      squad.locked ? 'bg-[#FF1E27] text-white' : 'bg-[#1B1D24] text-[#858B9A]'
                    }`}
                  >
                    {squad.slot < 10 ? `0${squad.slot}` : squad.slot}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white text-xs truncate">
                        {squad.team}
                      </span>
                      {squad.locked && <Lock className="w-2.5 h-2.5 text-[#FF1E27] shrink-0" />}
                    </div>
                    <span className="text-[10px] text-[#858B9A]">
                      Ping: {squad.ping}ms · [{squad.tag}]
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 uppercase font-bold ${
                      squad.ready
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-zinc-900 text-[#858B9A] border border-zinc-800'
                    }`}
                  >
                    {squad.ready ? 'READY' : 'WAITING'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tactical Drop Route & Rotation Planner (5 Columns) */}
        <div className="lg:col-span-5 bg-[#131418] border border-[#1B1D24] p-5 flex flex-col gap-4 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-[#1B1D24] text-xs">
            <span className="font-bold text-white uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4A359]" />
              SQUAD 4 DROP & ROTATION PLAN
            </span>
            <span className="text-[10px] text-[#858B9A]">[COACH TACTICAL BOARD]</span>
          </div>

          {/* Primary Drop Location Selector */}
          <div className="flex flex-col gap-1.5 text-xs">
            <label className="text-[10px] text-[#858B9A] uppercase">PRIMARY PARACHUTE DROP ZONE:</label>
            <select
              value={primaryDrop.id}
              onChange={(e) => {
                const loc = BERMUDA_LOCATIONS.find((l) => l.id === e.target.value);
                if (loc) {
                  setPrimaryDrop(loc);
                  playSound('radio');
                }
              }}
              className="bg-[#0A0A0C] border border-[#1B1D24] text-white px-3 py-2 text-xs focus:border-[#FF1E27] outline-none font-bold"
            >
              {BERMUDA_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} · ({loc.elevation} / {loc.lootTier} Loot)
                </option>
              ))}
            </select>
          </div>

          {/* Secondary Rotation Waypoint Selector */}
          <div className="flex flex-col gap-1.5 text-xs">
            <label className="text-[10px] text-[#858B9A] uppercase">SECONDARY ROTATION TARGET (CIRCLE SHIFT):</label>
            <select
              value={rotationTarget.id}
              onChange={(e) => {
                const loc = BERMUDA_LOCATIONS.find((l) => l.id === e.target.value);
                if (loc) {
                  setRotationTarget(loc);
                  playSound('radio');
                }
              }}
              className="bg-[#0A0A0C] border border-[#1B1D24] text-[#D4A359] px-3 py-2 text-xs focus:border-[#D4A359] outline-none font-bold"
            >
              {BERMUDA_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} · ({loc.elevation})
                </option>
              ))}
            </select>
          </div>

          {/* Drop Tactical Evaluation Card */}
          <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24] flex flex-col gap-2 text-xs">
            <div className="text-[10px] text-[#D4A359] font-bold uppercase tracking-wider">
              ROTATION VIABILITY ANALYSIS:
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-[#131418] border border-[#1B1D24]">
                <div className="text-[9px] text-[#858B9A]">LOOT DENSITY</div>
                <div className="font-bold text-white">{primaryDrop.lootTier} TIER</div>
              </div>
              <div className="p-2 bg-[#131418] border border-[#1B1D24]">
                <div className="text-[9px] text-[#858B9A]">CONTESTED RISK</div>
                <div className="font-bold text-[#FF1E27]">{primaryDrop.dangerLevel}</div>
              </div>
            </div>

            <div className="text-[10px] text-[#858B9A] leading-relaxed pt-1">
              Initial drop at <strong className="text-white">{primaryDrop.name}</strong> allows fast SMG/Shotgun loot before securing the high-ground ridge at <strong className="text-[#D4A359]">{rotationTarget.name}</strong> to cut off enemy rotations from the shoreline.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
