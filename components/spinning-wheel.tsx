"use client";

import { Key, useState } from "react";
import { Button } from "@/components/ui/button";

export interface Challenge {
  id: number;
  text: string;
  difficulty: "easy" | "medium" | "hard";
}

interface SpinningWheelProps {
  challenges: any;
  onSpin: (challengeId: number) => void;
}

export default function SpinningWheel({
  challenges,
  onSpin,
}: SpinningWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showSpark, setShowSpark] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowSpark(true);

    // Generate random spin (minimum 5 full rotations + random amount)
    const extraRotation = Math.random() * 360;
    const totalRotation = rotation + 1800 + extraRotation;
    setRotation(totalRotation);

    // Determine which challenge was selected
    const normalizedRotation = totalRotation % 360;
    const segmentSize = 360 / challenges.length;
    const selectedSegment =
      Math.floor((360 - normalizedRotation) / segmentSize) % challenges.length;

    // Trigger callback after spin animation completes
    setTimeout(() => {
      onSpin(selectedSegment);
      setIsSpinning(false);
    }, 2500);

    setTimeout(() => setShowSpark(false), 2500);
  };

  const segmentSize = 360 / challenges.length;

  const colors = [
    "#c41e3a", // crimson
    "#ff8c00", // dark orange
    "#8b008b", // dark magenta
    "#ff6347", // tomato
    "#9932cc", // dark orchid
    "#ff7f50", // coral
    "#8b0000", // dark red
    "#ff4500", // orange red
    "#660099", // purple
    "#ff8800", // orange
    "#cc00cc", // magenta
    "#ff3300", // bright red
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Wheel Container */}
      <div className="relative w-full aspect-square max-w-xs mx-auto">
        {/* Glow effect */}
        {!isSpinning && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 opacity-30 blur-xl animate-pulse"></div>
        )}

        {/* Pointer at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-yellow-300 drop-shadow-2xl filter drop-shadow-lg">
          {showSpark && (
            <>
              <div className="absolute -top-2 -left-3 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
              <div
                className="absolute -top-2 left-3 w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </>
          )}
        </div>

        {/* Wheel SVG with enhanced styling */}
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full transition-transform drop-shadow-2xl ${
            isSpinning ? "duration-[2.5s] ease-out" : "duration-300 ease-out"
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            filter: "drop-shadow(0 0 30px rgba(249, 115, 22, 0.4))",
          }}
        >
          {challenges.map(
            (
              challenge: { id: Key | null | undefined; text: string },
              index: number
            ) => {
              const startAngle = index * segmentSize * (Math.PI / 180);
              const endAngle = (index + 1) * segmentSize * (Math.PI / 180);

              const x1 = 200 + 150 * Math.cos(startAngle);
              const y1 = 200 + 150 * Math.sin(startAngle);
              const x2 = 200 + 150 * Math.cos(endAngle);
              const y2 = 200 + 150 * Math.sin(endAngle);

              const largeArc = segmentSize > 180 ? 1 : 0;
              const pathD = `M 200 200 L ${x1} ${y1} A 150 150 0 ${largeArc} 1 ${x2} ${y2} Z`;

              const midAngle = startAngle + segmentSize * 0.5 * (Math.PI / 180);
              const textX = 200 + 95 * Math.cos(midAngle);
              const textY = 200 + 95 * Math.sin(midAngle);
              const textRotation = index * segmentSize + segmentSize / 2;

              const segmentColor = colors[index % colors.length];

              return (
                <g key={challenge.id}>
                  <path
                    d={pathD}
                    fill={segmentColor}
                    stroke="#000"
                    strokeWidth="3"
                    style={{ opacity: 0.85 }}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="white"
                    transform={`rotate(${textRotation} ${textX} ${textY})`}
                    className="pointer-events-none select-none font-sans"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    {challenge.text.split(" ").slice(0, 3).join("\n")}
                  </text>
                </g>
              );
            }
          )}

          {/* Center circle with gradient */}
          <defs>
            <radialGradient id="centerGradient" cx="40%" cy="40%">
              <stop
                offset="0%"
                style={{ stopColor: "#fbbf24", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
              />
            </radialGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="35"
            fill="url(#centerGradient)"
            stroke="#1f2937"
            strokeWidth="3"
          />
          <circle
            cx="200"
            cy="200"
            r="20"
            fill="#fcd34d"
            stroke="#1f2937"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Spin Button with enhanced styling */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-600 hover:from-orange-600 hover:via-pink-600 hover:to-red-700 text-white font-black py-8 text-lg rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <span className="inline-block animate-spin">⚡</span>
            Spinning...
            <span
              className="inline-block animate-spin"
              style={{ animationDelay: "0.5s" }}
            >
              ⚡
            </span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            ✨ SPIN THE WHEEL ✨
          </span>
        )}
      </Button>

      {/* Info message */}
      <p className="text-center text-orange-300 text-xs font-medium opacity-75 px-4">
        🎃 Click to spin and discover your Halloween challenge 🎃
      </p>
    </div>
  );
}
