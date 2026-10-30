/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, TacticalMarker, KillFeedEvent } from './types/hud';
import { INITIAL_ROSTER, INITIAL_KILLFEED, TOURNAMENT_STANDINGS } from './data/mockData';
import { TopNav } from './components/TopNav';
import { BroadcastHUD } from './components/BroadcastHUD';
import { RosterDossier } from './components/RosterDossier';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { TacticalWarRoom } from './components/TacticalWarRoom';
import { ArsenalScreen } from './components/ArsenalScreen';
import { BooyahModal } from './components/BooyahModal';
import { playSound, setSoundEnabled, isSoundEnabled } from './utils/soundEffects';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('live-hud');
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
  const [roster, setRoster] = useState(INITIAL_ROSTER);
  const [killFeed, setKillFeed] = useState<KillFeedEvent[]>(INITIAL_KILLFEED);
  const [standings, setStandings] = useState(TOURNAMENT_STANDINGS);
  const [isBooyahOpen, setIsBooyahOpen] = useState(false);

  // Match Simulation States
  const [aliveCount, setAliveCount] = useState(34);
  const [totalPlayers] = useState(48);
  const [activeSquads, setActiveSquads] = useState(9);
  const [matchSeconds, setMatchSeconds] = useState(892); // 14:52
  const [zoneCountdownSeconds, setZoneCountdownSeconds] = useState(84); // 01:24
  const [isSimulating, setIsSimulating] = useState(true);
  const [zoneRadius, setZoneRadius] = useState(38); // 38%

  // Tactical Radar Markers
  const [markers, setMarkers] = useState<TacticalMarker[]>([
    { id: 'm-br1', x: 48, y: 46, type: 'bloodreign', label: 'RAVANA & VIPER' },
    { id: 'm-br2', x: 52, y: 50, type: 'bloodreign', label: 'KASTANE-X' },
    { id: 'm-e1', x: 30, y: 52, type: 'enemy', label: 'BTE SNIPER SIGHTED' },
    { id: 'm-e2', x: 62, y: 64, type: 'enemy', label: 'CV FLANK' },
    { id: 'm-ad1', x: 45, y: 62, type: 'airdrop', label: 'AIRDROP 03' },
  ]);

  // Audio Toggle
  const handleToggleAudio = () => {
    const next = !isAudioOn;
    setIsAudioOn(next);
    setSoundEnabled(next);
  };

  // Automated Simulation Loop
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setMatchSeconds((prev) => prev + 1);
      setZoneCountdownSeconds((prev) => {
        if (prev <= 1) {
          // Zone shrink alert
          playSound('alarm');
          setZoneRadius((r) => Math.max(18, r - 4));
          return 120;
        }
        return prev - 1;
      });

      // Random combat events every ~8 seconds
      if (Math.random() < 0.25 && aliveCount > 4) {
        setAliveCount((prev) => Math.max(4, prev - 1));
        if (Math.random() < 0.3) {
          setActiveSquads((s) => Math.max(2, s - 1));
        }

        // Add automated killfeed event
        const weapons = ['MP40 COBRA', 'AWM', 'M1887', 'WOODPECKER', 'M4A1-GEN3', 'GROZA'];
        const enemies = ['SHADOW-7', 'CYCLONE', 'YETI-X', 'AVALANCHE', 'COBRA', 'VENOM-99', 'TITAN', 'SIMHA', 'HAWK-EYE'];
        const killerIsBloodreign = Math.random() < 0.55;

        const killer = killerIsBloodreign
          ? roster[Math.floor(Math.random() * roster.length)].ign
          : enemies[Math.floor(Math.random() * enemies.length)];

        const victim = enemies[Math.floor(Math.random() * enemies.length)];
        const isHeadshot = Math.random() < 0.45;
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];

        const newEvent: KillFeedEvent = {
          id: `kf-${Date.now()}`,
          timestamp: formatTime(matchSeconds),
          killer,
          killerTeam: killerIsBloodreign ? 'BLOODREIGN' : 'RIVAL',
          victim,
          victimTeam: 'OPPONENT',
          weapon,
          isHeadshot,
          isBloodreign: killerIsBloodreign,
        };

        setKillFeed((prev) => [newEvent, ...prev.slice(0, 14)]);
        playSound(isHeadshot ? 'headshot' : 'frag');

        if (killerIsBloodreign) {
          // Increment roster player stats
          setRoster((prev) =>
            prev.map((p) =>
              p.ign === killer ? { ...p, kills: p.kills + 1, damage: p.damage + 180 } : p
            )
          );
          // Increment tournament leaderboard
          setStandings((prev) =>
            prev.map((t) =>
              t.tag === 'BR'
                ? { ...t, killPoints: t.killPoints + 1, totalPoints: t.totalPoints + 1 }
                : t
            )
          );
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isSimulating, aliveCount, matchSeconds, roster]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  // User Actions
  const handleSimulateFrag = () => {
    const newEvent: KillFeedEvent = {
      id: `kf-${Date.now()}`,
      timestamp: formatTime(matchSeconds),
      killer: 'BR // VIPER-9',
      killerTeam: 'BLOODREIGN',
      victim: 'DELTA-1',
      victimTeam: 'DELTA SYNDICATE',
      weapon: 'MP40 COBRA',
      isHeadshot: false,
      isBloodreign: true,
    };
    setKillFeed((prev) => [newEvent, ...prev.slice(0, 14)]);
    setAliveCount((prev) => Math.max(4, prev - 1));
    setRoster((prev) =>
      prev.map((p) => (p.ign.includes('VIPER-9') ? { ...p, kills: p.kills + 1, damage: p.damage + 195 } : p))
    );
    setStandings((prev) =>
      prev.map((t) => (t.tag === 'BR' ? { ...t, killPoints: t.killPoints + 1, totalPoints: t.totalPoints + 1 } : t))
    );
  };

  const handleSimulateHeadshot = () => {
    const newEvent: KillFeedEvent = {
      id: `kf-${Date.now()}`,
      timestamp: formatTime(matchSeconds),
      killer: 'BR // KASTANE-X',
      killerTeam: 'BLOODREIGN',
      victim: 'SULTAN',
      victimTeam: 'RAWALPINDI REAPERS',
      weapon: 'AWM APEX',
      isHeadshot: true,
      isBloodreign: true,
    };
    setKillFeed((prev) => [newEvent, ...prev.slice(0, 14)]);
    setAliveCount((prev) => Math.max(4, prev - 1));
    setRoster((prev) =>
      prev.map((p) => (p.ign.includes('KASTANE-X') ? { ...p, kills: p.kills + 1, damage: p.damage + 300 } : p))
    );
    setStandings((prev) =>
      prev.map((t) => (t.tag === 'BR' ? { ...t, killPoints: t.killPoints + 1, totalPoints: t.totalPoints + 1 } : t))
    );
  };

  const handleAddMarker = (x: number, y: number, type: 'waypoint' | 'enemy' | 'airdrop') => {
    const newMarker: TacticalMarker = {
      id: `m-${Date.now()}`,
      x,
      y,
      type,
      label: type === 'enemy' ? 'ENEMY ENGAGEMENT' : type === 'airdrop' ? 'SUPPLY DROP' : 'WAYPOINT 4',
    };
    setMarkers((prev) => [...prev, newMarker]);
  };

  const handleUpdatePlayerHp = (id: string, delta: number) => {
    setRoster((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextHp = Math.max(0, Math.min(p.maxHp, p.hp + delta));
          return { ...p, hp: nextHp, isAlive: nextHp > 0 };
        }
        return p;
      })
    );
  };

  const handleDeployGlooWall = (id: string) => {
    setRoster((prev) =>
      prev.map((p) => (p.id === id ? { ...p, glooWalls: Math.max(0, p.glooWalls - 1) } : p))
    );
  };

  const handlePlayerFrag = (id: string) => {
    setRoster((prev) =>
      prev.map((p) => (p.id === id ? { ...p, kills: p.kills + 1, damage: p.damage + 200 } : p))
    );
    setAliveCount((prev) => Math.max(4, prev - 1));
    setStandings((prev) =>
      prev.map((t) => (t.tag === 'BR' ? { ...t, killPoints: t.killPoints + 1, totalPoints: t.totalPoints + 1 } : t))
    );
  };

  const handleReloadWeapon = (id: string) => {
    setRoster((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            primaryWeapon: {
              ...p.primaryWeapon,
              ammo: p.primaryWeapon.maxClip,
            },
          };
        }
        return p;
      })
    );
  };

  const handleCallAirdrop = () => {
    setMarkers((prev) => [
      ...prev,
      {
        id: `ad-${Date.now()}`,
        x: 48 + Math.floor(Math.random() * 10 - 5),
        y: 48 + Math.floor(Math.random() * 10 - 5),
        type: 'airdrop',
        label: 'AIRDROP CALLOUT',
      },
    ]);
  };

  const handleTriggerAirStrike = () => {
    playSound('alarm');
  };

  const handleHealAllSquad = () => {
    setRoster((prev) =>
      prev.map((p) => ({
        ...p,
        hp: p.maxHp,
        ep: p.maxEp,
        isAlive: true,
      }))
    );
  };

  const totalTeamKills = roster.reduce((sum, p) => sum + p.kills, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#e5e1e4] flex flex-col font-body selection:bg-[#FF1E27] selection:text-white">
      {/* Top Bar strictly following 3-Zone Contract */}
      <TopNav
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isAudioOn={isAudioOn}
        onToggleAudio={handleToggleAudio}
        aliveCount={aliveCount}
        totalPlayers={totalPlayers}
        onTriggerBooyah={() => setIsBooyahOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 md:p-6 lg:p-8">
        {currentScreen === 'live-hud' && (
          <BroadcastHUD
            roster={roster}
            killFeed={killFeed}
            markers={markers}
            aliveCount={aliveCount}
            totalPlayers={totalPlayers}
            activeSquads={activeSquads}
            matchTime={formatTime(matchSeconds)}
            zoneCountdown={formatTime(zoneCountdownSeconds)}
            isSimulating={isSimulating}
            zoneRadius={zoneRadius}
            onToggleSimulation={() => setIsSimulating(!isSimulating)}
            onSimulateFrag={handleSimulateFrag}
            onSimulateHeadshot={handleSimulateHeadshot}
            onAddMarker={handleAddMarker}
            onUpdatePlayerHp={handleUpdatePlayerHp}
            onDeployGlooWall={handleDeployGlooWall}
            onPlayerFrag={handlePlayerFrag}
            onReloadWeapon={handleReloadWeapon}
            onCallAirdrop={handleCallAirdrop}
            onTriggerAirStrike={handleTriggerAirStrike}
            onHealAllSquad={handleHealAllSquad}
          />
        )}

        {currentScreen === 'roster' && <RosterDossier roster={roster} />}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen
            standings={standings}
            onAddKillToBloodreign={handleSimulateFrag}
          />
        )}

        {currentScreen === 'war-room' && (
          <TacticalWarRoom onLaunchMatch={() => setCurrentScreen('live-hud')} />
        )}

        {currentScreen === 'arsenal' && <ArsenalScreen />}
      </main>

      {/* Booyah Victory Banner Celebration Modal */}
      <BooyahModal
        isOpen={isBooyahOpen}
        onClose={() => setIsBooyahOpen(false)}
        totalTeamKills={totalTeamKills}
      />

      {/* Tactical Telemetry Footer Bar */}
      <footer className="border-t border-[#1B1D24] bg-[#0E0E10] px-4 md:px-8 py-3 text-xs font-mono text-[#858B9A] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[#D4A359] font-bold">BLOODREIGN ESPORTS</span>
          <span aria-hidden="true">·</span>
          <span>SRI LANKA COMPETITIVE DIVISION</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#FF1E27] font-bold">FFWS SOUTH ASIA #04</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>SERVER TICK: 60Hz</span>
          <span aria-hidden="true">·</span>
          <span>LATENCY: 14MS</span>
          <span aria-hidden="true">·</span>
          <span>ENCRYPTION: AES-256 GLOO</span>
        </div>
      </footer>
    </div>
  );
}
