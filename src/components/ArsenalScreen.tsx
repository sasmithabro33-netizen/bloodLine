import React, { useState } from 'react';
import { WEAPON_ARSENAL } from '../data/mockData';
import { WeaponData } from '../types/hud';
import { Crosshair, Shield, Zap, Sliders, ArrowRightLeft, Target, Flame } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

export const ArsenalScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [weaponA, setWeaponA] = useState<WeaponData>(WEAPON_ARSENAL[0]); // MP40
  const [weaponB, setWeaponB] = useState<WeaponData>(WEAPON_ARSENAL[1]); // M1887

  const categories = ['ALL', 'SMG', 'SHOTGUN', 'ASSAULT RIFLE', 'SNIPER', 'DMR'];

  const filteredWeapons =
    selectedCategory === 'ALL'
      ? WEAPON_ARSENAL
      : WEAPON_ARSENAL.filter((w) => w.category === selectedCategory);

  const metrics: { key: keyof WeaponData; label: string; max: number }[] = [
    { key: 'damage', label: 'BALLISTIC DAMAGE', max: 100 },
    { key: 'fireRate', label: 'RATE OF FIRE', max: 100 },
    { key: 'range', label: 'EFFECTIVE RANGE', max: 100 },
    { key: 'reloadSpeed', label: 'RELOAD VELOCITY', max: 100 },
    { key: 'accuracy', label: 'SPREAD ACCURACY', max: 100 },
    { key: 'armorPenetration', label: 'ARMOR PENETRATION', max: 100 },
    { key: 'movementSpeed', label: 'SPRINT AGILITY', max: 100 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Banner */}
      <div className="bg-[#131418] border border-[#1B1D24] p-6 relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF1E27] via-[#D4A359] to-transparent" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1B1D24] border border-[#FF1E27] flex items-center justify-center chamfer-both">
              <Crosshair className="w-8 h-8 text-[#FF1E27]" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#D4A359] uppercase tracking-wider">
                <span>FREE FIRE COMPETITIVE ARSENAL</span>
                <span className="text-white font-bold">[BALLISTIC LAB]</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-white uppercase tracking-tight mt-0.5">
                WEAPON TELEMETRY & COMPARATOR
              </h1>
              <p className="text-xs text-[#858B9A] font-mono mt-0.5">
                TIER-1 WEAPON RECOIL, DAMAGE MULTIPLIERS, & ATTACHMENT PROFILES
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSound('click');
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 uppercase transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#FF1E27] text-white font-bold'
                    : 'bg-[#0A0A0C] text-[#858B9A] hover:text-white border border-[#1B1D24]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Weapon List & Side-by-Side Dual Comparator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Weapon Catalog Cards (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-3 font-mono">
          <div className="flex items-center justify-between pb-1 text-xs text-[#858B9A]">
            <span>WEAPON ROSTER [{filteredWeapons.length}]</span>
            <span className="text-[10px] text-[#FF1E27]">CLICK TO SET COMPARATOR A/B</span>
          </div>

          <div className="flex flex-col gap-2 max-h-[560px] overflow-y-auto pr-1">
            {filteredWeapons.map((weapon) => {
              const isSelectedA = weaponA.id === weapon.id;
              const isSelectedB = weaponB.id === weapon.id;

              return (
                <div
                  key={weapon.id}
                  className={`p-3 bg-[#131418] border transition-all flex flex-col gap-2 ${
                    isSelectedA
                      ? 'border-[#FF1E27] bg-[#1C1B1D]'
                      : isSelectedB
                      ? 'border-[#D4A359] bg-[#1C1B1D]'
                      : 'border-[#1B1D24] hover:border-[#858B9A]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#858B9A] bg-[#0A0A0C] px-1.5 py-0.5 border border-[#1B1D24]">
                        {weapon.category}
                      </span>
                      <span className="font-bold text-sm text-white">{weapon.name}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 ${
                        weapon.tier === 'S+'
                          ? 'bg-[#FF1E27]/20 text-[#FF1E27] border border-[#FF1E27]/50'
                          : weapon.tier === 'S'
                          ? 'bg-[#D4A359]/20 text-[#D4A359] border border-[#D4A359]/50'
                          : 'bg-[#1B1D24] text-white'
                      }`}
                    >
                      TIER {weapon.tier}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#858B9A] line-clamp-1">
                    {weapon.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#1B1D24]/60 text-[10px]">
                    <div className="flex items-center gap-3">
                      <span>DMG: <strong className="text-white">{weapon.damage}</strong></span>
                      <span>ROF: <strong className="text-white">{weapon.fireRate}</strong></span>
                      <span>RNG: <strong className="text-white">{weapon.range}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          playSound('click');
                          setWeaponA(weapon);
                        }}
                        className={`px-2 py-0.5 uppercase font-bold ${
                          isSelectedA ? 'bg-[#FF1E27] text-white' : 'bg-[#0A0A0C] text-[#858B9A] border border-[#1B1D24]'
                        }`}
                      >
                        Set A
                      </button>
                      <button
                        onClick={() => {
                          playSound('click');
                          setWeaponB(weapon);
                        }}
                        className={`px-2 py-0.5 uppercase font-bold ${
                          isSelectedB ? 'bg-[#D4A359] text-black' : 'bg-[#0A0A0C] text-[#858B9A] border border-[#1B1D24]'
                        }`}
                      >
                        Set B
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: High-Precision Dual Head-to-Head Comparison (7 Columns) */}
        <div className="lg:col-span-7 bg-[#131418] border border-[#1B1D24] p-6 flex flex-col gap-6 font-mono">
          {/* Dual Weapon Comparison Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#1B1D24]">
            {/* Slot A */}
            <div className="flex-1 w-full p-3 bg-[#0A0A0C] border border-[#FF1E27]">
              <div className="text-[10px] text-[#FF1E27] font-bold uppercase">[SLOT A]</div>
              <div className="text-base font-bold text-white uppercase truncate">{weaponA.name}</div>
              <div className="text-xs text-[#858B9A]">{weaponA.category} · TIER {weaponA.tier}</div>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#1B1D24] border border-[#1B1D24] flex items-center justify-center shrink-0">
              <ArrowRightLeft className="w-4 h-4 text-[#858B9A]" />
            </div>

            {/* Slot B */}
            <div className="flex-1 w-full p-3 bg-[#0A0A0C] border border-[#D4A359]">
              <div className="text-[10px] text-[#D4A359] font-bold uppercase">[SLOT B]</div>
              <div className="text-base font-bold text-white uppercase truncate">{weaponB.name}</div>
              <div className="text-xs text-[#858B9A]">{weaponB.category} · TIER {weaponB.tier}</div>
            </div>
          </div>

          {/* Metric Comparison Bars */}
          <div className="flex flex-col gap-4 text-xs">
            {metrics.map((m) => {
              const valA = Number(weaponA[m.key]);
              const valB = Number(weaponB[m.key]);
              const isAWinner = valA > valB;
              const isBWinner = valB > valA;

              return (
                <div key={m.key} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span
                      className={`font-bold tabular-nums ${
                        isAWinner ? 'text-[#FF1E27]' : 'text-white'
                      }`}
                    >
                      {valA}
                    </span>
                    <span className="text-[#858B9A] uppercase tracking-wider text-[10px]">
                      {m.label}
                    </span>
                    <span
                      className={`font-bold tabular-nums ${
                        isBWinner ? 'text-[#D4A359]' : 'text-white'
                      }`}
                    >
                      {valB}
                    </span>
                  </div>

                  {/* Dual Opposing Progress Bars */}
                  <div className="grid grid-cols-2 gap-1 h-2 bg-[#0A0A0C] border border-[#1B1D24] p-[1px]">
                    {/* A Bar (Right to Left) */}
                    <div className="h-full flex justify-end">
                      <div
                        style={{ width: `${(valA / m.max) * 100}%` }}
                        className={`h-full ${
                          isAWinner ? 'bg-[#FF1E27]' : 'bg-[#FF1E27]/50'
                        }`}
                      />
                    </div>
                    {/* B Bar (Left to Right) */}
                    <div className="h-full flex justify-start">
                      <div
                        style={{ width: `${(valB / m.max) * 100}%` }}
                        className={`h-full ${
                          isBWinner ? 'bg-[#D4A359]' : 'bg-[#D4A359]/50'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tactical Ballistic Verdict */}
          <div className="p-4 bg-[#0A0A0C] border border-[#1B1D24] flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#D4A359] font-bold text-[11px] uppercase">
              <Target className="w-4 h-4 text-[#D4A359]" />
              <span>TOURNAMENT BALLISTIC VERDICT:</span>
            </div>
            <p className="text-[11px] text-[#858B9A] leading-relaxed">
              In close quarters inside buildings (Clock Tower / Pochinok), <strong className="text-white">{weaponA.name}</strong> delivers superior burst DPS with its {weaponA.fireRate} fire rate. At extended engagement distances (&gt; 35m), <strong className="text-[#D4A359]">{weaponB.name}</strong> holds better damage retention and armor penetration against Level 3 military vests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
