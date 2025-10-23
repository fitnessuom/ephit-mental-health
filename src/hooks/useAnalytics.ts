import { useCallback } from "react";

export interface AnalyticsEvent {
  type: "video_click" | "quiz_start" | "quiz_complete" | "category_browse";
  timestamp: string;
  data: Record<string, any>;
}

/**
 * Simple analytics hook using localStorage
 * Records user interactions for demo purposes
 */
export function useAnalytics() {
  const track = useCallback((type: AnalyticsEvent["type"], data: Record<string, any> = {}) => {
    const event: AnalyticsEvent = {
      type,
      timestamp: new Date().toISOString(),
      data,
    };

    try {
      const events = JSON.parse(localStorage.getItem("ephit-analytics") || "[]");
      events.push(event);
      
      // Keep last 1000 events
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }
      
      localStorage.setItem("ephit-analytics", JSON.stringify(events));
      console.log("Analytics event tracked:", event);
    } catch (error) {
      console.error("Failed to track analytics:", error);
    }
  }, []);

  const getEvents = useCallback((): AnalyticsEvent[] => {
    try {
      return JSON.parse(localStorage.getItem("ephit-analytics") || "[]");
    } catch {
      return [];
    }
  }, []);

  const clearEvents = useCallback(() => {
    localStorage.removeItem("ephit-analytics");
    localStorage.removeItem("ephit-quiz-history");
  }, []);

  return { track, getEvents, clearEvents };
}
