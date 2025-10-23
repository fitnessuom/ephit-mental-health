import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { VideoCard } from "@/components/VideoCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useQuiz } from "@/hooks/useQuiz";
import { useAnalytics } from "@/hooks/useAnalytics";
import { getAvailableOptions } from "@/lib/videoData";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Video } from "@/lib/videoData";

export default function Quiz() {
  const quiz = useQuiz();
  const { track } = useAnalytics();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (quiz.step === 0 && !quiz.isComplete) {
      track("quiz_start");
    }
  }, []);

  const options = getAvailableOptions(quiz.answers);
  const totalSteps = 4;
  const progress = ((quiz.step + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (quiz.step === totalSteps - 1) {
      quiz.completeQuiz();
      track("quiz_complete", { answers: quiz.answers });
    } else {
      quiz.nextStep();
    }
  };

  if (quiz.isComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container max-w-6xl">
            <div className="text-center mb-8 animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Your Personalized Recommendations
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Based on your answers, we've found these perfect videos for you
              </p>
              <Button onClick={quiz.reset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Start New Quiz
              </Button>
            </div>

            {quiz.recommendations.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quiz.recommendations.map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video}
                    onPlay={setSelectedVideo}
                  />
                ))}
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    No videos match your criteria. Try adjusting your preferences.
                  </p>
                  <Button onClick={quiz.reset}>
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Want to explore more options?
              </p>
              <Button asChild variant="outline">
                <Link to="/browse">Browse All Videos</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <VideoPlayer
          video={selectedVideo}
          open={!!selectedVideo}
          onOpenChange={(open) => !open && setSelectedVideo(null)}
        />
      </div>
    );
  }

  const questions = [
    {
      id: "priority",
      title: "What's your primary goal?",
      description: "Choose what matters most to you right now",
      options: [
        { value: "Fitness", label: "Getting Fitter", available: options.priorities.includes("Fitness") },
        { value: "Nutrition", label: "Improving Nutrition", available: options.priorities.includes("Nutrition") },
      ].filter(o => o.available),
    },
    {
      id: "type",
      title: "What type of content interests you?",
      description: "Select your preferred activity style",
      options: quiz.answers.priority === "Fitness" 
        ? [
            { value: "Boxing Moves", label: "Boxing Moves", available: options.types.includes("Boxing Moves") },
            { value: "Yoga", label: "Yoga", available: options.types.includes("Yoga") },
            { value: "Full Body Fitness", label: "Full Body Fitness", available: options.types.includes("Full Body Fitness") },
            { value: "Strength & Tone", label: "Strength & Tone", available: options.types.includes("Strength & Tone") },
            { value: "Pilates", label: "Pilates", available: options.types.includes("Pilates") },
          ].filter(o => o.available)
        : [
            { value: "Nutrition Advice", label: "Nutrition Advice", available: options.types.includes("Nutrition Advice") },
            { value: "Healthy Meals", label: "Healthy Meals", available: options.types.includes("Healthy Meals") },
            { value: "Nutrition Info", label: "Nutrition Info", available: options.types.includes("Nutrition Info") },
          ].filter(o => o.available),
    },
    {
      id: "time",
      title: "How much time do you have?",
      description: "Choose a duration that fits your schedule",
      options: [
        { value: "1 min!", label: "Quick Clip (1-2 mins)", available: options.times.includes("1 min!") },
        { value: "~5mins", label: "Short Session (~5 mins)", available: options.times.includes("~5mins") },
        { value: "5-10mins", label: "Medium Session (5-10 mins)", available: options.times.includes("5-10mins") },
        { value: "~15mins", label: "Full Workout (12-20 mins)", available: options.times.includes("~15mins") },
      ].filter(o => o.available),
    },
    {
      id: "level",
      title: "What's your experience level?",
      description: "Help us match you with the right difficulty",
      options: [
        { value: "Skills", label: "Just Learning", available: options.levels.includes("Skills") },
        { value: "Beginner", label: "Beginner", available: options.levels.includes("Beginner") },
        { value: "Medium", label: "Intermediate", available: options.levels.includes("Medium") },
        { value: "Advanced", label: "Advanced", available: options.levels.includes("Advanced") },
      ].filter(o => o.available),
    },
  ];

  const currentQuestion = questions[quiz.step];
  const currentAnswer = quiz.answers[currentQuestion.id as keyof typeof quiz.answers];
  const canProceed = !!currentAnswer;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-muted-foreground">
                Question {quiz.step + 1} of {totalSteps}
              </h2>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
              <CardDescription>{currentQuestion.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={currentAnswer || ""}
                onValueChange={(value) => quiz.setAnswer(currentQuestion.id as any, value)}
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer font-medium"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={quiz.prevStep}
                  disabled={quiz.step === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                >
                  {quiz.step === totalSteps - 1 ? "See Results" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
