import React from 'react';
import { PlayerProfile } from '../types/hud';
import { Shield, Heart, Zap, Crosshair, Radio, Mic, MicOff, Plus, Minus, Disc } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface SquadVitalsProps {
  roster: PlayerProfile[];
  onUpdatePlayerHp: (id: string, delta: number) => void;
  onDeployGlooWall: (id: string) => void;
  onPlayerFrag: (id: string) => void;
  onReloadWeapon: (id: string) => void;
}

export const SquadVitals: React.FC<SquadVitalsProps> = ({
  roster,
  onUpdatePlayerHp,
  onDeployGlooWall,
  onPlayerFrag,
  onReloadWeapon,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {roster.map((player) => {
        const hpPercent = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
        const epPercent = Math.max(0, Math.min(100, (player.ep / player.maxEp) * 100));
        const isCritical = player.hp <= 50;

        return (
          <div
            key={player.id}
            className={`bg-[#131418] border border-[#1B1D24] relative flex flex-col transition-all duration-200 ${
              isCritical ? 'border-[#FF1E27] shadow-[0_0_16px_rgba(255,30,39,0.35)]' : 'hover:border-[#1B1D24]'
            }`}
          >
            {/* Asymmetrical Crimson Accent Line down the left flank (3px width) */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                player.isAlive ? 'bg-[#FF1E27]' : 'bg-[#858B9A]'
              }`}
            />

            {/* Laser Bevel top highlight line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#FF1E27] via-[#FF1E27]/40 to-transparent" />

            {/* Card Header: IGN, Role, Ping & Region */}
            <div className="p-3 pl-4 bg-[#0E0E10] border-b border-[#1B1D24] flex items-center justify-between">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-xs text-white uppercase truncate">
                    {player.ign}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#D4A359] border border-[#D4A359]/30 px-1 bg-[#D4A359]/10">
                    [{player.role}]
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#858B9A] truncate">
                  {player.name} · {player.country}
                </span>
              </div>

              {/* Ping & Comms Indicator */}
              <div className="flex items-center gap-1.5 font-mono text-[10px] shrink-0">
                <span className="flex items-center gap-0.5 text-emerald-400">
                  <Radio className="w-2.5 h-2.5" />
                  {player.ping}ms
                </span>
                <span className="w-5 h-5 bg-[#1B1D24] flex items-center justify-center text-white">
                  <Mic className="w-3 h-3 text-[#D4A359]" />
                </span>
              </div>
            </div>

            {/* Core Bars: HP & EP Vitals */}
            <div className="p-3 pl-4 flex flex-col gap-2.5">
              {/* HP Bar */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-[#FF1E27] font-bold">
                    <Heart className="w-3 h-3 fill-[#FF1E27]" />
                    <span>HP:</span>
                  </span>
                  <span className="text-white font-bold tabular-nums">
                    {player.hp} <span className="text-[#858B9A] font-normal">/ {player.maxHp}</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-[#0A0A0C] border border-[#1B1D24] p-[1px]">
                  <div
                    style={{ width: `${hpPercent}%` }}
                    className={`h-full transition-all duration-300 ${
                      isCritical ? 'bg-red-600 animate-pulse' : 'bg-[#FF1E27]'
                    }`}
                  />
                </div>
              </div>

              {/* EP Bar */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-[#D4A359] font-bold">
                    <Zap className="w-3 h-3 fill-[#D4A359]" />
                    <span>EP:</span>
                  </span>
                  <span className="text-white font-bold tabular-nums">
                    {player.ep} <span className="text-[#858B9A] font-normal">/ {player.maxEp}</span>
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#0A0A0C] border border-[#1B1D24] p-[1px]">
                  <div
                    style={{ width: `${epPercent}%` }}
                    className="h-full bg-[#D4A359] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Armor & Helmet Slots */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                <div className="p-1.5 bg-[#0A0A0C] border border-[#1B1D24] flex items-center justify-between">
                  <span className="text-[#858B9A]">VEST LV3:</span>
                  <span className="text-white font-bold tabular-nums">{player.armorVest}%</span>
                </div>
                <div className="p-1.5 bg-[#0A0A0C] border border-[#1B1D24] flex items-center justify-between">
                  <span className="text-[#858B9A]">HELMET:</span>
                  <span className="text-white font-bold tabular-nums">{player.armorHelmet}%</span>
                </div>
              </div>

              {/* Active Weapon Telemetry & Ammo */}
              <div className="p-2 bg-[#0A0A0C] border border-[#1B1D24] flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-white truncate">{player.primaryWeapon.name}</span>
                  <button
                    onClick={() => {
                      playSound('click');
                      onReloadWeapon(player.id);
                    }}
                    className="text-[9px] text-[#D4A359] hover:underline flex items-center gap-1 uppercase"
                    title="Reload magazine"
                  >
                    <Disc className="w-2.5 h-2.5" />
                    Reload
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#858B9A] text-[10px]">AMMO:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-[#FF1E27] tabular-nums">
                      {player.primaryWeapon.ammo}
                    </span>
                    <span className="text-[#858B9A] text-[10px]">/ {player.primaryWeapon.reserve}</span>
                  </div>
                </div>
              </div>

              {/* Segmented Stats: Kills, Damage, Gloo Walls */}
              <div className="grid grid-cols-3 border border-[#1B1D24] divide-x divide-[#1B1D24] bg-[#0E0E10] font-mono text-center py-1.5">
                <div>
                  <div className="text-[9px] text-[#858B9A]">KILLS</div>
                  <div className="text-xs font-bold text-white tabular-nums">{player.kills}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[#858B9A]">DMG</div>
                  <div className="text-xs font-bold text-[#D4A359] tabular-nums">{player.damage}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[#858B9A]">GLOO</div>
                  <div className="text-xs font-bold text-cyan-400 tabular-nums">{player.glooWalls}</div>
                </div>
              </div>

              {/* Tactical Quick Action Controls */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 font-mono text-[10px]">
                <button
                  onClick={() => {
                    playSound('heal');
                    onUpdatePlayerHp(player.id, 50);
                  }}
                  className="px-2 py-1.5 bg-[#1B1D24] hover:bg-[#FF1E27] text-white transition-colors uppercase flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3 text-emerald-400" />
                  <span>Medkit (+50)</span>
                </button>
                <button
                  onClick={() => {
                    playSound('radio');
                    onDeployGlooWall(player.id);
                  }}
                  className="px-2 py-1.5 bg-[#1B1D24] hover:bg-cyan-600 hover:text-white text-cyan-400 border border-cyan-500/30 transition-colors uppercase flex items-center justify-center gap-1"
                >
                  <Shield className="w-3 h-3" />
                  <span>Deploy Gloo</span>
                </button>
                <button
                  onClick={() => {
                    playSound('alarm');
                    onUpdatePlayerHp(player.id, -35);
                  }}
                  className="px-2 py-1.5 bg-[#1B1D24] hover:bg-red-800 text-[#858B9A] hover:text-white transition-colors uppercase flex items-center justify-center gap-1"
                >
                  <Minus className="w-3 h-3 text-red-400" />
                  <span>Take Hit (-35)</span>
                </button>
                <button
                  onClick={() => {
                    playSound('headshot');
                    onPlayerFrag(player.id);
                  }}
                  className="px-2 py-1.5 bg-[#1B1D24] hover:bg-[#D4A359] hover:text-black text-[#D4A359] transition-colors uppercase flex items-center justify-center gap-1 font-bold"
                >
                  <Crosshair className="w-3 h-3" />
                  <span>+1 Knock</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
