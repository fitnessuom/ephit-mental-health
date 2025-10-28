import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrailMakingTest } from "@/components/TrailMakingTest";
import { TowersOfHanoi } from "@/components/TowersOfHanoi";
import { VerbalRecall } from "@/components/VerbalRecall";
import { Brain } from "lucide-react";

export default function MindGym() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold">Mind Gym</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Train your cognitive abilities with scientifically-backed exercises. These tests measure processing speed, 
            problem-solving, and working memory. Results are for personal training purposes only and are not diagnostic tools.
          </p>
        </div>

        <Tabs defaultValue="tmt-a" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="tmt-a">Kettlebell Circuit A</TabsTrigger>
            <TabsTrigger value="tmt-b">Kettlebell Circuit B</TabsTrigger>
            <TabsTrigger value="hanoi">Weight Stack Challenge</TabsTrigger>
            <TabsTrigger value="recall">Rep Memory Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tmt-a" className="min-h-[600px]">
            <TrailMakingTest mode="A" />
          </TabsContent>
          
          <TabsContent value="tmt-b" className="min-h-[600px]">
            <TrailMakingTest mode="B" />
          </TabsContent>
          
          <TabsContent value="hanoi" className="min-h-[600px]">
            <TowersOfHanoi discCount={3} />
          </TabsContent>
          
          <TabsContent value="recall" className="min-h-[600px]">
            <VerbalRecall />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
