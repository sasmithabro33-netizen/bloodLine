import React, { useState } from 'react';
import { TeamStanding } from '../types/hud';
import { Trophy, Flame, ChevronUp, ChevronDown, Minus, Crown, Award, Crosshair } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface LeaderboardScreenProps {
  standings: TeamStanding[];
  onAddKillToBloodreign: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  standings,
  onAddKillToBloodreign,
}) => {
  const [activeMatch, setActiveMatch] = useState<'all' | 'm1' | 'm2' | 'm3' | 'm4' | 'm5'>('all');
  const [selectedTeam, setSelectedTeam] = useState<TeamStanding | null>(standings[0]);

  const matches = [
    { id: 'all', label: 'Cumulative Grand Finals' },
    { id: 'm1', label: 'Match 1 · Bermuda' },
    { id: 'm2', label: 'Match 2 · Purgatory' },
    { id: 'm3', label: 'Match 3 · Kalahari' },
    { id: 'm4', label: 'Match 4 · Alpine' },
    { id: 'm5', label: 'Match 5 · Bermuda 2.0' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner: Championship Stakes & MVP Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Tournament Trophy Card */}
        <div className="lg:col-span-8 bg-[#131418] border border-[#1B1D24] p-6 relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4A359] via-[#FF1E27] to-transparent" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#1B1D24] border border-[#D4A359] flex items-center justify-center chamfer-both">
                <Trophy className="w-8 h-8 text-[#D4A359]" />
              </div>
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#D4A359] uppercase tracking-wider">
                  <span>FREE FIRE WORLD SERIES // SOUTH ASIA</span>
                  <span className="text-white font-bold">[GRAND FINALS]</span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-white uppercase tracking-tight mt-0.5">
                  CHAMPIONSHIP STANDINGS
                </h1>
                <p className="text-xs text-[#858B9A] font-mono mt-0.5">
                  12 TEAMS · 5 BATTLEGROUND ROUNDS · TOTAL PRIZE POOL $50,000 USD
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('headshot');
                onAddKillToBloodreign();
              }}
              className="px-4 py-2 bg-[#FF1E27] text-white font-mono text-xs font-bold uppercase chamfer-tr hover:shadow-[0_0_15px_#FF1E27] transition-all flex items-center gap-2 shrink-0"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Simulate Team Kill (+1 PT)</span>
            </button>
          </div>

          {/* Match Filter Segmented Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-[#1B1D24] mt-6 text-xs font-mono no-scrollbar">
            {matches.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  playSound('click');
                  setActiveMatch(m.id as typeof activeMatch);
                }}
                className={`px-3 py-1.5 uppercase whitespace-nowrap transition-colors ${
                  activeMatch === m.id
                    ? 'bg-[#D4A359] text-black font-bold'
                    : 'bg-[#0A0A0C] text-[#858B9A] hover:text-white border border-[#1B1D24]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* MVP Spotlight Card */}
        <div className="lg:col-span-4 bg-[#131418] border border-[#D4A359]/60 p-6 relative flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4A359]" />

          <div className="flex items-center justify-between pb-3 border-b border-[#1B1D24] font-mono text-xs">
            <span className="flex items-center gap-1.5 text-[#D4A359] font-bold">
              <Crown className="w-4 h-4" />
              [TOURNAMENT MVP]
            </span>
            <span className="text-[#858B9A]">MATCH 05 RATING</span>
          </div>

          <div className="py-4 flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="MVP"
              className="w-14 h-14 object-cover border border-[#D4A359]"
            />
            <div className="font-mono">
              <div className="text-lg font-bold text-white uppercase">BR // VIPER-9</div>
              <div className="text-xs text-[#D4A359]">ENTRY FRAGGER · BLOODREIGN</div>
              <div className="text-[11px] text-[#858B9A] mt-1">
                Kills: <span className="text-white font-bold">11</span> · Damage: <span className="text-white font-bold">2,490</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-[#0A0A0C] border border-[#1B1D24] text-[10px] font-mono text-[#858B9A] flex items-center justify-between">
            <span>BOOYAH MVP BONUS:</span>
            <span className="text-[#D4A359] font-bold">+500 PTS APEX RATING</span>
          </div>
        </div>
      </div>

      {/* Main Standings Table */}
      <div className="bg-[#131418] border border-[#1B1D24] overflow-hidden">
        <div className="p-4 bg-[#0A0A0C] border-b border-[#1B1D24] flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-white uppercase">OVERALL LEADERBOARD RANKINGS</span>
          <span className="text-[#858B9A]">POINT SYSTEM: 1 KILL = 1 PT · #1 PLACEMENT = 12 PTS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#1B1D24]/60 text-[#858B9A] border-b border-[#1B1D24] uppercase text-[11px]">
                <th className="py-3 px-4"># RANK</th>
                <th className="py-3 px-4">TEAM NAME</th>
                <th className="py-3 px-3 text-center">MATCHES</th>
                <th className="py-3 px-3 text-center">BOOYAH!</th>
                <th className="py-3 px-3 text-right">PLACEMENT</th>
                <th className="py-3 px-3 text-right">KILL PTS</th>
                <th className="py-3 px-4 text-right">TOTAL PTS</th>
                <th className="py-3 px-4 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1D24]">
              {standings.map((team) => {
                const isSelected = selectedTeam?.rank === team.rank;
                const isBloodreign = team.tag === 'BR';

                return (
                  <tr
                    key={team.rank}
                    onClick={() => {
                      playSound('click');
                      setSelectedTeam(team);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isBloodreign
                        ? 'bg-[#7A0010]/20 hover:bg-[#7A0010]/35'
                        : isSelected
                        ? 'bg-[#1C1B1D]'
                        : 'hover:bg-[#1C1B1D]/50'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {team.rank === 1 ? (
                          <span className="w-6 h-6 bg-[#D4A359] text-black font-bold flex items-center justify-center text-xs">
                            1
                          </span>
                        ) : team.rank <= 3 ? (
                          <span className="w-6 h-6 bg-[#1B1D24] text-white border border-[#D4A359] font-bold flex items-center justify-center text-xs">
                            {team.rank}
                          </span>
                        ) : (
                          <span className="w-6 h-6 bg-[#0A0A0C] text-[#858B9A] flex items-center justify-center text-xs">
                            {team.rank}
                          </span>
                        )}
                        {team.trend === 'up' && <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />}
                        {team.trend === 'down' && <ChevronDown className="w-3.5 h-3.5 text-red-500" />}
                        {team.trend === 'same' && <Minus className="w-3 h-3 text-[#858B9A]" />}
                      </div>
                    </td>

                    {/* Team Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          style={{ backgroundColor: team.logoColor }}
                          className="w-2.5 h-2.5 inline-block"
                        />
                        <span
                          className={`font-bold uppercase tracking-tight ${
                            isBloodreign ? 'text-[#FF1E27]' : 'text-white'
                          }`}
                        >
                          {team.teamName}
                        </span>
                        <span className="text-[10px] text-[#858B9A]">[{team.tag}]</span>
                      </div>
                    </td>

                    {/* Matches */}
                    <td className="py-3.5 px-3 text-center text-[#858B9A] tabular-nums">
                      {team.matchesPlayed}
                    </td>

                    {/* Booyahs */}
                    <td className="py-3.5 px-3 text-center">
                      {team.booyahs > 0 ? (
                        <span className="px-2 py-0.5 bg-[#D4A359]/20 text-[#D4A359] border border-[#D4A359]/40 font-bold">
                          {team.booyahs} 🏆
                        </span>
                      ) : (
                        <span className="text-[#858B9A]">-</span>
                      )}
                    </td>

                    {/* Placement Points */}
                    <td className="py-3.5 px-3 text-right text-white tabular-nums">
                      {team.placementPoints}
                    </td>

                    {/* Kill Points */}
                    <td className="py-3.5 px-3 text-right text-[#FF1E27] font-bold tabular-nums">
                      {team.killPoints}
                    </td>

                    {/* Total Points */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-base font-bold text-white tabular-nums">
                        {team.totalPoints}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`text-[10px] px-2 py-0.5 font-bold uppercase ${
                          team.status === 'QUALIFIED'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : team.status === 'CONTENDING'
                            ? 'bg-amber-950 text-[#D4A359] border border-amber-800'
                            : 'bg-zinc-900 text-[#858B9A] border border-zinc-800'
                        }`}
                      >
                        [{team.status}]
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Team Roster Drawer */}
      {selectedTeam && (
        <div className="p-4 bg-[#131418] border border-[#1B1D24] font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[#858B9A]">SELECTED SQUAD:</span>
            <span className="font-bold text-white uppercase">{selectedTeam.teamName}</span>
            <span className="text-[#D4A359] font-bold">[{selectedTeam.tag}]</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#858B9A] text-[11px]">ACTIVE LINEUP:</span>
            <div className="flex flex-wrap gap-1">
              {selectedTeam.players.map((p) => (
                <span key={p} className="px-2 py-0.5 bg-[#0A0A0C] border border-[#1B1D24] text-white text-[10px]">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
