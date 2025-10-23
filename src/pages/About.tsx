import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center animate-fade-up">
            <h1 className="text-4xl font-bold mb-4">About e-PHIT Mental Health</h1>
            <p className="text-lg text-muted-foreground">
              Evidence-based exercise and nutrition for young people's wellbeing
            </p>
          </div>

          <div className="space-y-12">
            <section className="animate-fade-up">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                e-PHIT Mental Health is a research programme from the University of Manchester 
                dedicated to improving young people's mental wellbeing through physical activity 
                and nutrition. We combine scientific evidence with the lived experiences of young 
                people to create accessible, engaging content that supports mental health recovery 
                and resilience.
              </p>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Evidence-Based</h3>
                  <p className="text-sm text-muted-foreground">
                    All content is grounded in peer-reviewed research and best practices in 
                    mental health and exercise science.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Co-Designed</h3>
                  <p className="text-sm text-muted-foreground">
                    Created in partnership with young people to ensure the content is relevant, 
                    engaging, and accessible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">University Research</h3>
                  <p className="text-sm text-muted-foreground">
                    Part of ongoing research at the University of Manchester to advance mental 
                    health interventions.
                  </p>
                </CardContent>
              </Card>
            </div>

            <section className="animate-fade-up">
              <h2 className="text-2xl font-semibold mb-4">The Research</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                e-PHIT builds on decades of research showing that regular physical activity and 
                good nutrition can significantly improve mental health outcomes. Our videos are 
                designed to be:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Accessible to people of all fitness levels</li>
                <li>Short enough to fit into busy schedules</li>
                <li>Delivered by qualified trainers and nutrition experts</li>
                <li>Focused on sustainable, long-term wellbeing</li>
                <li>Free and available to everyone</li>
              </ul>
            </section>

            <section className="animate-fade-up">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The e-PHIT team includes researchers, mental health professionals, fitness trainers, 
                nutrition experts, and most importantly, young people with lived experience of 
                mental health challenges. Together, we're creating a resource that truly meets 
                the needs of our community.
              </p>
            </section>

            <section className="animate-fade-up">
              <h2 className="text-2xl font-semibold mb-4">This Platform</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This website is a demonstration platform designed to gather feedback from 
                stakeholders and explore the potential of personalized video recommendations 
                for mental health support. All content is freely available on our YouTube channel.
              </p>
              <Button asChild>
                <a 
                  href="https://www.youtube.com/@ePHITmentalhealth" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit our YouTube Channel
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </section>

            <section className="bg-muted/50 p-6 rounded-lg animate-fade-up">
              <h2 className="text-xl font-semibold mb-3">Important Notice</h2>
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> The content provided here is for informational 
                purposes regarding personal wellbeing and should not be considered medical advice. 
                If you're experiencing mental health difficulties, please consult with a qualified 
                healthcare professional. This is a demonstration site for research feedback purposes.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
