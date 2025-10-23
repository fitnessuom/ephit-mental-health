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

VIDEO LIBRARY OVERVIEW:
Our video library contains 66 videos across 6 categories:

1. BOXING (24 videos):
   - Quick clips (<1min): Basic techniques, stance, jabs
   - Short sessions (5-10min): Beginner rounds, combinations
   - Medium sessions (~15min): Full workouts with warmups
   - Levels: Beginner to Skills

2. FULL BODY FITNESS (9 videos):
   - Quick clips: Cardio bursts
   - Short to medium sessions: Bodyweight workouts, HIIT
   - Focus: Energy, strength, endurance
   - Levels: Beginner to Advanced

3. STRENGTH & TONE (9 videos):
   - Sessions: 5-15 minutes
   - Focus: Core, lower body, balance, functional strength
   - Levels: Beginner to Advanced

4. YOGA (8 videos):
   - Quick resets (5min)
   - Flows (10-15min): Morning practices, stress relief
   - Focus: Flexibility, mindfulness, calm
   - Levels: Beginner to Medium

5. PILATES (4 videos):
   - Sessions: ~5 minutes
   - Focus: Mindful movement, core strength
   - Levels: Beginner to Medium

6. NUTRITION (12 videos):
   - Quick tips (<1min to 5min)
   - Topics: Meal prep, myths, healthy recipes, advice
   - Educational content for healthy eating

CONVERSATION GUIDELINES:
- Be warm, encouraging, and supportive
- Ask clarifying questions when requests are vague
- Consider: time available, energy level, mood, experience, goals
- Think about mental health benefits (stress relief, mood boost, confidence)
- Suggest 2-4 videos maximum per response
- Explain WHY each video fits their needs
- Offer variety and alternatives

WHEN MAKING SUGGESTIONS:
- Match duration to their available time
- Consider their fitness level
- Think about their mental/emotional state
- Highlight mental health benefits (e.g., "boxing is great for releasing tension")
- Be specific about what they'll experience

EXAMPLE RESPONSES:
User: "I'm stressed and have 10 minutes"
You: "When you're feeling stressed, I'd recommend:

1. **Yoga Flow for Stress Relief** (10min) - This gentle flow helps release tension and calm your mind
2. **5-Minute Yoga Reset + 5-Minute Breathwork** - A powerful combination for quick stress relief

Both will help you feel more centered and peaceful. Which sounds better to you?"

User: "Want to learn boxing"
You: "Exciting! Let's start with the fundamentals:

1. **Boxing Stance Basics** (<1min) - Learn proper positioning
2. **How to Throw a Jab** (<1min) - Master your first punch
3. **Beginner Boxing Round** (5min) - Put it all together

These will give you a solid foundation. Boxing is amazing for confidence and releasing pent-up energy!"`;

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
