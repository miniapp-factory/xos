"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Option = {
  text: string;
  sign: ZodiacSign;
};

type Question = {
  text: string;
  options: Option[];
};

type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

const questions: Question[] = [
  {
    text: "What is your favorite type of activity? 🌟",
    options: [
      { text: "Adventure and excitement 🚀", sign: "aries" },
      { text: "Stability and comfort 🏠", sign: "taurus" },
      { text: "Social gatherings 🎉", sign: "gemini" },
      { text: "Family and home 👪", sign: "cancer" },
      { text: "Leadership and confidence 👑", sign: "leo" },
      { text: "Detail-oriented work 🛠️", sign: "virgo" },
      { text: "Balance and harmony ⚖️", sign: "libra" },
      { text: "Intensity and passion 🔥", sign: "scorpio" },
      { text: "Exploration and freedom 🗺️", sign: "sagittarius" },
      { text: "Structure and tradition 📚", sign: "capricorn" },
      { text: "Innovation and change 💡", sign: "aquarius" },
      { text: "Emotional depth 💧", sign: "pisces" },
    ],
  },
  {
    text: "Which color resonates most with you? 🎨",
    options: [
      { text: "Red ❤️", sign: "aries" },
      { text: "Green 🌿", sign: "taurus" },
      { text: "Yellow 🌞", sign: "gemini" },
      { text: "Blue 🌊", sign: "cancer" },
      { text: "Gold ✨", sign: "leo" },
      { text: "White ❄️", sign: "virgo" },
      { text: "Pink 💗", sign: "libra" },
      { text: "Black 🖤", sign: "scorpio" },
      { text: "Orange 🍊", sign: "sagittarius" },
      { text: "Brown 🍫", sign: "capricorn" },
      { text: "Purple 🟣", sign: "aquarius" },
      { text: "Teal 💧", sign: "pisces" },
    ],
  },
  {
    text: "What is your preferred work style? 💼",
    options: [
      { text: "Fast-paced and spontaneous ⚡", sign: "aries" },
      { text: "Methodical and reliable 🛠️", sign: "taurus" },
      { text: "Collaborative and communicative 🤝", sign: "gemini" },
      { text: "Nurturing and supportive 🤗", sign: "cancer" },
      { text: "Charismatic and decisive 🎤", sign: "leo" },
      { text: "Analytical and precise 📊", sign: "virgo" },
      { text: "Diplomatic and fair ⚖️", sign: "libra" },
      { text: "Intense and focused 🔥", sign: "scorpio" },
      { text: "Adventurous and flexible 🌍", sign: "sagittarius" },
      { text: "Organized and disciplined 📅", sign: "capricorn" },
      { text: "Visionary and inventive 💡", sign: "aquarius" },
      { text: "Creative and empathetic 🎨", sign: "pisces" },
    ],
  },
  {
    text: "Which animal do you feel most connected to? 🐾",
    options: [
      { text: "Ram 🐏", sign: "aries" },
      { text: "Bull 🐂", sign: "taurus" },
      { text: "Monkey 🐒", sign: "gemini" },
      { text: "Crab 🦀", sign: "cancer" },
      { text: "Lion 🦁", sign: "leo" },
      { text: "Swan 🦢", sign: "virgo" },
      { text: "Owl 🦉", sign: "libra" },
      { text: "Scorpion 🦂", sign: "scorpio" },
      { text: "Eagle 🦅", sign: "sagittarius" },
      { text: "Goat 🐐", sign: "capricorn" },
      { text: "Fish 🐟", sign: "pisces" },
      { text: "Dolphin 🐬", sign: "aquarius" },
    ],
  },
  {
    text: "What is your ideal vacation? 🌴",
    options: [
      { text: "Mountain climbing 🏔️", sign: "aries" },
      { text: "Beach resort 🏖️", sign: "taurus" },
      { text: "City tour 🏙️", sign: "gemini" },
      { text: "Countryside retreat 🌾", sign: "cancer" },
      { text: "Safari adventure 🐆", sign: "leo" },
      { text: "Museum visit 🏛️", sign: "virgo" },
      { text: "Art gallery 🎨", sign: "libra" },
      { text: "Mystery tour 🔍", sign: "scorpio" },
      { text: "Road trip 🚗", sign: "sagittarius" },
      { text: "Historical site 🏰", sign: "capricorn" },
      { text: "Tech expo 💻", sign: "aquarius" },
      { text: "Underwater exploration 🌊", sign: "pisces" },
    ],
  },
];
const shuffledQuestions = shuffleArray([...questions]);

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<ZodiacSign[]>([]);
  const [result, setResult] = useState<ZodiacSign | null>(null);

  const handleSelect = (sign: ZodiacSign) => {
    setAnswers((prev) => [...prev, sign]);
    if (current + 1 < shuffledQuestions.length) {
      setCurrent(current + 1);
    } else {
      const counts: Record<ZodiacSign, number> = {
        aries: 0,
        taurus: 0,
        gemini: 0,
        cancer: 0,
        leo: 0,
        virgo: 0,
        libra: 0,
        scorpio: 0,
        sagittarius: 0,
        capricorn: 0,
        aquarius: 0,
        pisces: 0,
      };
      answers.forEach((s) => (counts[s] += 1));
      counts[sign] += 1;
      const maxCount = Math.max(...Object.values(counts));
      const tiedSigns = Object.entries(counts)
        .filter(([, count]) => count === maxCount)
        .map(([sign]) => sign as ZodiacSign);
      const maxSign = tiedSigns[Math.floor(Math.random() * tiedSigns.length)];
      setResult(maxSign);
    }
  };

  const retake = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <Card className="w-full max-w-md bg-gradient-to-br from-indigo-100 to-purple-200">
        <CardHeader>
          <CardTitle>Your Zodiac Sign</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <img
            src={`/${result}.png`}
            alt={result}
            width={256}
            height={256}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <p className="text-xl capitalize">{result}</p>
          <Share text={`I scored ${result} in the Zodiac Quiz! ${url}`} />
          <Button onClick={retake}>Retake Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  const shuffledOptions = shuffleArray(shuffledQuestions[current].options);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          Question {current + 1} of {shuffledQuestions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{shuffledQuestions[current].text}</p>
        <div className="flex flex-col gap-2">
          {shuffledOptions.map((opt, idx) => (
            <Button
              key={idx}
              variant="outline"
              onClick={() => handleSelect(opt.sign)}
            >
              {opt.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
