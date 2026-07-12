"use client";

import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diffToCountdown(diffMs: number): Countdown {
  const clamped = Math.max(diffMs, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function useCountdown(targetIso: string): Countdown {
  const target = new Date(targetIso).getTime();
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set initial countdown on mount
    setCountdown(diffToCountdown(target - Date.now()));

    const interval = setInterval(() => {
      setCountdown(diffToCountdown(target - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return countdown;
}
