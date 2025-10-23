/**
 * Video data types and utilities for e-PHIT Mental Health
 * Parses video index and provides filtering logic for the quiz
 */

export interface Video {
  id: string;
  name: string;
  url: string;
  level: "Beginner" | "Medium" | "Advanced" | "Skills";
  minutes: number | "Short";
  category: string;
  trainer: string;
  details: string;
  description: string;
  q1?: string; // Decision tree Q1
  q1_1?: string; // Decision tree subcategory
  q3?: string; // Decision tree time filter
}

/**
 * Extract YouTube video ID from URL
 */
export function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([^&?\/\s]+)/);
  return match ? match[1] : "";
}

/**
 * Parse raw video data
 * Based on ephit_video_index.xlsx structure
 */
export const rawVideos: Partial<Video>[] = [
  // Boxing - Advanced
  { name: "15 min boxing - round 3", url: "https://www.youtube.com/watch?v=9N9Li_zWjug", level: "Advanced", minutes: 15, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The third of three fifteen workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing Moves", q3: "~15mins" },
  { name: "15 min boxing - round 2", url: "https://www.youtube.com/watch?v=80aIcGHbyjY", level: "Advanced", minutes: 15, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The second of three fifteen minute workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing Moves", q3: "~15mins" },
  { name: "15 min boxing - round 1", url: "https://www.youtube.com/watch?v=idcnk1Ekgh8", level: "Advanced", minutes: 15, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The first of three fifteen minute workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing Moves", q3: "~15mins" },
  
  // Boxing - Medium
  { name: "10 min boxing - round 4", url: "https://www.youtube.com/watch?v=DmO-PsxTAA4", level: "Medium", minutes: 10, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The fourth of four ten minute workouts focused on boxercise with some bodyweight exercises", q1: "Fitness", q1_1: "Boxing Moves", q3: "5-10mins" },
  { name: "10 min boxing - round 3", url: "https://www.youtube.com/watch?v=9N9Li_zWjug", level: "Medium", minutes: 10, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The third of four ten minute workouts focused on boxercise with some bodyweight exercises", q1: "Fitness", q1_1: "Boxing Moves", q3: "5-10mins" },
  { name: "10 min boxing - round 2", url: "https://www.youtube.com/watch?v=80aIcGHbyjY", level: "Medium", minutes: 10, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The second of four ten minute workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing Moves", q3: "5-10mins" },
  { name: "10 min boxing - round 1", url: "https://www.youtube.com/watch?v=idcnk1Ekgh8", level: "Medium", minutes: 10, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The first of four ten minute workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing Moves", q3: "5-10mins" },
  
  // Boxing - Beginner
  { name: "5 min boxing - round 4", url: "https://www.youtube.com/watch?v=qSb7AmxIsNM", level: "Beginner", minutes: 5, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Light boxercise practising the technique of duck, slip, roll", q1: "Fitness", q1_1: "Boxing Moves", q3: "~5mins" },
  { name: "5 min boxing - round 3", url: "https://www.youtube.com/watch?v=DdhCxv7CloQ", level: "Beginner", minutes: 5, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Light boxercise practising left uppercut, right uppercut and left-right combos", q1: "Fitness", q1_1: "Boxing Moves", q3: "~5mins" },
  { name: "5 min boxing - round 2", url: "https://www.youtube.com/watch?v=iCgGIkDddNQ", level: "Beginner", minutes: 5, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Light boxercise practising left hook, right hook and left-right combos", q1: "Fitness", q1_1: "Boxing Moves", q3: "~5mins" },
  { name: "5 min boxing - round 1", url: "https://www.youtube.com/watch?v=Re9KFMztnk0", level: "Beginner", minutes: 5, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Light boxercise practising jabs, cross and jab cross combos", q1: "Fitness", q1_1: "Boxing Moves", q3: "~5mins" },
  
  // Boxing Skills - Short clips
  { name: "Boxing Uppercuts", url: "https://www.youtube.com/shorts/sfGUO8QeH3M", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing uppercuts", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  { name: "Boxing Uppercut Combos", url: "https://www.youtube.com/shorts/inSb25u2aPM", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing uppercut combos", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  { name: "Boxing Hook Combos", url: "https://www.youtube.com/shorts/ac5LhHirbtY", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing hook combos", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  { name: "Boxing Jab Hook Combos", url: "https://www.youtube.com/shorts/7YtFHPKtrb8", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of jab hook combos", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  { name: "Boxing Jab Combos", url: "https://www.youtube.com/shorts/4LX0Mctuf84", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing jab combos", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  { name: "How to Jab - Boxing", url: "https://www.youtube.com/shorts/vXT3pRDmG4g", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip learning how to jab", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  { name: "How to cross punch", url: "https://www.youtube.com/shorts/qogWV9NMq1I", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip learning how to cross punch", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  { name: "Boxing Stance", url: "https://www.youtube.com/shorts/yExRIcq5Ooc", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip learning how to stand when boxing", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  
  // Yoga
  { name: "12 min yoga for anxiety", url: "https://www.youtube.com/watch?v=GSlS2OGeC3E", level: "Beginner", minutes: 12, category: "Yoga", trainer: "Katie", details: "Yoga, mindfulness, stretching", description: "A gentle yoga session designed to ease anxiety", q1: "Fitness", q1_1: "Yoga", q3: "5-10mins" },
  { name: "10 min morning yoga", url: "https://www.youtube.com/watch?v=q09Df3w6hxI", level: "Beginner", minutes: 10, category: "Yoga", trainer: "Katie", details: "Yoga, morning routine, stretching", description: "Start your day right with this energizing morning yoga flow", q1: "Fitness", q1_1: "Yoga", q3: "5-10mins" },
  
  // Nutrition
  { name: "How to make a healthy smoothie", url: "https://www.youtube.com/watch?v=example1", level: "Skills", minutes: 5, category: "Nutrition; Healthy Meals", trainer: "Sarah", details: "Nutrition, healthy eating, recipes", description: "Learn to make nutritious smoothies packed with vitamins", q1: "Nutrition", q1_1: "Healthy Meals Advice", q3: "~5mins" },
  { name: "Meal prep basics", url: "https://www.youtube.com/watch?v=example2", level: "Beginner", minutes: 15, category: "Nutrition; Healthy Meals", trainer: "Sarah", details: "Nutrition, meal planning, healthy eating", description: "Master the art of healthy meal preparation", q1: "Nutrition", q1_1: "Healthy Meals Advice", q3: "~15mins" },
  
  // Mindset
  { name: "Training Progress Mindset", url: "https://www.youtube.com/shorts/p7dKkmUZpIk", level: "Skills", minutes: "Short", category: "Mindset", trainer: "Gideon", details: "Mindset", description: "Short clip of how training can develop growth mindset", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
  { name: "Boxing is Like Life", url: "https://youtube.com/shorts/tZCnKOo1j4o", level: "Skills", minutes: "Short", category: "Mindset and Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing combos and how boxing reflects life", q1: "Fitness", q1_1: "Boxing Moves", q3: "1 min!" },
];

// Process videos with IDs
export const videos: Video[] = rawVideos.map((v, idx) => ({
  ...v,
  id: `video-${idx}`,
} as Video));

/**
 * Get unique categories from videos
 */
export function getCategories(): string[] {
  const cats = new Set(videos.map(v => v.category.split(";")[0].trim()));
  return Array.from(cats).sort();
}

/**
 * Filter videos based on quiz answers
 */
export interface QuizAnswers {
  priority?: string; // "Fitness" or "Nutrition"
  type?: string; // "Boxing Moves", "Yoga", etc.
  time?: string; // "1 min!", "~5mins", "5-10mins", "~15mins"
  level?: string; // "Beginner", "Medium", "Advanced", "Skills"
}

export function filterVideos(answers: QuizAnswers): Video[] {
  let filtered = [...videos];

  if (answers.priority) {
    filtered = filtered.filter(v => v.q1 === answers.priority);
  }

  if (answers.type) {
    filtered = filtered.filter(v => v.q1_1 === answers.type);
  }

  if (answers.time) {
    filtered = filtered.filter(v => v.q3 === answers.time);
  }

  if (answers.level) {
    filtered = filtered.filter(v => v.level === answers.level);
  }

  return filtered;
}

/**
 * Get random videos from filtered list
 */
export function getRecommendations(answers: QuizAnswers, count: number = 3): Video[] {
  const filtered = filterVideos(answers);
  
  if (filtered.length <= count) {
    return filtered;
  }

  // Shuffle and take count
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get available options for each question based on current answers
 */
export function getAvailableOptions(answers: QuizAnswers): {
  priorities: string[];
  types: string[];
  times: string[];
  levels: string[];
} {
  const filtered = filterVideos(answers);

  return {
    priorities: Array.from(new Set(filtered.map(v => v.q1).filter(Boolean))),
    types: Array.from(new Set(filtered.map(v => v.q1_1).filter(Boolean))),
    times: Array.from(new Set(filtered.map(v => v.q3).filter(Boolean))),
    levels: Array.from(new Set(filtered.map(v => v.level))),
  };
}
