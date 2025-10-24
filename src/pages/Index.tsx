import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Play, Search, Heart, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-12 md:py-16">
          <div className="container relative z-10">
            <div className="mx-auto max-w-5xl animate-fade-up">
              {/* Title */}
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                  <span className="text-[#6B5B95]">e-PHIT</span>{" "}
                  <span className="text-[#F4C542]">MENTAL HEALTH</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Co-designed by young people living with mental health
                </p>
              </div>
              
              {/* Video Embed */}
              <div className="relative w-full mb-8" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/KamOkV4r4g0?controls=1&rel=0&modestbranding=1"
                  title="e-PHIT Mental Health Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Description and CTAs */}
              <div className="text-center">
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Evidence-based workouts and nutrition advice designed for young people with mental health challenges.
                  Start your wellness journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg h-12 px-8">
                    <Link to="/quiz">
                      <Play className="mr-2 h-5 w-5" />
                      Find Your First Video
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                    <Link to="/browse">
                      <Search className="mr-2 h-5 w-5" />
                      Choose Your Moves
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </section>

        {/* Choose Your Moves Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Moves
              </h2>
              <p className="text-lg text-muted-foreground">
                Select a category to explore our exercise and nutrition videos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Boxing", icon: "🥊", category: "Boxing" },
                { name: "Yoga", icon: "🧘", category: "Yoga" },
                { name: "Full Body Fitness", icon: "💪", category: "Full Body Fitness" },
                { name: "Strength & Tone", icon: "🏋️", category: "Strength & Tone" },
                { name: "Pilates", icon: "🤸", category: "Pilates" },
                { name: "Nutrition", icon: "🥗", category: "Nutrition" },
              ].map((item) => (
                <Link key={item.category} to={`/browse?category=${encodeURIComponent(item.category)}`}>
                  <Card className="border-2 hover:border-primary transition-all hover:shadow-lg cursor-pointer h-full">
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <h3 className="font-semibold text-xl">{item.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What is e-PHIT Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What is e-PHIT?
              </h2>
              <p className="text-lg text-muted-foreground">
                e-PHIT Mental Health is a research programme from the University of Manchester 
                that aims to improve young people's mental wellbeing through co-designed exercise 
                and nutrition videos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Evidence-Based</h3>
                  <p className="text-sm text-muted-foreground">
                    All our content is grounded in research and designed with mental health professionals.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Co-Designed</h3>
                  <p className="text-sm text-muted-foreground">
                    Created with input from young people to ensure relevance and accessibility.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Free & Accessible</h3>
                  <p className="text-sm text-muted-foreground">
                    All content is freely available on our YouTube channel and this platform.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Get personalized video recommendations in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Answer Questions",
                  description: "Tell us about your goals, time available, and preferences"
                },
                {
                  step: "2",
                  title: "Get Recommendations",
                  description: "Receive personalized video suggestions based on your answers"
                },
                {
                  step: "3",
                  title: "Start Moving",
                  description: "Watch and follow along with expert trainers"
                }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/quiz">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Begin Your Wellness Journey?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Take our quick quiz to find the perfect videos for you, or explore our full library.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg h-12 px-8">
                  <Link to="/quiz">
                    Take the Quiz
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  <Link to="/browse">
                    Browse All Videos
                  </Link>
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
