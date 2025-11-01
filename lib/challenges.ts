interface Challenge {
  id: number;
  text: string;
  difficulty: string;
}

// Import challenges data
import challengeData from "@/data/challenges.json";

export const challenges: Challenge[] = challengeData;
