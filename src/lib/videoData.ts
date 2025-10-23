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
  // Boxing - Fitness
  { name: "15 min boxing - round 3", url: "https://www.youtube.com/watch?v=9N9Li_zWjug", level: "Advanced", minutes: 15, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The third of three fifteen workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing", q3: "~15mins" },
  { name: "15 min boxing - round 2", url: "https://www.youtube.com/watch?v=80aIcGHbyjY", level: "Advanced", minutes: 15, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The second of three fifteen minute workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing", q3: "~15mins" },
  { name: "15 min boxing - round 1", url: "https://www.youtube.com/watch?v=idcnk1Ekgh8", level: "Advanced", minutes: 15, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The first of three fifteen minute workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing", q3: "~15mins" },
  
  { name: "10 min boxing - round 4", url: "https://www.youtube.com/watch?v=DmO-PsxTAA4", level: "Medium", minutes: 10, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The fourth of four ten minute workouts focused on boxercise with some bodyweight exercises", q1: "Fitness", q1_1: "Boxing", q3: "5-10mins" },
  { name: "10 min boxing - round 3", url: "https://www.youtube.com/watch?v=9N9Li_zWjug", level: "Medium", minutes: 10, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The third of four ten minute workouts focused on boxercise with some bodyweight exercises", q1: "Fitness", q1_1: "Boxing", q3: "5-10mins" },
  { name: "10 min boxing - round 2", url: "https://www.youtube.com/watch?v=80aIcGHbyjY", level: "Medium", minutes: 10, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The second of four ten minute workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing", q3: "5-10mins" },
  { name: "10 min boxing - round 1", url: "https://www.youtube.com/watch?v=idcnk1Ekgh8", level: "Medium", minutes: 10, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "The first of four ten minute workouts focused on boxercise with some bodyweight movements", q1: "Fitness", q1_1: "Boxing", q3: "5-10mins" },
  
  { name: "5 min boxing - round 4", url: "https://www.youtube.com/watch?v=qSb7AmxIsNM", level: "Beginner", minutes: 5, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Light boxercise practising the technique of duck, slip, roll", q1: "Fitness", q1_1: "Boxing", q3: "~5mins" },
  { name: "5 min boxing - round 3", url: "https://www.youtube.com/watch?v=DdhCxv7CloQ", level: "Beginner", minutes: 5, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Light boxercise practising left uppercut, right uppercut and left-right combos", q1: "Fitness", q1_1: "Boxing", q3: "~5mins" },
  { name: "5 min boxing - round 2", url: "https://www.youtube.com/watch?v=iCgGIkDddNQ", level: "Beginner", minutes: 5, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Light boxercise practising left hook, right hook and left-right combos", q1: "Fitness", q1_1: "Boxing", q3: "~5mins" },
  { name: "5 min boxing - round 1", url: "https://www.youtube.com/watch?v=Re9KFMztnk0", level: "Beginner", minutes: 5, category: "Boxing; Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Light boxercise practising jabs, cross and jab cross combos", q1: "Fitness", q1_1: "Boxing", q3: "~5mins" },
  
  { name: "Boxing Uppercuts", url: "https://www.youtube.com/shorts/sfGUO8QeH3M", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing uppercuts", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Uppercut Combos", url: "https://www.youtube.com/shorts/inSb25u2aPM", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing uppercut combos", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Hook Combos", url: "https://www.youtube.com/shorts/ac5LhHirbtY", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing hook combos", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Jab Hook Combos", url: "https://www.youtube.com/shorts/7YtFHPKtrb8", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of jab hook combos", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Jab Combos", url: "https://www.youtube.com/shorts/4LX0Mctuf84", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of boxing jab combos", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "How to Jab - Boxing", url: "https://www.youtube.com/shorts/vXT3pRDmG4g", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip learning how to jab", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "How to cross punch", url: "https://www.youtube.com/shorts/qogWV9NMq1I", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip learning how to cross punch", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Stance", url: "https://www.youtube.com/shorts/yExRIcq5Ooc", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip learning how to stand when boxing", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Combos 1", url: "https://www.youtube.com/shorts/abNxlp-61J8", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "First short clip of boxing combinations", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Combos 2", url: "https://www.youtube.com/shorts/s_ffsiZ0FYY", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Second short clip of boxing combinations", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Combos 3", url: "https://www.youtube.com/shorts/FHBEyHUTD7Q", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Third short clip of boxing combinatoins", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Combos 4", url: "https://youtube.com/shorts/lXw8_SFlKTY", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Fourth short clip of boxing combinations", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Boxing Combos 5", url: "https://youtube.com/shorts/KMDW8XVoGTw", level: "Skills", minutes: "Short", category: "Boxing", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Fifth short clip of boxing combinations", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },

  // Full Body Fitness
  { name: "Jumping Jacks", url: "https://www.youtube.com/shorts/q2zvb-YOByA", level: "Skills", minutes: "Short", category: "Boxing Cardio", trainer: "Gideon", details: "Cardio, boxing, boxercise, bodyweight", description: "Short clip of jumping jacks", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },
  { name: "20 min bodyweight", url: "https://www.youtube.com/watch?v=2OME5wV1WM4", level: "Advanced", minutes: 20, category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio", description: "20 minute bodyweight workout", q1: "Fitness", q1_1: "Full Body Fitness", q3: "~15mins" },
  { name: "10 min strength", url: "https://www.youtube.com/watch?v=dJ3AhcpPUgA", level: "Medium", minutes: 10, category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "10 minute bodyweight strength focused workout", q1: "Fitness", q1_1: "Full Body Fitness", q3: "5-10mins" },
  { name: "Reverse Lunge", url: "https://www.youtube.com/shorts/LqZCQcZPs9U", level: "Skills", minutes: "Short", category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "Short clip of reverse lunge", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },
  { name: "Shoulder Taps", url: "https://www.youtube.com/shorts/M9vYCAnCPCc", level: "Skills", minutes: "Short", category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "Short clip of shoulder taps", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },
  { name: "Figure Four", url: "https://www.youtube.com/shorts/WitSjVFploc", level: "Skills", minutes: "Short", category: "Bodyweight", trainer: "Shantani", details: "Yoga", description: "Short clip of figure four", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },
  { name: "Bodyweight Workout 1", url: "https://youtu.be/vzh82UWwpF0", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "First of nine 2 minute bodyweight workouts", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },
  { name: "Bodyweight Workout 2", url: "https://youtu.be/_AXrtGRitmk", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "Second of nine 2 minute bodyweight workouts", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },
  { name: "Bodyweight Workout 5", url: "https://youtu.be/X-KScxrn180", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "Fifth of nine 2 minute bodyweight workouts", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },
  { name: "Bodyweight Workout 6", url: "https://youtu.be/byOP5JRCIgs", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "Sixth of nine 2 miinute bodyweight workouts", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },
  { name: "Bodyweight Workout 9", url: "https://youtu.be/AHKkktaZt_U", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "Ninth of nine 2 minute bodyweight workouts", q1: "Fitness", q1_1: "Full Body Fitness", q3: "1 min!" },

  // Strength & Tone
  { name: "20 min strength", url: "https://www.youtube.com/watch?v=7jC7oaqcHL4", level: "Advanced", minutes: 20, category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio", description: "20 minute bodyweight strength focused workout", q1: "Fitness", q1_1: "Strength & Tone", q3: "~15mins" },
  { name: "10 min core", url: "https://www.youtube.com/watch?v=qq2d7pacfmo", level: "Medium", minutes: 10, category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "10 minute bodyweight core focused workout", q1: "Fitness", q1_1: "Strength & Tone", q3: "5-10mins" },
  { name: "10 min lower body", url: "https://www.youtube.com/watch?v=0vKlveHgwiM", level: "Medium", minutes: 10, category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "10 minute bodyweight lower body focused workout", q1: "Fitness", q1_1: "Strength & Tone", q3: "5-10mins" },
  { name: "5 min core", url: "https://www.youtube.com/watch?v=9abUmcRrI4A", level: "Beginner", minutes: 5, category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "5 minute bodyweight core focused workout", q1: "Fitness", q1_1: "Strength & Tone", q3: "~5mins" },
  { name: "5 min balance", url: "https://www.youtube.com/watch?v=vkUUrR-n4Kk", level: "Beginner", minutes: 5, category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "5 minute bodyweight balance focused workout", q1: "Fitness", q1_1: "Strength & Tone", q3: "~5mins" },
  { name: "5 min lower body strength", url: "https://www.youtube.com/watch?v=Yf3HfjpMj8w", level: "Beginner", minutes: 5, category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "5 minute bodyweight lower body strength focused workout", q1: "Fitness", q1_1: "Strength & Tone", q3: "~5mins" },
  { name: "Side Plank", url: "https://www.youtube.com/shorts/lnCf7ifjGWs", level: "Skills", minutes: "Short", category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "Short clip of side plank", q1: "Fitness", q1_1: "Strength & Tone", q3: "1 min!" },
  { name: "Kickbox", url: "https://www.youtube.com/shorts/5IF4JwjKaak", level: "Skills", minutes: "Short", category: "Bodyweight", trainer: "Shantani", details: "Bodyweight, Cardio, Core", description: "Short clip of kickboxing", q1: "Fitness", q1_1: "Boxing", q3: "1 min!" },
  { name: "Bodyweight Workout 3", url: "https://youtu.be/tlO4ifocjv8", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "Third of nine 2 minute bodyweight workouts", q1: "Fitness", q1_1: "Strength & Tone", q3: "1 min!" },
  { name: "Bodyweight Workout 4", url: "https://youtu.be/7lFFGbPDtEo", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "Four of nine 2 minute bodyweight workouts", q1: "Fitness", q1_1: "Strength & Tone", q3: "1 min!" },
  { name: "Bodyweight Workout 7", url: "https://youtu.be/pKdVMFaWK1g", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "Seventh of nine 2 minute bodyweight workouts", q1: "Fitness", q1_1: "Strength & Tone", q3: "1 min!" },
  { name: "Bodyweight Workout 8", url: "https://youtu.be/TEVjBzvbHUM", level: "Beginner", minutes: 2, category: "Bodyweight", trainer: "Dave", details: "Bodyweight, Core", description: "Eigth of nine 2 minute bodyweight workouts", q1: "Fitness", q1_1: "Strength & Tone", q3: "1 min!" },

  // Yoga
  { name: "20 min yoga flow", url: "https://www.youtube.com/watch?v=l1KWO6tOH_s", level: "Advanced", minutes: 20, category: "Yoga", trainer: "Shantani", details: "Yoga, Bodyweight, Cardio,", description: "20 minute yoga flow workout", q1: "Fitness", q1_1: "Yoga", q3: "~15mins" },
  { name: "Morning Movement", url: "https://youtu.be/PHla49sSbK8", level: "Beginner", minutes: 12, category: "Yoga", trainer: "Dr Rebekah", details: "Yoga, Bodyweight, Breathwork", description: "12 minute bodyweight morning movement yoga workout", q1: "Fitness", q1_1: "Yoga", q3: "~15mins" },
  { name: "5 min reset", url: "https://youtu.be/ybG31m5_ThM", level: "Beginner", minutes: 5, category: "Yoga", trainer: "Dr Rebekah", details: "Yoga, Bodyweight, Breathwork", description: "5 minute yoga reset workout", q1: "Fitness", q1_1: "Yoga", q3: "~5mins" },
  { name: "Yoga Core Flow", url: "https://youtu.be/aUhoGS2phAE", level: "Medium", minutes: 9, category: "Yoga", trainer: "Dr Rebekah", details: "Yoga, Bodyweight, Breathwork", description: "9 minute bodyweight yoga core flow workout", q1: "Fitness", q1_1: "Yoga", q3: "5-10mins" },
  { name: "Foundation Flow", url: "https://youtu.be/UlEAAYp_zHg", level: "Medium", minutes: 17, category: "Yoga", trainer: "Dr Rebekah", details: "Yoga, Bodyweight, Breathwork", description: "17 minute bodyweight foundation flow workout", q1: "Fitness", q1_1: "Yoga", q3: "~15mins" },
  { name: "Yoga Wind Down", url: "https://youtu.be/mpZLG8WTdis", level: "Medium", minutes: 7, category: "Yoga", trainer: "Dr Rebekah", details: "Yoga, Bodyweight, Breathwork", description: "7 minute bodyweight yoga wind down workout", q1: "Fitness", q1_1: "Yoga", q3: "5-10mins" },
  { name: "Morning Practice", url: "https://youtube.com/shorts/jS7ch1PbhDQ", level: "Beginner", minutes: "Short", category: "Yoga", trainer: "Dr Rebekah", details: "Yoga, Bodyweight, Breathwork", description: "short clip of bodyweight yoga morning practice", q1: "Fitness", q1_1: "Yoga", q3: "1 min!" },
  { name: "Morning Movement 2", url: "https://youtube.com/shorts/Us-OGbeMu3U", level: "Beginner", minutes: "Short", category: "Yoga", trainer: "Dr Rebekah", details: "Yoga, Bodyweight, Breathwork", description: "short clip of bodyweight morning movement practice", q1: "Fitness", q1_1: "Yoga", q3: "1 min!" },

  // Pilates
  { name: "Slowdown Pilates", url: "https://www.youtube.com/watch?v=XrFwZIFrg2Q", level: "Medium", minutes: 10, category: "Pilates", trainer: "Emma", details: "Bodyweight, Cardio, Core", description: "10 minute bodyweight slowdown pilates workout", q1: "Fitness", q1_1: "Pilates", q3: "5-10mins" },
  { name: "Saturday Session", url: "https://www.youtube.com/watch?v=pr27OnbG-CY&feature=youtu.be", level: "Medium", minutes: 10, category: "Pilates", trainer: "Emma", details: "Bodyweight, Cardio, Core", description: "10 minute bodyweight saturday session pilates workout", q1: "Fitness", q1_1: "Pilates", q3: "5-10mins" },
  { name: "Fired Up Fridays", url: "https://www.youtube.com/watch?v=DI6f_Debo88", level: "Medium", minutes: 10, category: "Pilates", trainer: "Emma", details: "Bodyweight, Cardio, Core", description: "10 minute bodyweight fired up friday pilates workout", q1: "Fitness", q1_1: "Pilates", q3: "5-10mins" },
  { name: "Mindful Pilates", url: "https://www.youtube.com/watch?v=tZ_Y5HXtY2k", level: "Medium", minutes: 10, category: "Pilates", trainer: "Emma", details: "Bodyweight, Cardio, Core", description: "10 minute bodyweight mindful pilates workout", q1: "Fitness", q1_1: "Pilates", q3: "5-10mins" },
  { name: "Flow Pilates", url: "https://www.youtube.com/watch?v=n_5j0LoYlww", level: "Medium", minutes: 10, category: "Pilates", trainer: "Emma", details: "Bodyweight, Cardio, Core", description: "10 minute bodyweight flow pilates workout", q1: "Fitness", q1_1: "Pilates", q3: "5-10mins" },

  // Nutrition - Nutrition Advice
  { name: "Eating on a budget", url: "https://www.youtube.com/watch?v=2NBgcO36pvM", level: "Beginner", minutes: 1, category: "Diet & Nutrition", trainer: "Mel", details: "Diet, Nutrition, Eating, Food", description: "Short clip of tips to eat on a budget", q1: "Nutrition", q1_1: "Nutrition Advice", q3: "1 min!" },
  
  // Nutrition - Healthy Meals
  { name: "Easy Fruit and Veg", url: "https://www.youtube.com/watch?v=PjsD03TDuvA", level: "Beginner", minutes: 1, category: "Diet & Nutrition", trainer: "Mel", details: "Diet, Nutrition, Eating, Food", description: "Short clip of easy ways to eat fruit and vegetables", q1: "Nutrition", q1_1: "Healthy Meals", q3: "1 min!" },
  { name: "Quick and Easy Lunch", url: "https://www.youtube.com/watch?v=MENF7p484tY", level: "Beginner", minutes: 2, category: "Diet & Nutrition", trainer: "Mel", details: "Diet, Nutrition, Eating, Food", description: "Short clip of a quick and easy lunch option", q1: "Nutrition", q1_1: "Healthy Meals", q3: "1 min!" },
  
  // Nutrition - Nutrition Info
  { name: "Nutrition Basics", url: "https://www.youtube.com/watch?v=8nYcbnS36sY&list=PL1AcDmQxb5XuYA5HT8txAisvZLTsD4UiC", level: "Beginner", minutes: 6, category: "Diet & Nutrition", trainer: "Zara", details: "Diet, Nutrition, Eating, Food", description: "5 basic principles of nutrition", q1: "Nutrition", q1_1: "Nutrition Info", q3: "5-10mins" },
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
