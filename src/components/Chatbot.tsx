import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm here to help you navigate e-PHIT. You can ask me about:\n\n• Taking the quiz\n• Finding specific videos\n• Understanding our categories\n• Learning about e-PHIT\n\nWhat would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simple rule-based responses for demo
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
  };

  const generateResponse = (input: string): string => {
    const lower = input.toLowerCase();

    if (lower.includes("quiz") || lower.includes("recommendation")) {
      return "To get personalized video recommendations, try our quiz! Click 'Take Quiz' in the navigation or go directly to /quiz. It takes less than a minute and helps us find the perfect videos for you.";
    }

    if (lower.includes("boxing") || lower.includes("exercise") || lower.includes("workout")) {
      return "We have excellent boxing content! You can browse videos by category on the 'Browse Videos' page. We have boxing workouts ranging from 1-minute skill clips to full 15-minute sessions, suitable for all levels from beginner to advanced.";
    }

    if (lower.includes("yoga")) {
      return "Our yoga sessions are perfect for relaxation and mindfulness. Check out the Browse Videos page and filter by the Yoga category. We have sessions designed specifically to help with anxiety and stress.";
    }

    if (lower.includes("nutrition") || lower.includes("food") || lower.includes("meal")) {
      return "We offer nutrition advice and healthy meal guidance! When you take the quiz, select 'Improving Nutrition' as your goal, or browse the Nutrition category to see all our videos on healthy eating and meal preparation.";
    }

    if (lower.includes("time") || lower.includes("long") || lower.includes("duration")) {
      return "Our videos range from quick 1-minute clips to full 15-minute workouts. When you take the quiz, you can specify how much time you have, and we'll match you with appropriate videos. You can also filter by duration on the Browse page.";
    }

    if (lower.includes("beginner") || lower.includes("start") || lower.includes("new")) {
      return "Great! We have plenty of beginner-friendly content. When taking the quiz, select 'Beginner' as your experience level. All our videos are designed to be accessible, with clear instructions from qualified trainers.";
    }

    if (lower.includes("about") || lower.includes("what is") || lower.includes("ephit")) {
      return "e-PHIT Mental Health is a University of Manchester research programme creating evidence-based exercise and nutrition content for young people's mental wellbeing. Visit our About page to learn more about our mission and research.";
    }

    if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) {
      return "You can contact us through the Contact page! Fill out the form or email us at ephit@manchester.ac.uk. We'd love to hear your feedback about this platform.";
    }

    return "I'm here to help you navigate e-PHIT! You can ask me about taking the quiz, finding videos, our categories, or anything else about the platform. What would you like to know?";
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-transform hover:scale-110",
          isOpen && "scale-0"
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[600px] shadow-2xl z-50 flex flex-col animate-scale-in">
          <CardHeader className="border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                e-PHIT Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/20 text-primary-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2 max-w-[85%] whitespace-pre-wrap text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex w-full gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
