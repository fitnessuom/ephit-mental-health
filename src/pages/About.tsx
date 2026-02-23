import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          {/* Short human summary */}
          <div className="mb-10 text-center animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">About e-PHIT Mental Health</h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              e-PHIT is a University of Manchester research programme that improves young people's
              mental wellbeing through co-designed exercise and nutrition content — all free and
              evidence-based.
            </p>
          </div>

          {/* Trust cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Evidence-Based</h3>
                <p className="text-sm text-muted-foreground">
                  Grounded in peer-reviewed research and mental health best practice.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Co-Designed</h3>
                <p className="text-sm text-muted-foreground">
                  Created in partnership with young people for relevance and accessibility.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">University Research</h3>
                <p className="text-sm text-muted-foreground">
                  Part of ongoing research at the University of Manchester.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Expandable detail sections */}
          <Accordion type="multiple" className="mb-10">
            <AccordionItem value="mission">
              <AccordionTrigger className="text-lg font-semibold">Our Mission</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                e-PHIT Mental Health is dedicated to improving young people's mental wellbeing through
                physical activity and nutrition. We combine scientific evidence with the lived experiences
                of young people to create accessible, engaging content that supports mental health recovery
                and resilience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="research">
              <AccordionTrigger className="text-lg font-semibold">The Research</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  e-PHIT builds on decades of research showing that regular physical activity and good
                  nutrition can significantly improve mental health outcomes. Our videos are designed to be:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Accessible to people of all fitness levels</li>
                  <li>Short enough to fit into busy schedules</li>
                  <li>Delivered by qualified trainers and nutrition experts</li>
                  <li>Focused on sustainable, long-term wellbeing</li>
                  <li>Free and available to everyone</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="team">
              <AccordionTrigger className="text-lg font-semibold">Our Team</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                The e-PHIT team includes researchers, mental health professionals, fitness trainers,
                nutrition experts, and most importantly, young people with lived experience of mental
                health challenges. Together, we're creating a resource that truly meets the needs of
                our community.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="platform">
              <AccordionTrigger className="text-lg font-semibold">This Platform</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  This website is a demonstration platform designed to gather feedback from stakeholders
                  and explore the potential of personalised video recommendations for mental health support.
                  All content is freely available on our YouTube channel.
                </p>
                <Button asChild size="sm">
                  <a href="https://www.youtube.com/@ePHITmentalhealth" target="_blank" rel="noopener noreferrer">
                    Visit our YouTube Channel
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Disclaimer */}
          <div className="bg-muted/50 p-5 rounded-lg text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> The content provided here is for informational purposes regarding
            personal wellbeing and should not be considered medical advice. If you're experiencing mental
            health difficulties, please consult with a qualified healthcare professional. This is a
            demonstration site for research feedback purposes.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
