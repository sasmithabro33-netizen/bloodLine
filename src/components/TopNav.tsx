import React from 'react';
import { ScreenId } from '../types/hud';
import { Volume2, VolumeX, Shield, Radio } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface TopNavProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  aliveCount: number;
  totalPlayers: number;
  onTriggerBooyah: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScreen,
  onSelectScreen,
  isAudioOn,
  onToggleAudio,
  aliveCount,
  totalPlayers,
  onTriggerBooyah,
}) => {
  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'live-hud', label: 'Live HUD' },
    { id: 'roster', label: 'Roster Dossier' },
    { id: 'leaderboard', label: 'Championship' },
    { id: 'war-room', label: 'Tactical Room' },
    { id: 'arsenal', label: 'Armory' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#1B1D24] px-4 md:px-8 py-3.5">
      {/* Laser Bevel accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF1E27] via-[#FF1E27]/50 to-transparent" />

      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => {
            playSound('click');
            onSelectScreen('live-hud');
          }}
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
        >
          <div className="w-8 h-8 bg-[#FF1E27] flex items-center justify-center font-mono font-bold text-white text-xs chamfer-tr">
            <Shield className="w-4 h-4 fill-white text-transparent" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-white uppercase whitespace-nowrap">
              BLOODREIGN <span className="text-[#FF1E27]">//</span> HUD
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#858B9A] tracking-wider uppercase">
              <span className="text-[#D4A359] font-bold">SL-04 APEX</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#FF1E27]">
                <Radio className="w-2.5 h-2.5" />
                LIVE 60Hz
              </span>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono uppercase tracking-wider">
          {navItems.map((item, idx) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playSound('click');
                  onSelectScreen(item.id);
                }}
                className={`py-1 relative transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-[#858B9A] hover:text-white'
                }`}
              >
                <span className="text-[10px] text-[#FF1E27]/80">0{idx + 1}.</span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-3.5 left-0 right-0 h-[2px] bg-[#FF1E27] shadow-[0_0_8px_#FF1E27]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Telemetry Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Audio Switch */}
          <button
            onClick={() => {
              onToggleAudio();
              playSound('click');
            }}
            title={isAudioOn ? 'Mute tactical SFX' : 'Enable tactical SFX'}
            className="w-8 h-8 flex items-center justify-center bg-[#131418] border border-[#1B1D24] text-[#858B9A] hover:text-white hover:border-[#FF1E27] transition-all"
          >
            {isAudioOn ? <Volume2 className="w-3.5 h-3.5 text-[#D4A359]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Alive Telemetry Chip */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#131418] border border-[#1B1D24] font-mono text-xs">
            <span className="text-[#858B9A] text-[10px]">ALIVE:</span>
            <span className="font-bold text-[#FF1E27] tabular-nums">{aliveCount}</span>
            <span className="text-[#858B9A]">/</span>
            <span className="text-white tabular-nums">{totalPlayers}</span>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              playSound('booyah');
              onTriggerBooyah();
            }}
            className="px-4 py-2 bg-[#FF1E27] text-white font-mono font-bold text-xs tracking-wider uppercase chamfer-tr hover:shadow-[0_0_20px_rgba(255,30,39,0.6)] active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>DECLARE BOOYAH!</span>
          </button>
        </div>
      </div>

      {/* Mobile Subnav Strip */}
      <div className="md:hidden flex items-center gap-3 overflow-x-auto pt-2.5 mt-2 border-t border-[#1B1D24]/60 text-[11px] font-mono no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playSound('click');
              onSelectScreen(item.id);
            }}
            className={`px-2.5 py-1 whitespace-nowrap ${
              currentScreen === item.id
                ? 'bg-[#FF1E27] text-white font-bold'
                : 'bg-[#131418] text-[#858B9A] border border-[#1B1D24]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
