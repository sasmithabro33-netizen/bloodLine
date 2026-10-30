import React, { useState } from 'react';
import { PlayerProfile } from '../types/hud';
import { Shield, Award, Crosshair, Target, Zap, Activity, Sliders, ChevronRight } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface RosterDossierProps {
  roster: PlayerProfile[];
}

export const RosterDossier: React.FC<RosterDossierProps> = ({ roster }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProfile>(roster[0]);
  const [hitboxZone, setHitboxZone] = useState<'head' | 'upper-torso' | 'limbs'>('head');

  const hitboxMultipliers = {
    head: { multiplier: '4.0x', damage: '240 HP (INSTANT KNOCK)', color: '#FF1E27', label: 'CRITICAL CRANIAL HITBOX' },
    'upper-torso': { multiplier: '1.0x', damage: '60 HP (BASE ARMOR DEDUCTION)', color: '#D4A359', label: 'THORAX & VEST COMPARTMENT' },
    limbs: { multiplier: '0.7x', damage: '42 HP (GRAZING EXPANSION)', color: '#858B9A', label: 'EXTREMITIES & LIMBS' },
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Roster Header Banner with Regional Pride & Lion Heritage */}
      <div className="bg-[#131418] border border-[#1B1D24] p-6 relative overflow-hidden">
        {/* Heritage Gold Laser Bevel */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4A359] via-[#FF1E27] to-transparent" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#7A0010] border border-[#D4A359] flex items-center justify-center chamfer-both">
              <Shield className="w-8 h-8 text-[#D4A359]" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#D4A359] tracking-widest uppercase">
                <span>SRI LANKA PREMIER DIVISION</span>
                <span aria-hidden="true">·</span>
                <span className="text-white font-bold">FFWS QUALIFIED</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-white tracking-tight uppercase">
                TEAM BLOODREIGN // APEX ROSTER
              </h1>
              <p className="text-xs text-[#858B9A] font-mono mt-0.5">
                SLOT #04 · HIGH-OCTANE RUSHER SQUADRON · REGIONAL CHAMPIONS 2025/2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-2 bg-[#0A0A0C] border border-[#1B1D24] flex flex-col">
              <span className="text-[#858B9A] text-[10px]">WIN RATE:</span>
              <span className="text-white font-bold text-sm">71.8%</span>
            </div>
            <div className="px-3 py-2 bg-[#0A0A0C] border border-[#1B1D24] flex flex-col">
              <span className="text-[#858B9A] text-[10px]">TOTAL TOURNAMENT FRAGS:</span>
              <span className="text-[#FF1E27] font-bold text-sm">1,482</span>
            </div>
            <div className="px-3 py-2 bg-[#0A0A0C] border border-[#1B1D24] flex flex-col">
              <span className="text-[#858B9A] text-[10px]">STATUS:</span>
              <span className="text-[#D4A359] font-bold text-sm">SEED 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Player Selection & Deep Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Player Selector Cards (4 Columns on Desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="font-mono text-xs uppercase text-[#858B9A] flex items-center justify-between pb-1">
            <span>ACTIVE SQUAD OPERATIVES [4]</span>
            <span className="text-[10px] text-[#FF1E27]">SELECT OPERATOR</span>
          </div>

          {roster.map((player) => {
            const isSelected = selectedPlayer.id === player.id;
            return (
              <div
                key={player.id}
                onClick={() => {
                  playSound('click');
                  setSelectedPlayer(player);
                }}
                className={`p-3.5 bg-[#131418] border transition-all cursor-pointer relative flex items-center gap-3 ${
                  isSelected
                    ? 'border-[#FF1E27] bg-[#1C1B1D] shadow-[0_0_16px_rgba(255,30,39,0.3)]'
                    : 'border-[#1B1D24] hover:border-[#858B9A]/40'
                }`}
              >
                {/* Asymmetric left accent line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                    isSelected ? 'bg-[#FF1E27]' : 'bg-[#1B1D24]'
                  }`}
                />

                <img
                  src={player.avatar}
                  alt={player.ign}
                  className="w-12 h-12 object-cover border border-[#1B1D24] shrink-0"
                />

                <div className="flex-1 min-w-0 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white truncate">{player.ign}</span>
                    <span className="text-[10px] text-[#D4A359] font-bold">[{player.role}]</span>
                  </div>
                  <div className="text-[11px] text-[#858B9A]">{player.name}</div>
                  <div className="flex items-center gap-2 mt-1 text-[10px]">
                    <span className="text-white font-bold">K/D: {player.kdRatio}</span>
                    <span className="text-[#858B9A]">·</span>
                    <span className="text-[#FF1E27] font-bold">HS: {player.headshotRate}%</span>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-[#FF1E27] translate-x-1' : 'text-[#858B9A]'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Operative Dossier (8 Columns on Desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Operative Bio & Combat Signature */}
          <div className="bg-[#131418] border border-[#1B1D24] p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF1E27] via-transparent to-transparent" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#1B1D24]">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF1E27] uppercase">
                  <span>OPERATIVE FILE #{selectedPlayer.id.toUpperCase()}</span>
                  <span className="text-[#858B9A]">/</span>
                  <span className="text-[#D4A359] font-bold">[{selectedPlayer.role}]</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight mt-1">
                  {selectedPlayer.ign}
                </h2>
                <p className="text-sm text-[#858B9A] font-body mt-1 max-w-xl">
                  {selectedPlayer.bio}
                </p>
              </div>

              <div className="px-4 py-3 bg-[#0A0A0C] border border-[#D4A359]/40 flex flex-col items-center shrink-0">
                <Award className="w-5 h-5 text-[#D4A359] mb-1" />
                <span className="text-[10px] font-mono text-[#858B9A]">SIGNATURE WEAPON</span>
                <span className="font-mono text-xs font-bold text-white uppercase">
                  {selectedPlayer.signatureWeapon}
                </span>
              </div>
            </div>

            {/* Tactical Combat KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-[#1B1D24] font-mono">
              <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24]">
                <div className="text-[10px] text-[#858B9A]">K/D RATIO</div>
                <div className="text-xl font-bold text-white tabular-nums mt-0.5">{selectedPlayer.kdRatio}</div>
                <div className="text-[9px] text-emerald-400">TOP 1% REGION</div>
              </div>

              <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24]">
                <div className="text-[10px] text-[#858B9A]">HEADSHOT RATE</div>
                <div className="text-xl font-bold text-[#FF1E27] tabular-nums mt-0.5">{selectedPlayer.headshotRate}%</div>
                <div className="text-[9px] text-[#858B9A]">LETHAL ACCURACY</div>
              </div>

              <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24]">
                <div className="text-[10px] text-[#858B9A]">WIN PROBABILITY</div>
                <div className="text-xl font-bold text-[#D4A359] tabular-nums mt-0.5">{selectedPlayer.winRate}%</div>
                <div className="text-[9px] text-[#858B9A]">FINAL CIRCLE DOMINANCE</div>
              </div>

              <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24]">
                <div className="text-[10px] text-[#858B9A]">TOURNAMENT MATCHES</div>
                <div className="text-xl font-bold text-white tabular-nums mt-0.5">{selectedPlayer.tournamentCaps}</div>
                <div className="text-[9px] text-[#858B9A]">PRO TIER MATCHES</div>
              </div>
            </div>

            {/* Split Section: Sensitivity Setup & Interactive Hitbox Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              {/* Sensitivity Configuration (4-Finger Claw Setup) */}
              <div className="flex flex-col gap-3 font-mono">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-[#1B1D24]">
                  <span className="flex items-center gap-1.5 font-bold text-white uppercase">
                    <Sliders className="w-3.5 h-3.5 text-[#FF1E27]" />
                    4-FINGER CLAW SENSITIVITY MATRIX
                  </span>
                  <span className="text-[10px] text-[#858B9A]">60FPS HUD</span>
                </div>

                <div className="flex flex-col gap-2.5 text-xs">
                  {Object.entries(selectedPlayer.sensitivities).map(([scope, val]) => (
                    <div key={scope} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#858B9A] uppercase tracking-wider">{scope}:</span>
                        <span className="text-white font-bold tabular-nums">{val} / 100</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#0A0A0C] border border-[#1B1D24]">
                        <div
                          style={{ width: `${val}%` }}
                          className="h-full bg-gradient-to-r from-[#FF1E27] to-[#D4A359]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Hitbox Damage Multiplier Visualizer */}
              <div className="flex flex-col gap-3 font-mono">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-[#1B1D24]">
                  <span className="flex items-center gap-1.5 font-bold text-white uppercase">
                    <Target className="w-3.5 h-3.5 text-[#D4A359]" />
                    BALLISTIC HITBOX CALCULATION
                  </span>
                  <span className="text-[10px] text-[#FF1E27]">CLICK ZONES</span>
                </div>

                {/* Hitbox Selector Tabs */}
                <div className="grid grid-cols-3 gap-1 text-[10px]">
                  <button
                    onClick={() => {
                      playSound('click');
                      setHitboxZone('head');
                    }}
                    className={`py-1.5 font-bold uppercase transition-colors ${
                      hitboxZone === 'head' ? 'bg-[#FF1E27] text-white' : 'bg-[#0A0A0C] text-[#858B9A] border border-[#1B1D24]'
                    }`}
                  >
                    Head (4.0x)
                  </button>
                  <button
                    onClick={() => {
                      playSound('click');
                      setHitboxZone('upper-torso');
                    }}
                    className={`py-1.5 font-bold uppercase transition-colors ${
                      hitboxZone === 'upper-torso' ? 'bg-[#D4A359] text-black' : 'bg-[#0A0A0C] text-[#858B9A] border border-[#1B1D24]'
                    }`}
                  >
                    Torso (1.0x)
                  </button>
                  <button
                    onClick={() => {
                      playSound('click');
                      setHitboxZone('limbs');
                    }}
                    className={`py-1.5 font-bold uppercase transition-colors ${
                      hitboxZone === 'limbs' ? 'bg-[#858B9A] text-black' : 'bg-[#0A0A0C] text-[#858B9A] border border-[#1B1D24]'
                    }`}
                  >
                    Limbs (0.7x)
                  </button>
                </div>

                {/* Hitbox Result Box */}
                <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24] flex flex-col gap-1.5">
                  <div className="text-[11px] font-bold text-white uppercase">
                    {hitboxMultipliers[hitboxZone].label}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-[#858B9A]">ESTIMATED DAMAGE:</span>
                    <span className="text-sm font-bold text-[#FF1E27] tabular-nums">
                      {hitboxMultipliers[hitboxZone].damage}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#858B9A] leading-relaxed pt-1 border-t border-[#1B1D24]/60">
                    Precision calibration tested against Free Fire Level 3 Vest with Armor Penetration chip applied.
                  </div>
                </div>

                {/* Achievements List */}
                <div className="pt-2">
                  <div className="text-[10px] text-[#858B9A] uppercase tracking-wider mb-1">PRO HONORS:</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedPlayer.achievements.map((ach) => (
                      <span
                        key={ach}
                        className="text-[10px] text-[#D4A359] bg-[#D4A359]/10 border border-[#D4A359]/30 px-2 py-0.5"
                      >
                        [{ach}]
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
