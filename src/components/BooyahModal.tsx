import React from 'react';
import { Trophy, Shield, Crosshair, Award, X } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface BooyahModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalTeamKills: number;
}

export const BooyahModal: React.FC<BooyahModalProps> = ({
  isOpen,
  onClose,
  totalTeamKills,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#131418] border-2 border-[#D4A359] shadow-[0_0_50px_rgba(212,163,89,0.4)] p-6 md:p-8 flex flex-col items-center text-center font-mono overflow-hidden">
        {/* Top Gold & Crimson Laser Bevels */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF1E27] via-[#D4A359] to-[#FF1E27]" />
        
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 bg-[#1B1D24] hover:bg-[#FF1E27] text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Sri Lankan Heritage Lion Crest Trophy Icon */}
        <div className="w-20 h-20 bg-[#7A0010] border-2 border-[#D4A359] flex items-center justify-center chamfer-both mb-4 shadow-[0_0_25px_rgba(212,163,89,0.5)]">
          <Trophy className="w-10 h-10 text-[#D4A359]" />
        </div>

        {/* Booyah Typography Header */}
        <div className="text-xs text-[#D4A359] font-bold tracking-[0.3em] uppercase mb-1">
          [MATCH WINNER // FINAL CIRCLE DOMINANCE]
        </div>

        <h2 className="text-5xl sm:text-6xl font-display font-bold text-white tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,30,39,0.8)]">
          BOOYAH!
        </h2>

        <div className="text-sm sm:text-base font-bold text-[#FF1E27] uppercase tracking-widest mt-1">
          TEAM BLOODREIGN // APEX CHAMPIONS
        </div>

        <p className="text-xs text-[#858B9A] max-w-md mt-2 font-mono">
          BERMUDA GRAND FINALS ROUND 5 CONCLUDED. 48 OPERATIVES ENGAGED, ZERO SURVIVORS REMAINING OUTSIDE SLOT 04.
        </p>

        {/* Match Statistics Card */}
        <div className="grid grid-cols-3 gap-3 w-full my-6 font-mono text-center">
          <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24]">
            <div className="text-[10px] text-[#858B9A]">PLACEMENT</div>
            <div className="text-xl font-bold text-[#D4A359] mt-0.5">#1 RANK</div>
            <div className="text-[9px] text-[#858B9A]">+12 PLACEMENT PTS</div>
          </div>

          <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24]">
            <div className="text-[10px] text-[#858B9A]">TOTAL SQUAD FRAGS</div>
            <div className="text-xl font-bold text-[#FF1E27] mt-0.5 tabular-nums">
              {totalTeamKills} KILLS
            </div>
            <div className="text-[9px] text-[#858B9A]">+{totalTeamKills} KILL PTS</div>
          </div>

          <div className="p-3 bg-[#0A0A0C] border border-[#1B1D24]">
            <div className="text-[10px] text-[#858B9A]">MATCH TOTAL</div>
            <div className="text-xl font-bold text-white mt-0.5 tabular-nums">
              {12 + totalTeamKills} PTS
            </div>
            <div className="text-[9px] text-emerald-400">MAX RATING</div>
          </div>
        </div>

        {/* Operatives Roll Call */}
        <div className="w-full py-3 border-t border-[#1B1D24] flex items-center justify-center gap-4 text-xs font-mono text-[#858B9A]">
          <span>RAVANA [7]</span>
          <span>·</span>
          <span className="text-[#D4A359] font-bold">VIPER-9 [11 - MVP]</span>
          <span>·</span>
          <span>KASTANE-X [6]</span>
          <span>·</span>
          <span>NIRVANA [4]</span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="mt-4 px-8 py-3 bg-[#FF1E27] hover:bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-widest chamfer-tr shadow-[0_0_20px_rgba(255,30,39,0.6)] transition-all"
        >
          RETURN TO COMMAND HUD
        </button>
      </div>
    </div>
  );
};
