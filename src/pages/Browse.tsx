import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoCard } from "@/components/VideoCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { videos, Video } from "@/lib/videoData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  // Read category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const mainCategories = [
    { name: "Boxing Moves", icon: "🥊", categories: ["Boxing Moves"] },
    { name: "Yoga", icon: "🧘", categories: ["Yoga"] },
    { name: "Full Body Fitness", icon: "💪", categories: ["Full Body Fitness"] },
    { name: "Strength & Tone", icon: "🏋️", categories: ["Strength & Tone"] },
    { name: "Pilates", icon: "🤸", categories: ["Pilates"] },
    { name: "Nutrition", icon: "🥗", categories: ["Nutrition Advice", "Healthy Meals", "Nutrition Info"] },
  ];

  const filteredVideos = useMemo(() => {
    let filtered = videos;

    if (selectedCategory) {
      // Find the main category that matches
      const mainCat = mainCategories.find(mc => 
        mc.name === selectedCategory || mc.categories.includes(selectedCategory)
      );
      
      if (mainCat) {
        // Filter by q1_1 field which contains the decision tree categories
        filtered = filtered.filter(v => 
          mainCat.categories.some(cat => v.q1_1 === cat)
        );
      } else {
        // Direct category match using q1_1
        filtered = filtered.filter(v => v.q1_1 === selectedCategory);
      }
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter(v => v.level === levelFilter);
    }

    if (timeFilter !== "all") {
      if (timeFilter === "short") {
        filtered = filtered.filter(v => v.minutes === "Short");
      } else if (timeFilter === "5") {
        filtered = filtered.filter(v => typeof v.minutes === "number" && v.minutes <= 5);
      } else if (timeFilter === "10") {
        filtered = filtered.filter(v => typeof v.minutes === "number" && v.minutes > 5 && v.minutes <= 10);
      } else if (timeFilter === "15") {
        filtered = filtered.filter(v => typeof v.minutes === "number" && v.minutes > 10);
      }
    }

    return filtered;
  }, [selectedCategory, levelFilter, timeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Moves</h1>
            <p className="text-lg text-muted-foreground">
              {selectedCategory ? `${selectedCategory} videos` : 'Select a category to explore our exercise and nutrition content'}
            </p>
          </div>

          {selectedCategory ? (
            <>
              {/* Back Button */}
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchParams({});
                  setLevelFilter("all");
                  setTimeFilter("all");
                }}
                className="mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Button>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Skills">Skills</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="short">Quick Clips (&lt; 1 min)</SelectItem>
                    <SelectItem value="5">Short (~5 mins)</SelectItem>
                    <SelectItem value="10">Medium (5-10 mins)</SelectItem>
                    <SelectItem value="15">Long (10+ mins)</SelectItem>
                  </SelectContent>
                </Select>

                {(levelFilter !== "all" || timeFilter !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setLevelFilter("all");
                      setTimeFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Videos Grid */}
              {filteredVideos.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map(video => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlay={setSelectedVideo}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No videos found matching your filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setLevelFilter("all");
                      setTimeFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Category Selection Grid */
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {mainCategories.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedCategory(item.name)}
                  className="text-left"
                >
                  <Card className="border-2 hover:border-primary transition-all hover:shadow-lg cursor-pointer h-full">
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <h3 className="font-semibold text-xl">{item.name}</h3>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          )}
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
