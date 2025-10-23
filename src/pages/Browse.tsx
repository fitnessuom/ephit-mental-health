import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoCard } from "@/components/VideoCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { videos, Video, getCategories } from "@/lib/videoData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Browse() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const categories = useMemo(() => getCategories(), []);

  const filteredVideos = useMemo(() => {
    let filtered = videos;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(v => v.category.includes(selectedCategory));
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Videos</h1>
            <p className="text-lg text-muted-foreground">
              Explore our full library of exercise and nutrition content
            </p>
          </div>

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

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent p-0 mb-8">
              <TabsTrigger value="all" className="rounded-full">
                All Videos
              </TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="rounded-full">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-0">
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
                      setSelectedCategory("all");
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
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
