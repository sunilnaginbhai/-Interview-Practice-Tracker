import { useCallback, useEffect, useMemo, useState } from "react";

const KEY = "ipt:questions:v1";
const ORDER = ["Pending", "In Progress", "Completed"];
const DIFFICULTY_ORDER = { Easy: 1, Medium: 2, Hard: 3 };

const readQuestions = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const useQuestions = () => {
  const [questions, setQuestions] = useState(readQuestions);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (data) => {
    const now = Date.now();
    setQuestions((previous) => [{ ...data, id: crypto.randomUUID(), createdAt: now, completedAt: data.status === "Completed" ? now : data.completedAt }, ...previous]);
  };

  const updateQuestion = (id, data) => {
    setQuestions((previous) => previous.map((question) => question.id === id ? { ...question, ...data, completedAt: data.status === "Completed" && question.status !== "Completed" ? Date.now() : question.completedAt } : question));
  };

  const deleteQuestion = (id) => setQuestions((previous) => previous.filter((question) => question.id !== id));

  const toggleStatus = (id) => {
    setQuestions((previous) => previous.map((question) => {
      if (question.id !== id) return question;
      const next = ORDER[(ORDER.indexOf(question.status) + 1) % ORDER.length];
      return { ...question, status: next, completedAt: next === "Completed" ? Date.now() : question.completedAt };
    }));
  };

  const bulkComplete = (ids) => setQuestions((previous) => previous.map((question) => ids.includes(question.id) ? { ...question, status: "Completed", completedAt: question.completedAt || Date.now() } : question));
  const bulkDelete = (ids) => setQuestions((previous) => previous.filter((question) => !ids.includes(question.id)));
  const removeSampleQuestions = () => setQuestions((previous) => previous.filter((question) => !question.isSample));
  const mergeQuestions = (items) => setQuestions((previous) => {
    const existing = new Set(previous.map((question) => question.title.toLowerCase()));
    const additions = items.filter((item) => !existing.has(item.title.toLowerCase())).map((item) => ({ ...item, id: crypto.randomUUID(), createdAt: item.createdAt || Date.now(), status: item.status || "Pending" }));
    return [...additions, ...previous];
  });

  const stats = useMemo(() => {
    const completed = questions.filter((question) => question.status === "Completed").length;
    return {
      total: questions.length,
      completed,
      inProgress: questions.filter((question) => question.status === "In Progress").length,
      dsaDone: questions.filter((question) => question.category === "DSA" && question.status === "Completed").length,
      interviewDone: questions.filter((question) => question.category === "Technical" && question.status === "Completed").length,
      machineCoding: questions.filter((question) => question.category === "Machine Coding" && question.status === "Completed").length,
      percent: questions.length ? Math.round((completed / questions.length) * 100) : 0,
      totalTrend: 0,
      completedTrend: 0,
      percentTrend: 0,
    };
  }, [questions]);

  const sortQuestions = useCallback((items, sort) => [...items].sort((a, b) => {
    if (sort === "oldest") return a.createdAt - b.createdAt;
    if (sort === "alphabetical") return a.title.localeCompare(b.title);
    if (sort === "difficulty") return (DIFFICULTY_ORDER[a.difficulty] || 0) - (DIFFICULTY_ORDER[b.difficulty] || 0);
    return b.createdAt - a.createdAt;
  }), []);

  return { questions, addQuestion, updateQuestion, deleteQuestion, toggleStatus, bulkComplete, bulkDelete, removeSampleQuestions, mergeQuestions, sortQuestions, stats };
};

export default useQuestions;
