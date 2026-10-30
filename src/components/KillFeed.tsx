import React from 'react';
import { KillFeedEvent } from '../types/hud';
import { Skull, Target, Flame, Plus } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface KillFeedProps {
  events: KillFeedEvent[];
  onSimulateFrag: () => void;
  onSimulateHeadshot: () => void;
}

export const KillFeed: React.FC<KillFeedProps> = ({
  events,
  onSimulateFrag,
  onSimulateHeadshot,
}) => {
  return (
    <div className="bg-[#131418] border border-[#1B1D24] p-3 flex flex-col h-full">
      {/* Header with Frag Simulation Controls */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1B1D24]">
        <div className="flex items-center gap-2 font-mono text-xs">
          <Skull className="w-3.5 h-3.5 text-[#FF1E27]" />
          <span className="font-bold text-white uppercase tracking-wider">LIVE TOURNAMENT FEED</span>
        </div>

        {/* Quick Simulation Trigger Buttons */}
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <button
            onClick={() => {
              playSound('frag');
              onSimulateFrag();
            }}
            className="px-2 py-1 bg-[#1B1D24] hover:bg-[#FF1E27] text-white transition-colors uppercase flex items-center gap-1"
            title="Simulate Standard Elimination"
          >
            <Plus className="w-2.5 h-2.5" />
            <span>Frag</span>
          </button>
          <button
            onClick={() => {
              playSound('headshot');
              onSimulateHeadshot();
            }}
            className="px-2 py-1 bg-[#1B1D24] hover:bg-[#D4A359] hover:text-black text-[#D4A359] border border-[#D4A359]/40 transition-colors uppercase flex items-center gap-1 font-bold"
            title="Simulate Headshot Knock"
          >
            <Target className="w-2.5 h-2.5" />
            <span>HS</span>
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[280px] lg:max-h-[340px] pr-1">
        {events.map((evt) => {
          const isGold = evt.isHeadshot || evt.isSquadWipe;
          return (
            <div
              key={evt.id}
              style={{
                backgroundColor: 'rgba(10, 10, 12, 0.88)',
                borderLeft: `2px solid ${isGold ? '#D4A359' : '#FF1E27'}`,
              }}
              className="p-2 flex items-center justify-between text-xs font-mono transition-all hover:bg-[#1C1B1D]"
            >
              {/* Killer Info */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[10px] text-[#858B9A] tabular-nums">{evt.timestamp}</span>
                <span
                  className={`font-bold truncate max-w-[110px] ${
                    evt.isBloodreign ? 'text-[#FF1E27]' : 'text-white'
                  }`}
                >
                  {evt.killer}
                </span>
                <span className="text-[10px] text-[#858B9A] hidden sm:inline">[{evt.killerTeam}]</span>
              </div>

              {/* Weapon & Headshot / Wipe Indicator */}
              <div className="flex items-center gap-1 mx-2 shrink-0">
                {evt.isHeadshot && (
                  <span title="Headshot" className="flex items-center text-[#D4A359]">
                    <Target className="w-3 h-3 text-[#D4A359] mr-0.5 animate-pulse" />
                    <span className="text-[9px] font-bold">[HS]</span>
                  </span>
                )}
                <span className="text-[10px] font-bold text-white bg-[#1B1D24] px-1.5 py-0.5 border border-[#1B1D24]">
                  {evt.weapon}
                </span>
                {evt.isSquadWipe && (
                  <span className="text-[9px] text-[#FF1E27] font-bold bg-[#7A0010]/30 px-1 border border-[#FF1E27]/50 flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5" /> WIPE
                  </span>
                )}
              </div>

              {/* Victim Info */}
              <div className="text-right truncate max-w-[100px]">
                <span className="text-[#858B9A] line-through">{evt.victim}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
