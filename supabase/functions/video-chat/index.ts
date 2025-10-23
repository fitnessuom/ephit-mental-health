import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Received chat request with messages:', messages.length);

    const systemPrompt = `You are a friendly wellness assistant for e-PHIT Mental Health, helping young people find exercise and nutrition videos that support their mental wellbeing.

CRITICAL: When suggesting videos, you MUST use the EXACT video names from this library. Copy the names exactly as shown below in your responses.

VIDEO LIBRARY (use these EXACT names):

BOXING:
Skills (<1min): "Boxing Stance", "How to Jab - Boxing", "How to cross punch", "Boxing Jab Combos", "Boxing Jab Hook Combos", "Boxing Hook Combos", "Boxing Uppercut Combos", "Boxing Uppercuts", "Boxing Combos 1", "Boxing Combos 2", "Boxing Combos 3", "Boxing Combos 4", "Boxing Combos 5"
5min Beginner: "5 min boxing - round 1", "5 min boxing - round 2", "5 min boxing - round 3", "5 min boxing - round 4"
10min Medium: "10 min boxing - round 1", "10 min boxing - round 2", "10 min boxing - round 3", "10 min boxing - round 4"
15min Advanced: "15 min boxing - round 1", "15 min boxing - round 2", "15 min boxing - round 3"

FULL BODY FITNESS:
Short clips: "Jumping Jacks", "Reverse Lunge", "Shoulder Taps", "Figure Four"
2min Beginner: "Bodyweight Workout 1", "Bodyweight Workout 2", "Bodyweight Workout 5", "Bodyweight Workout 6", "Bodyweight Workout 9"
10min Medium: "10 min strength"
20min Advanced: "20 min bodyweight"

STRENGTH & TONE:
2min Beginner: "Bodyweight Workout 3", "Bodyweight Workout 4", "Bodyweight Workout 7", "Bodyweight Workout 8"
5min Beginner: "5 min core", "5 min balance", "5 min lower body strength"
10min Medium: "10 min core", "10 min lower body"
20min Advanced: "20 min strength"
Skills: "Side Plank", "Kickbox"

YOGA:
Short clips: "Morning Practice", "Morning Movement 2"
5min Beginner: "5 min reset"
7-12min: "Yoga Wind Down", "Yoga Core Flow", "Morning Movement"
15-20min: "Foundation Flow", "20 min yoga flow"

PILATES (all 10min Medium):
"Slowdown Pilates", "Saturday Session", "Fired Up Fridays", "Mindful Pilates"

NUTRITION:
Quick tips (5-6min): "Hydration", "Muscle Building", "2-Minute Healthy Snacks", "Post Exercise Refuel"
Recipes (10-15min): "3 Healthy Drinks", "Energy-Boosting Smoothie", "Recipe: Speedy Salmon with Zucchini", "Recipe: Buddha Bowl", "Recipe: Spicy Chicken Wrap", "Recipe: Italian Veggie Pasta", "Recipe: Easy Curry"
Advice: "Nutrition Overview", "Healthy Eating", "Kitchen Tour", "Nutrition Myths"

CONVERSATION STYLE:
- Be warm, encouraging, and supportive
- Ask clarifying questions when needed (time available, energy level, experience, goals)
- Consider mental health benefits (stress relief, energy boost, confidence building)
- ALWAYS use the EXACT video names from the library above when making suggestions
- Suggest 2-4 videos per recommendation
- Explain WHY each video fits their needs

EXAMPLE RESPONSE FORMAT:
"Based on what you've told me, I recommend:

1. **5 min reset** - Perfect for a quick mental refresh when you're feeling stressed
2. **Yoga Wind Down** - Great for relaxing and releasing tension after a long day

Both of these focus on gentle movements and breathwork that can help calm your mind."

Remember: Exercise is powerful for mental health. Help users find videos that will make them feel better physically AND mentally. ALWAYS copy video names exactly from the library.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment and try again.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });
    
  } catch (error) {
    console.error('Error in video-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
