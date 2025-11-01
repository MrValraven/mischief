"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ChallengeDisplayProps {
  challenge: { id: number; text: string; difficulty: string } | null
  onComplete: () => void
  totalSpins: number
}

export default function ChallengeDisplay({ challenge, onComplete, totalSpins }: ChallengeDisplayProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = () => {
    setIsCompleting(true)
    setTimeout(() => {
      onComplete()
      setIsCompleting(false)
    }, 600)
  }

  const difficultyColors = {
    easy: "from-green-500 to-emerald-600",
    medium: "from-yellow-500 to-orange-600",
    hard: "from-red-500 to-pink-600",
  }

  const difficultyEmoji = {
    easy: "🌿",
    medium: "🔥",
    hard: "💀",
  }

  if (!challenge) return null

  const difficultyColor =
    difficultyColors[challenge.difficulty as keyof typeof difficultyColors] || difficultyColors.easy
  const difficultyEmoji_ = difficultyEmoji[challenge.difficulty as keyof typeof difficultyEmoji] || "🌿"

  return (
    <div
      className={`flex flex-col items-center gap-6 animate-fade-in transform transition-all duration-500 ${isCompleting ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
    >
      {/* Challenge Card */}
      <div className="w-full bg-gradient-to-br from-purple-800 via-pink-700 to-orange-800 rounded-2xl p-8 shadow-2xl border-2 border-yellow-400 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-2xl"></div>

        <div className="text-center relative z-10">
          <p className="text-sm font-bold text-yellow-300 mb-2 tracking-widest">YOUR CHALLENGE AWAITS</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight text-balance">
            {challenge.text}
          </h2>

          <div
            className={`inline-block bg-gradient-to-r ${difficultyColor} px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg`}
          >
            {difficultyEmoji_} {challenge.difficulty.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={handleComplete}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black py-7 text-base rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          ✅ Challenge Complete!
        </Button>

        <Button
          onClick={onComplete}
          variant="outline"
          className="w-full border-2 border-orange-400 text-orange-300 hover:bg-orange-950 font-bold py-6 rounded-xl transition-all duration-300 bg-transparent"
        >
          Skip Challenge
        </Button>

        <p className="text-center text-orange-200 text-xs font-medium opacity-80">
          🎭 Show us what you've got or spin again for a new challenge!
        </p>
      </div>

      {/* Progress indicator */}
      {totalSpins > 1 && (
        <div className="text-center">
          <p className="text-purple-300 text-xs opacity-75">
            You're on a roll! {totalSpins} challenge{totalSpins !== 1 ? "s" : ""} completed
          </p>
        </div>
      )}
    </div>
  )
}
