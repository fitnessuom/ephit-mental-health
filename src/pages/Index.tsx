import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Play, Search, Heart, Sparkles, Dumbbell, Salad, Swords } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section — side-by-side like reference */}
        <section className="bg-muted/30 py-12 md:py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              {/* Left: text */}
              <div className="animate-fade-up">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                  <span className="text-primary">e-PHIT</span>{" "}
                  <span className="text-secondary">MENTAL HEALTH</span>
                </h1>
                <p className="text-lg font-medium text-foreground/80 mb-2">
                  Co-designed by young people living with mental health
                </p>
                <p className="text-muted-foreground mb-8 max-w-lg">
                  Evidence-based workouts and nutrition advice designed for young people with mental health challenges. Start your wellness journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="h-11 px-6">
                    <Link to="/quiz">
                      <Play className="mr-2 h-4 w-4" />
                      Find your first video
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-11 px-6">
                    <Link to="/browse">
                      <Search className="mr-2 h-4 w-4" />
                      Choose your moves
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: video */}
              <div className="relative w-full animate-fade-up" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/KamOkV4r4g0?controls=1&rel=0&modestbranding=1"
                  title="e-PHIT Mental Health Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* Choose Your Moves — icon tiles */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose your moves</h2>
              <p className="text-muted-foreground">
                Select a category to explore our exercise and nutrition videos.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {([
                { name: "Boxing", icon: Swords, category: "Boxing" },
                { name: "Yoga", icon: Heart, category: "Yoga" },
                { name: "Full body fitness", icon: Dumbbell, category: "Full Body Fitness" },
                { name: "Strength & tone", icon: Dumbbell, category: "Strength & Tone" },
                { name: "Pilates", icon: Sparkles, category: "Pilates" },
                { name: "Nutrition", icon: Salad, category: "Nutrition" },
              ] as const).map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.category} to={`/browse?category=${encodeURIComponent(item.category)}`}>
                    <Card className="border hover:border-primary transition-all hover:shadow-md cursor-pointer h-full">
                      <CardContent className="py-8 flex flex-col items-center gap-3">
                        <Icon className="h-10 w-10 text-foreground" strokeWidth={1.5} />
                        <h3 className="font-medium text-base text-center">{item.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works — 3-step strip */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">How it works</h2>
              <p className="text-muted-foreground">
                Get personalised video recommendations in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { step: "1", title: "Answer questions", desc: "Tell us about your goals, time available, and preferences" },
                { step: "2", title: "Get recommendations", desc: "Receive personalised video suggestions based on your answers" },
                { step: "3", title: "Start moving", desc: "Watch and follow along with expert trainers" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild size="lg">
                <Link to="/quiz">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What is e-PHIT — 3 trust cards */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">What is e-PHIT?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A research programme from the University of Manchester that improves young people's mental wellbeing through co-designed exercise and nutrition videos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Evidence-based</h3>
                  <p className="text-sm text-muted-foreground">
                    All content is grounded in research and designed with mental health professionals.
                  </p>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Co-designed</h3>
                  <p className="text-sm text-muted-foreground">
                    Created with input from young people to ensure relevance and accessibility.
                  </p>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Free & accessible</h3>
                  <p className="text-sm text-muted-foreground">
                    All content is freely available on our YouTube channel and this platform.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA strip */}
        <section className="py-14 md:py-20 bg-primary">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center text-primary-foreground">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to begin your wellness journey?
              </h2>
              <p className="mb-8 opacity-90">
                Take our quick quiz to find the perfect videos for you, or explore our full library.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" variant="secondary" className="h-11 px-6">
                  <Link to="/quiz">Take the Quiz</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 px-6 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  <Link to="/browse">Browse All Videos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
