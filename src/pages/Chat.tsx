import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoSuggestionsChat } from "@/components/VideoSuggestionsChat";

export default function Chat() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">AI Video Assistant</h1>
          <p className="text-muted-foreground">
            Tell me what you're looking for and I'll suggest the perfect videos for you
          </p>
        </div>
        <VideoSuggestionsChat />
      </main>
      <Footer />
    </div>
  );
}
