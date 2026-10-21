import { useCallback, useEffect, useMemo, useState } from "react";
import { todayKey, yesterdayKey, lastNDays, dayKey } from "../utils/dateHelpers";

const STREAK_KEY = "ipt:streak:v1"; // { count, lastActiveDate }
const GOAL_KEY = "ipt:goal:v1"; // number (questions per day)

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const useStreak = () => {
  const [streak, setStreak] = useState(() =>
    readJSON(STREAK_KEY, { count: 0, lastActiveDate: null })
  );
  const [goal, setGoal] = useState(() => readJSON(GOAL_KEY, 3));

  // Persist
  useEffect(() => {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  }, [streak]);
  useEffect(() => {
    localStorage.setItem(GOAL_KEY, JSON.stringify(goal));
  }, [goal]);

  // Call when the user "acts" (adds/completes a question) today.
  const recordActivity = useCallback(() => {
    const today = todayKey();
    setStreak((prev) => {
      if (prev.lastActiveDate === today) return prev; // already counted today
      const nextCount =
        prev.lastActiveDate === yesterdayKey() ? prev.count + 1 : 1;
      return { count: nextCount, lastActiveDate: today };
    });
  }, []);

  // If the user misses a day, the visible streak should reset to 0.
  const effectiveStreak = useMemo(() => {
    const { count, lastActiveDate } = streak;
    if (!lastActiveDate) return 0;
    if (lastActiveDate === todayKey() || lastActiveDate === yesterdayKey()) {
      return count;
    }
    return 0;
  }, [streak]);

  // Count of questions completed TODAY, from the questions array.
  const todayCompleted = useCallback((questions = []) => {
    const today = todayKey();
    return questions.filter(
      (q) => q.status === "Completed" && q.completedAt && dayKey(q.completedAt) === today
    ).length;
  }, []);

  // Last 7 day keys (for the heatmap).
  const weekKeys = useMemo(() => lastNDays(7), []);

  return {
    streakCount: effectiveStreak,
    goal,
    setGoal,
    recordActivity,
    todayCompleted,
    weekKeys,
  };
};

export default useStreak;
