import React from 'react';
import { PlayerProfile, KillFeedEvent, TacticalMarker } from '../types/hud';
import { TacticalMap } from './TacticalMap';
import { KillFeed } from './KillFeed';
import { SquadVitals } from './SquadVitals';
import { Radio, Shield, Crosshair, Box, AlertTriangle, Play, Pause, RefreshCw, Flame, Heart } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface BroadcastHUDProps {
  roster: PlayerProfile[];
  killFeed: KillFeedEvent[];
  markers: TacticalMarker[];
  aliveCount: number;
  totalPlayers: number;
  activeSquads: number;
  matchTime: string;
  zoneCountdown: string;
  isSimulating: boolean;
  zoneRadius: number;
  onToggleSimulation: () => void;
  onSimulateFrag: () => void;
  onSimulateHeadshot: () => void;
  onAddMarker: (x: number, y: number, type: 'waypoint' | 'enemy' | 'airdrop') => void;
  onUpdatePlayerHp: (id: string, delta: number) => void;
  onDeployGlooWall: (id: string) => void;
  onPlayerFrag: (id: string) => void;
  onReloadWeapon: (id: string) => void;
  onCallAirdrop: () => void;
  onTriggerAirStrike: () => void;
  onHealAllSquad: () => void;
}

export const BroadcastHUD: React.FC<BroadcastHUDProps> = ({
  roster,
  killFeed,
  markers,
  aliveCount,
  totalPlayers,
  activeSquads,
  matchTime,
  zoneCountdown,
  isSimulating,
  zoneRadius,
  onToggleSimulation,
  onSimulateFrag,
  onSimulateHeadshot,
  onAddMarker,
  onUpdatePlayerHp,
  onDeployGlooWall,
  onPlayerFrag,
  onReloadWeapon,
  onCallAirdrop,
  onTriggerAirStrike,
  onHealAllSquad,
}) => {
  const totalKills = roster.reduce((acc, p) => acc + p.kills, 0);
  const totalDamage = roster.reduce((acc, p) => acc + p.damage, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Tactical Top Telemetry Status Bar */}
      <div className="bg-[#131418] border border-[#1B1D24] p-4 relative overflow-hidden">
        {/* Laser Bevel */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF1E27] via-[#FF1E27]/40 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-4 font-mono">
          {/* Left: Match Info & Simulation State */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF1E27] animate-pulse" />
              <span className="text-white font-bold text-sm uppercase">BERMUDA GRAND FINALS</span>
              <span className="text-[#858B9A] text-xs">[MATCH 05 / FINAL]</span>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onToggleSimulation();
              }}
              className={`px-3 py-1 text-xs uppercase font-bold flex items-center gap-1.5 transition-colors ${
                isSimulating
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                  : 'bg-[#1B1D24] text-[#858B9A] hover:text-white border border-[#1B1D24]'
              }`}
            >
              {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isSimulating ? 'SIMULATION ACTIVE' : 'PAUSED'}</span>
            </button>
          </div>

          {/* Center: Alive & Squad Telemetry */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0C] border border-[#1B1D24]">
              <span className="text-[#858B9A]">PLAYERS ALIVE:</span>
              <span className="text-white font-bold text-sm tabular-nums">
                <span className="text-[#FF1E27]">{aliveCount}</span> / {totalPlayers}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0C] border border-[#1B1D24]">
              <span className="text-[#858B9A]">SQUADS:</span>
              <span className="text-white font-bold text-sm tabular-nums">
                <span className="text-[#D4A359]">{activeSquads}</span> / 12
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0C] border border-[#1B1D24]">
              <span className="text-[#858B9A]">ZONE PHASE:</span>
              <span className="text-cyan-400 font-bold tabular-nums">
                PHASE 03 [{zoneCountdown}]
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0C] border border-[#1B1D24]">
              <span className="text-[#858B9A]">MATCH CLOCK:</span>
              <span className="text-white font-bold tabular-nums">{matchTime}</span>
            </div>
          </div>

          {/* Right: Bloodreign Squad Frags Counter */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-[#858B9A] uppercase">SQUAD 04 FRAGS</div>
              <div className="text-base font-bold text-[#FF1E27] tabular-nums">
                {totalKills} KILLS · {totalDamage} DMG
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tactical Grid: Satellite Radar (Left 7 Cols) + Live Kill Feed (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TacticalMap
            markers={markers}
            onAddMarker={onAddMarker}
            zoneRadius={zoneRadius}
          />
        </div>

        <div className="lg:col-span-5">
          <KillFeed
            events={killFeed}
            onSimulateFrag={onSimulateFrag}
            onSimulateHeadshot={onSimulateHeadshot}
          />
        </div>
      </div>

      {/* Tactical Quick Command Actions Strip */}
      <div className="p-3 bg-[#131418] border border-[#1B1D24] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#858B9A] uppercase text-[11px]">SQUAD DIRECTIVES:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              playSound('drop');
              onCallAirdrop();
            }}
            className="px-3 py-1.5 bg-[#0A0A0C] hover:bg-[#D4A359] hover:text-black text-[#D4A359] border border-[#D4A359]/40 transition-colors uppercase flex items-center gap-1.5 font-bold"
          >
            <Box className="w-3.5 h-3.5" />
            <span>Call Tactical Airdrop</span>
          </button>

          <button
            onClick={() => {
              playSound('alarm');
              onTriggerAirStrike();
            }}
            className="px-3 py-1.5 bg-[#0A0A0C] hover:bg-[#FF1E27] hover:text-white text-[#FF1E27] border border-[#FF1E27]/40 transition-colors uppercase flex items-center gap-1.5 font-bold"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Red Zone Airstrike Alarm</span>
          </button>

          <button
            onClick={() => {
              playSound('heal');
              onHealAllSquad();
            }}
            className="px-3 py-1.5 bg-[#0A0A0C] hover:bg-emerald-600 hover:text-white text-emerald-400 border border-emerald-500/40 transition-colors uppercase flex items-center gap-1.5 font-bold"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Squad Med-Station (+100 HP)</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Active Squad 4 Roster Vitals Cards */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between font-mono text-xs text-[#858B9A] uppercase px-1">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#FF1E27]" />
            <span className="text-white font-bold">SLOT 04 // TEAM BLOODREIGN SQUAD TELEMETRY</span>
          </div>
          <span className="text-[#D4A359]">[4 OPERATIVES DEPLOYED]</span>
        </div>

        <SquadVitals
          roster={roster}
          onUpdatePlayerHp={onUpdatePlayerHp}
          onDeployGlooWall={onDeployGlooWall}
          onPlayerFrag={onPlayerFrag}
          onReloadWeapon={onReloadWeapon}
        />
      </div>
    </div>
  );
};
