import { useState, useCallback, useEffect } from "react";
import { QuizAnswers, getRecommendations, Video } from "@/lib/videoData";

export interface QuizState {
  step: number;
  answers: QuizAnswers;
  recommendations: Video[];
  isComplete: boolean;
}

/**
 * Custom hook to manage quiz state and progression
 */
export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    step: 0,
    answers: {},
    recommendations: [],
    isComplete: false,
  });

  const setAnswer = useCallback((key: keyof QuizAnswers, value: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({ ...prev, step: prev.step + 1 }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({ ...prev, step: Math.max(0, prev.step - 1) }));
  }, []);

  const completeQuiz = useCallback(() => {
    const recommendations = getRecommendations(state.answers, 3);
    setState(prev => ({
      ...prev,
      recommendations,
      isComplete: true,
    }));

    // Store in localStorage for analytics
    const quizData = {
      timestamp: new Date().toISOString(),
      answers: state.answers,
      recommendations: recommendations.map(v => v.id),
    };
    
    const history = JSON.parse(localStorage.getItem("ephit-quiz-history") || "[]");
    history.push(quizData);
    localStorage.setItem("ephit-quiz-history", JSON.stringify(history));
  }, [state.answers]);

  const reset = useCallback(() => {
    setState({
      step: 0,
      answers: {},
      recommendations: [],
      isComplete: false,
    });
  }, []);

  return {
    ...state,
    setAnswer,
    nextStep,
    prevStep,
    completeQuiz,
    reset,
  };
}
