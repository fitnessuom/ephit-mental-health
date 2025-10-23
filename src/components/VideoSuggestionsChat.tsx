import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Loader2, Sparkles } from "lucide-react";
import { VideoCardCompact } from "./VideoCardCompact";
import { VideoPlayer } from "./VideoPlayer";
import { videos, type Video } from "@/lib/videoData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function VideoSuggestionsChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I'm ePhit Coach—your personal health coach here to help you achieve your ideal day, every day—one step at a time."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractVideoIds = (text: string): string[] => {
    const videoIds: string[] = [];
    // Remove markdown formatting and normalize text
    const cleanText = text.toLowerCase()
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '')   // Remove italic markdown
      .replace(/\[|\]/g, '') // Remove brackets
      .replace(/\(.*?\)/g, ''); // Remove content in parentheses like (5min)
    
    console.log('Extracting videos from text:', cleanText);
    
    // Sort videos by name length (longest first) to match more specific names first
    const sortedVideos = [...videos].sort((a, b) => b.name.length - a.name.length);
    
    sortedVideos.forEach(video => {
      const videoNameLower = video.name.toLowerCase();
      // Check if the video name appears in the cleaned text
      if (cleanText.includes(videoNameLower)) {
        if (!videoIds.includes(video.id)) {
          console.log('Found video match:', video.name);
          videoIds.push(video.id);
        }
      }
    });
    
    console.log('Extracted video IDs:', videoIds);
    return videoIds;
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content
            }))
          }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (let line of lines) {
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.trim() || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg?.role === "assistant") {
                  newMessages[newMessages.length - 1] = {
                    role: "assistant",
                    content: assistantMessage
                  };
                } else {
                  newMessages.push({ role: "assistant", content: assistantMessage });
                }
                return newMessages;
              });
            }
          } catch (e) {
            console.error("Parse error:", e);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: "I have 5 minutes", text: "I have 5 minutes, what can I do?" },
    { label: "Show me yoga", text: "Show me yoga videos" },
    { label: "Beginner workouts", text: "I'm a beginner, what should I start with?" },
    { label: "Quick nutrition tips", text: "Give me quick nutrition tips" },
  ];

  const renderMessage = (message: Message, index: number) => {
    const videoIds = extractVideoIds(message.content);
    const suggestedVideos = videoIds
      .map(id => videos.find(v => v.id === id))
      .filter((v): v is Video => v !== undefined)
      .slice(0, 4);

    return (
      <div
        key={index}
        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
      >
        <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}>
          {message.role === "assistant" && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground/70">ePhit Coach</span>
            </div>
          )}
          
          <div
            className={`rounded-2xl px-4 py-3 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}
          >
            <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          </div>

          {suggestedVideos.length > 0 && (
            <div className="mt-3 space-y-2">
              {suggestedVideos.map((video) => (
                <div key={video.id} className="animate-fade-in">
                  <VideoCardCompact
                    video={video}
                    onPlay={(v) => {
                      setSelectedVideo(v);
                      setVideoPlayerOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => renderMessage(message, index))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(action.text)}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for video suggestions..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>

      <VideoPlayer
        video={selectedVideo}
        open={videoPlayerOpen}
        onOpenChange={setVideoPlayerOpen}
      />
    </>
  );
}
