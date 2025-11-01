"use client";

import { useState } from "react";
import SpinningWheel from "@/components/spinning-wheel";
import ChallengeDisplay from "@/components/challenge-display";
import challenges from "@/data/challenges.json";
import { Challenge } from "@/components/spinning-wheel";

export default function Home() {
  const [currentChallenge, setCurrentChallenge] = useState<{
    id: number;
    text: string;
    difficulty: string;
  } | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [totalSpins, setTotalSpins] = useState(0);

  const handleSpin = (challengeId: number) => {
    const challenge = challenges[challengeId];
    if (challenge) {
      setCurrentChallenge(challenge);
      setShowChallenge(true);
      setTotalSpins((prev) => prev + 1);
    }
  };

  const handleComplete = () => {
    setShowChallenge(false);
    setCurrentChallenge(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with stats */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 mb-2 tracking-tight">
            Wheel of Mischief
          </h1>
          <p className="text-orange-200 text-sm md:text-base font-medium">
            ✨ Spin the wheel and embrace the chaos! ✨
          </p>
          {totalSpins > 0 && (
            <p className="text-purple-300 text-xs mt-3 opacity-75">
              Total challenges: {totalSpins}
            </p>
          )}
        </div>

        {!showChallenge ? (
          <SpinningWheel challenges={challenges} onSpin={handleSpin} />
        ) : (
          <ChallengeDisplay
            challenge={currentChallenge}
            onComplete={handleComplete}
            totalSpins={totalSpins}
          />
        )}
      </div>
    </main>
  );
}
